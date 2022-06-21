const Joi = require("joi");

module.exports = {
  // GET /search/istoken
  isToken: {
    query: {
      address: Joi.string(),
      network: Joi.string(),
    },
  },
};
