var express = require("express");
var router = express.Router();

var tagService = require("../services/tag.service");

router.post("/create", tagService.create);
router.get("/", tagService.getAll);

module.exports = router;
