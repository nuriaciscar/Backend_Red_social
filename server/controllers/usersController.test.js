const User = require("../../database/models/user");
const { getUsers } = require("./usersController");

jest.mock("../../database/models/user");

describe("Given a getUsers function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json", async () => {
      const users = [{ username: "nunu" }, { username: "nunu2" }];

      const res = {
        json: jest.fn().mockReturnThis(),
      };
      const req = null;
      User.find = jest.fn().mockReturnThis();
      User.populate = jest.fn().mockResolvedValue(users);

      await getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(users);
    });
  });
  describe("When it receives an error", () => {
    test("Then it should invoke the next function with an error and status 400", async () => {
      const error = new Error("Cannot search the users");
      error.code = 400;
      const res = {
        json: jest.fn().mockReturnThis(),
      };
      const req = null;
      User.find = jest.fn().mockReturnThis();
      const next = jest.fn();
      User.find = jest.fn().mockReturnThis();
      User.populate = jest.fn().mockResolvedValue(error);

      await getUsers(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
