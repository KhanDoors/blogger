const express = require("express");
const router = express.Router();

const { create } = require("../controllers/BlogPost");

router.post("/", create);

module.exports = router;
