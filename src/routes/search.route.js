const express = require("express");
const { isToken } = require("../services/onChainProviders");

const router = express.Router();

/**
 * GET search/istoken
 */
router.get("/istoken", async (req, res) => {
  const is_token = await isToken(req.query.network, req.query.address);
  res.json(is_token);
});

module.exports = router;
