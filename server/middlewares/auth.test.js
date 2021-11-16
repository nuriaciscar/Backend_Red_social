const jwt = require("jsonwebtoken");
const auth = require("./auth");

jest.mock("jsonwebtoken");

describe("Given an auth middleware", () => {
  describe("When it gets a request with an incorrect Authorization header", () => {
    test("Then it should send an error with a message 'Not authorized sorry' and status 401", async () => {
      const req = {
        header: jest.fn(),
      };

      const res = {};

      const next = jest.fn();

      const expectedError = new Error("Not authorized sorry");

      await auth(req, res, next);
      expect(next).toBeCalledWith(expectedError);
    });
  });
  describe("When it gets a request with a Authorization header but without a token", () => {
    test("Then it should send an error with a message 'Token is missing' and status 401", async () => {
      const authHeader = "nunu";

      const req = {
        header: jest.fn().mockReturnValue(authHeader),
      };

      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Token is missing...");

      await auth(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it gets a request with a Authorization header but with an incorrect token", () => {
    test("Then it should send an error with a message 'Token is missing...' and status 401", async () => {
      const req = {
        json: jest.fn(),
        header: jest.fn().mockReturnValue("Bearer token"),
      };

      const next = jest.fn();
      const errorSent = new Error("Token is missing...");
      errorSent.code = 401;

      const error = new Error();

      const res = {};

      jwt.verify = jest.fn().mockRejectedValue(error);
      await auth(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(errorSent);
    });
  });
});
