var express = require("express");
var router = express.Router();

var sectionService = require("../services/section.service");

router.post("/create", sectionService.create);
router.get("/", sectionService.getAll);
router.get("/:sectionId", sectionService.get);
router.post("/delete", sectionService.remove);

module.exports = router;
