const { Router } = require("express");
const express = require("express");
const { validate } = require("express-validation");

const { getUsers } = require("../controllers/usersController");

const router = express.Router();

router.get("/", getUsers);

module.exports = router;
