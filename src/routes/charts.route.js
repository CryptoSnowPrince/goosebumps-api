/* eslint-disable node/no-unpublished-require */
const express = require("express");
const { getPairs, getNetwork } = require("../services/onChainProviders");
const router = express.Router();
const network = require("../config/networks/index");
const bitquery = require("../abi/res.json");
const ohlc = require("../abi/ohlc.json");
const ohlcMock = require("../mock/GetOHLC.json");

const cmc = require("../abi/cmc.json");
const latestTrade = require("../abi/latest.json");
const { getPairsData } = require("../services/bitquery/queries/getpairs");
const { timeout } = require("../utils/helper");

/**
 * GET charts/getpairs
 */
router.get("/getpairs", async (req, res) => {
  const reqAddress = req.query.address;
  const reqNetwork = req.query.network;

  const result = await getPairsData(reqNetwork, reqAddress);

  res.json(result);
});
/**
 * GET charts/getpairs
 */
router.get("/getpair", async (req, res) => {
  const reqAddress = req.query.address;
  const reqNetwork = req.query.network;

  const result = await getPairsData(reqNetwork, reqAddress);

  res.json(result);
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

function randomData(rtime) {
  let dt = ohlcMock;
  const random = Math.floor(Math.random() * dt.length);

  let result = dt[random];
  result.time = rtime;
  return result;
}

/**
 * GET charts/getohlc
 */
router.get("/getohlc", async (req, res) => {
  await timeout(5);
  let q = req.query;
  let result = [];
  let base = 1;
  if (q.useCache == "false") {
    base = 1000;
  }

  let startTime = Number(q.startTime) * base;
  let endTime = Number(q.endTime) * base;
  let interval = Number(q.interval) * 60 * base;
  let countData = (endTime - startTime) / interval;

  countData = countData > 500 ? 500 : countData;
  for (let i = 0; i < countData; i++) {
    let itime = i * interval;
    let rtime = startTime + itime;

    result[i] = randomData((rtime * 1000) / base);
  }

  res.json(result);
});

module.exports = router;
