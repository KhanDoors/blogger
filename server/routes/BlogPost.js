const express = require("express");
const router = express.Router();

const { create, list, read } = require("../controllers/BlogPost");

router.post("/", create);
router.get("/", list);
router.get("/:slug", read);

module.exports = router;
