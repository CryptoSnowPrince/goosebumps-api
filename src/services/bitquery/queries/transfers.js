module.exports.queries = `query (
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
