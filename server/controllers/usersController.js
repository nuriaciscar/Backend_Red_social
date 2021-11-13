require("dotenv").config();
const debug = require("debug")("users:controller");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const getUsers = async (req, res, next) => {
  const users = await User.find(req.body);
  res.json(users);
};

module.exports = { getUsers };
