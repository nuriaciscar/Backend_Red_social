const { Router } = require("express");
const express = require("express");
const { validate } = require("express-validation");
const auth = require("../middlewares/auth");

const firebase = require();
const { getUsers } = require("../controllers/usersController");

const router = express.Router();

router.get("/", auth, getUsers);

module.exports = router;
