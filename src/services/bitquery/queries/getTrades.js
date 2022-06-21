const { request } = require("graphql-request");
const { getNetwork } = require("../../onChainProviders");

const BITQUERY_ENDPOINT = "https://graphql.bitquery.io";
const BITQUERY_API = "BQYs1yL4DniyLSvloH4zxulMTH6A0e3i";

const inOutQueries = async (network, address) => {
  let gql = `query (
  $network: EthereumNetwork!
  $address: String!
  ){
    ethereum(network: $network) {
      out: transfers(
        options: {asc: "out"}
        any: [{sender: {is: $address}}, {receiver: {is: $address}}]
      ) {
        in: amount(receiver: {is: $address})
        out: amount(sender: {is: $address})
        currency {
          symbol
          address
        }
      }
    }
  }`;
  let variables = {
    network: network,
    address: address,
  };
  let headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-api-key": BITQUERY_API,
  };

  const result = await request({
    url: BITQUERY_ENDPOINT,
    document: gql,
    variables: variables,
    requestHeaders: headers,
  });
  return result;
};

const latestTrade = async (network, address) => {
  let gql = `query (
  $network: EthereumNetwork!
  $address: String!
  ){
    ethereum(network: $network) {
      out: transfers(
        options: {asc: "out"}
        any: [{sender: {is: $address}}, {receiver: {is: $address}}]
      ) {
        in: amount(receiver: {is: $address})
        out: amount(sender: {is: $address})
        currency {
          symbol
          address
        }
      }
    }
  }`;
  let variables = {
    network: network,
    address: address,
  };
  let headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-api-key": BITQUERY_API,
  };

  const result = await request({
    url: BITQUERY_ENDPOINT,
    document: gql,
    variables: variables,
    requestHeaders: headers,
  });
  return result;
};

const getBuyTrades = async (networkName, address) => {
  const network = getNetwork(networkName);
  let gql = `query ($network: EthereumNetwork!, $address: String!, $nativeCurrency: String) {
  ethereum(network: $network) {
    buy: dexTrades(
      txSender: {is: $address}
      buyCurrency: {is: $nativeCurrency}
      options: {asc: "buyCurrency.symbol"}
    ) {
      smartContract {
        address {
          address
        }
      }
      buyCurrency: sellCurrency {
        address
        name
        symbol
      }
      sellCurrency: buyCurrency {
        address
        name
        symbol
      }
      bnbAmount: buyAmount
      totalUSD: buyAmount(in: USD)
      tokenAmount: sellAmount
      block {
        timestamp {
          iso8601
        }
      }
      transaction {
        hash
      }
    }
  }
}
`;
  let variables = {
    network: network.Name,
    nativeCurrency: network.Currency.Address,
    address: address,
  };
  let headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-api-key": BITQUERY_API,
  };

  const result = await request({
    url: BITQUERY_ENDPOINT,
    document: gql,
    variables: variables,
    requestHeaders: headers,
  });
  return result;
};

const getSellTrades = async (networkName, address) => {
  const network = getNetwork(networkName);
  let gql = `query ($network: EthereumNetwork!, $address: String!, $nativeCurrency: String) {
  ethereum(network: $network) {
    sell: dexTrades(txSender: {is: $address}, sellCurrency: {is: $nativeCurrency}) {
      smartContract{
        address {
          address
        }
      }
      sellCurrency {
        address
        name
        symbol
      }
      buyCurrency {
        address
        name
        symbol
      }
      tokenAmount: buyAmount
      bnbAmount: sellAmount
      totalUSD: sellAmount(in: USD)
      transaction {
        hash
      }
      block {
        timestamp {
          iso8601
        }
      }
      
    }
  }
}
`;
  let variables = {
    network: network.Name,
    nativeCurrency: network.Currency.Address,
    address: address,
  };
  let headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-api-key": BITQUERY_API,
  };

  const result = await request({
    url: BITQUERY_ENDPOINT,
    document: gql,
    variables: variables,
    requestHeaders: headers,
  });
  return result;
};

module.exports = {
  inOutQueries,
  latestTrade,
  getSellTrades,
  getBuyTrades,
};
