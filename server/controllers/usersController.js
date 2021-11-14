const User = require("../../database/models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.userId });
    res.status(200).json(users);
  } catch (error) {
    error.message = "Cannot search the users";
    error.code = 400;
    next(error);
  }
};

module.exports = { getUsers };
