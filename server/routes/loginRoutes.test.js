require("dotenv").config();
const debug = require("debug")("user:routes:tests");
const chalk = require("chalk");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const { initializeDB } = require("../../database");
const User = require("../../database/models/user");
const { initializeServer } = require("../index");
const { app } = require("../index");

const request = supertest(app);

jest.setTimeout(10000);

let server;

beforeAll(async () => {
  await initializeDB(process.env.MONGO_DBSTRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  await User.deleteMany();
  await User.create({
    username: "nunu",
    password: await bcrypt.hash("password", 10),
    name: "nunu",
  });
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("Connection to database has ended"));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.red("Connection to server has ended"));
  });
  await server.close();
});

describe("Given a /login router,", () => {
  describe("When it gets a POST request for /login/login with an existing username and a password", () => {
    test("Then it should send a response with a token and a status code of 200", async () => {
      const { body } = await request
        .post("/login/login")
        .send({ username: "nunu", password: "password" })
        .expect(200);

      expect(body.token).toBeDefined();
    });
  });
});
