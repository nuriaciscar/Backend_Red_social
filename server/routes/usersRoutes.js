const { Router } = require("express");
const express = require("express");
const { validate } = require("express-validation");
const {} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);

module.exports = router;
