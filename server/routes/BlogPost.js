const express = require("express");
const router = express.Router();

const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/BlogPost");

router.post("/", create);
router.get("/", list);
router.get("/:slug", read);
router.put("/:slug", update);
router.delete("/:slug", remove);

module.exports = router;
