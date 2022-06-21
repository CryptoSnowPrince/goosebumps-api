const Joi = require("joi");

module.exports = {
  // GET /charts/getpairs
  getPairs: {
    query: {
      address: Joi.string(),
      network: Joi.string(),
    },
  },

  // GET /charts/getcmcinfo
  getCmcInfo: {
    query: {
      address: Joi.string(),
      network: Joi.string(),
    },
  },

  // GET /charts/getlatesttrades
  getLatestTrades: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      email: Joi.string(),
      role: Joi.string().valid(User.roles),
    },
  },

  // GET /charts/getohlc
  getOhlc: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      email: Joi.string(),
      role: Joi.string().valid(User.roles),
    },
  },

  // POST /v1/auth/password-reset
  // passwordReset: {
  //   body: {
  //     email: Joi.string().email().required(),
  //     password: Joi.string().required().min(6).max(128),
  //     resetToken: Joi.string().required(),
  //   },
  // },
};
