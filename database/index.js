const debug = require("debug")("socialNetwork: database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const initializeDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret._v;
      },
    });

    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("Could not connect to database"));
        debug(chalk.red(error.message));
        reject(error);
      }
      debug(chalk.green("Connection to database successful"));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(chalk.red("Connection to database OVER"));
    });
  });

module.exports = initializeDB;
