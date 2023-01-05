const express = require("express");
const { createChien, deleteChien, getChien, getChiens, putChien } = require("./../controllers/chien-controller");
const router = express.Router();

router.get("/", getChiens);
router.post("/", createChien);
router.put("/:id", putChien);
router.delete("/:id", deleteChien);
router.get("/:id", getChien);

module.exports = router;
