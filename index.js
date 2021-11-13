require("dotenv").config();
const { initializeDB } = require("./database");
const { initializeServer } = require("./server");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5000;

(async () => {
  try {
    await initializeDB(process.env.MONGODB_STRING);
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
