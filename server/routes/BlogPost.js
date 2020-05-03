const express = require("express");
const router = express.Router();

const { create, list } = require("../controllers/BlogPost");

router.post("/", create);
router.get("/", list);

module.exports = router;
