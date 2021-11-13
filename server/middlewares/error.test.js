const { ValidationError } = require("express-validation");
const { notFoundErrorhandler, errorhandler } = require("./error");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given a notFoundErrorHandler function", () => {
  describe("When it gets a request", () => {
    test("Then it should respond with a message Sorry, endpoint not found and a status code of 404", () => {
      const res = mockResponse();
      const expectedError = { error: "Sorry, endpoint not found" };
      const req = {};

      notFoundErrorhandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
describe("Given an errorHandler function", () => {
  describe("When it gets a request and an error and no error code", () => {
    test("Then it should respond with a message 'All broken' and a status code of 500", () => {
      const res = mockResponse();
      const error = { error: "All broken" };
      const req = {};
      const next = () => {};

      errorhandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
  describe("When it gets a request and a 'Who are you' error with a 401 error code", () => {
    test("Then it should send a response with the error's message and a status code of 401", () => {
      const res = mockResponse();
      const error = { message: "Who are you", code: 401 };
      const req = {};
      const next = () => {};

      errorhandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
  describe("When it gets a request and a ValidationError", () => {
    test("Then it should send an error message 'Bad request sorry' and a status code of 400", () => {
      const res = mockResponse();
      const error = { message: "Bad request sorry", code: 401 };

      const req = {};
      const next = () => {};

      errorhandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Bad request sorry" });
    });
  });
});
