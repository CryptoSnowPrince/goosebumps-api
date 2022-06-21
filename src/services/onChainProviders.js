const { ethers } = require("ethers");
const { Contract, Provider } = require("ethers-multicall");
const _ = require("lodash");
const factoryAbi = require("../abi/factory.json");
const pairAbi = require("../abi/pair.json");
const tokenAbi = require("../abi/token.json");
const { networks } = require("../config/networks/index");

module.exports.getNetwork = (name) => {
  const result = _.find(networks, function (n) {
    return n.Name == name;
  });
  return result;
};

// //127.0.0.1:3001/api/Charts/GetPairs
// http: pair.buyCurrency.symbol = token0;
// pair.sellCurrency.symbol = token1;
// pair.exchange.fullName = dex_name;
// pair.smartContract.address.address = pair_address;

module.exports.getPairs = async (networkName, token) => {
  const network = this.getNetwork(networkName);

  const provider = new ethers.providers.JsonRpcProvider(network.RPC);
  const ethcallProvider = new Provider(provider);
  await ethcallProvider.init();

  let calls = [];

  const factoryContract = new Contract(network.DEX.Factory.Pancakeswap, factoryAbi);
  calls.push(factoryContract.getPair(token, network.Currency.Address));

  network.USDs.map((addr) => {
    calls.push(factoryContract.getPair(token, addr));
  });

  let responses = await ethcallProvider.all(calls);
  let pairs = _.filter(responses, function (o) {
    return o != ethers.constants.AddressZero;
  });

  pairs = pairs.map((pair) => {
    let p = {
      address: pair,
      exchange: {
        name: "PCS",
        fullName: "Pancakeswap",
      },
      smartContract: {
        address: {
          address: pair,
        },
      },
    };
    return p;
  });

  await ethcallProvider.init();

  calls = [];
  pairs.map((pair) => {
    const pairContract = new Contract(pair, pairAbi);
    calls.push(pairContract.token0());
    calls.push(pairContract.token1());
  });
  let callCounts = 1;

  let pairDetails = await ethcallProvider.all(calls);

  pairs.map((pair, index) => {});
  return pairs;
};

module.exports.getPairDetails = async (networkName, pairs) => {
  const network = this.getNetwork(networkName);

  const provider = new ethers.providers.JsonRpcProvider(network.RPC);
  const ethcallProvider = new Provider(provider);
  await ethcallProvider.init();

  let calls = [];
  pairs.map((pair) => {
    const pairContract = new Contract(pair, pairAbi);
    calls.push(pairContract.token0());
    calls.push(pairContract.token1());
  });
  let callCounts = 1;

  return responses;
};

module.exports.isToken = async (networkName, address) => {
  const network = this.getNetwork(networkName);

  const provider = new ethers.providers.JsonRpcProvider(network.RPC);
  const bytecode = await provider.getCode(address);

  // No code : "0x" then functionA is definitely not there
  if (bytecode.length <= 2) {
    return false;
  }

  // If the bytecode doesn't include the function selector functionA()
  // is definitely not present
  if (
    !bytecode.includes(ethers.utils.id("name()").slice(2, 10)) &&
    !bytecode.includes(ethers.utils.id("symbol()").slice(2, 10)) &&
    !bytecode.includes(ethers.utils.id("decimals()").slice(2, 10)) &&
    !bytecode.includes(ethers.utils.id("totalSupply()").slice(2, 10))
  ) {
    console.log("No name() : no function selector in bytecode");
    return false;
  }

  return true;
};
