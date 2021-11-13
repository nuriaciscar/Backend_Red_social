require("dotenv").config();

const User = require("../../database/models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ id: user.id }).populate([
      {
        path: "friends",
        select: "-password -username -friends -enemies ",
      },
      {
        path: "enemies",
        select: "-password -username -friends -enemies",
      },
    ]);
    res.json(users);
  } catch (error) {
    error.message = "Cannot search the users";
    error.code = 400;
    next(error);
  }
};

module.exports = { getUsers };
