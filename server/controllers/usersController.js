const User = require("../../database/models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: req.user.id }).populate([
      {
        path: "enemies friends",
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
