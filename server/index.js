/* eslint-disable no-new */
const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("socialNetwork:server");
const chalk = require("chalk");
const cors = require("cors");
const { errorhandler, notFoundErrorhandler } = require("./middlewares/error");
const loginRoutes = require("./routes/loginRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();
app.use(cors());

const initializeServer = (port) => {
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Connecting to port ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error to initialize server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is already in use.`));
      }

      debug(chalk.red(error.code));
      reject();
    });

    server.on("close", () => {
      debug(chalk.blue("See you soon"));
    });
  });
};
app.use(morgan("dev"));
app.use(express.json());
app.use("/login", loginRoutes);
app.use("/users", usersRoutes);
// app.use("/user", userRoutes);
app.use(errorhandler);
app.use(notFoundErrorhandler);

module.exports = { initializeServer, app };
