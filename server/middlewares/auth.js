const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    const error = new Error("Not authorized sorry");
    error.code = 401;
    next(error);
  } else {
    try {
      const [, token] = req.headers.split(" ")[1];
      const user = await jwt.verify(token, process.env.SECRET);
      req.username = user.username;
      req.userId = user.id;
      next();
    } catch (error) {
      error.message = "Token no valid";
      error.code = 401;
      next(error);
    }
  }
};

module.exports = auth;
