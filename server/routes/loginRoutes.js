const { Router } = require("express");
const express = require("express");
const { validate } = require("express-validation");

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);

module.exports = router;
