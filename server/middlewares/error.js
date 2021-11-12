const debug = require("debug")("socialNetwork:errors");
const chalk = require("chalk");
const { ValidationError } = require("express-validation");

const notFoundErrorhandler = (req, res) => {
  res.status(404).json({ error: "Sorry, endpoint not found" });
};

const errorhandler = (error, req, res, next) => {
  debug(chalk.red("An error has ocurred: ", error.message));
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Bad request sorry";
  }
  const message = error.code ? error.message : "All broken";
  res.status(error.code || 500).json({ error: message });
};

module.exports = { notFoundErrorhandler, errorhandler };
