const express = require("express");
const router = express.Router();

const { login } = require("../controllers/Auth");

router.post("/", login);

module.exports = router;