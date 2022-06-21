const express = require("express");
const { getPairs, getNetwork } = require("../services/onChainProviders");
const router = express.Router();
const network = require("../config/networks/index");
const bitquery = require("../abi/res.json");
const ohlc = require("../abi/ohlc.json");
const cmc = require("../abi/cmc.json");
const latestTrade = require("../abi/latest.json");
/**
 * GET charts/getpairs
 */
router.get("/getpairs", async (req, res) => {
  //   const resp = await getPairs(req.query.network, req.query.address);
  //   const n = getNetwork(req.query.network);
  res.json(bitquery.ethereum.dexTrades);
});

/**
 * GET charts/getcmcinfo
 */
router.get("/getcmcinfo", (req, res) => res.json({}));

/**
 * GET charts/getlatesttrades
 */
router.get("/getlatesttrades", (req, res) => {
  //   res.json([]);
  //   return;

  const dt = latestTrade.ethereum.dexTrades;
  data = dt.map((d) => {
    let r = {
      tx: d.transaction.hash,
      time: d.time.timestamp.unixtime * 1000,
      isBuy: d.side == "SELL" ? false : true,
      tokens: d.tokens,
      priceUSD: d.priceUSD,
      price: d.priceBNB,
      symbol: d.baseCurrency.symbol,
      dex: d.exchange.name,
      value: 10,
    };
    return r;
  });

  res.json(data);
});

/**
 * GET charts/getohlc
 */
router.get("/getohlc", (req, res) => {
  let dt = ohlc.ethereum.dexTrades;

  const data = dt.map((d) => {
    let r = {
      time: d.timeInterval.minute,
      open: d.open_price,
      high: d.maximum_price,
      low: d.minimum_price,
      close: d.close_price,
      volume: d.trades,
    };
    return r;
  });

  res.json(data);
});

module.exports = router;
