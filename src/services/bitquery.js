`query ($baseCurrency: String!) {
  ethereum(network: bsc) {
    dexTrades(baseCurrency: {is: $baseCurrency}, options: {desc: "count", limit: 5}) {
      count
      tradeAmount(in: USD)
      exchange {
        fullName
      }
      smartContract {
        address {
          address
        }
      }
      buyCurrency {
        address
        name
        symbol
      }
      sellCurrency {
        address
        name
        symbol
      }
    }
  }
}`;
