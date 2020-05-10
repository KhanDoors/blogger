const express = require("express");
const router = express.Router();

const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/BlogPost");
const { requireSignIn } = require("../controllers/Auth");

router.post("/", requireSignIn, create);
router.get("/", list);
router.get("/:slug", read);
router.put("/:slug", requireSignIn, update);
router.delete("/:slug", requireSignIn, remove);

module.exports = router;
