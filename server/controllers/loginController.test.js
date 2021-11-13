require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
const { userLogin, userSignUp } = require("./loginController");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a userLogin function", () => {
  describe("When it receives a request with an incorrect username", () => {
    test("Then it should invoke the next function with an error ", async () => {
      const usernameTest = "";
      const req = {
        body: {
          username: usernameTest,
        },
      };
      const res = {};

      await userLogin(req, res, next);
    });
  });
});
