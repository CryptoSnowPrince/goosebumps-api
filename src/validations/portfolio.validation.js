const Joi = require("joi");

module.exports = {
  // POST /portfolio/gettrades
  getTrades: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(128),
      resetToken: Joi.string().required(),
    },
  },
};
