var express = require("express");
var router = express.Router();

var questionService = require("../services/question.service");

router.post("/create", questionService.create);
router.post("/", questionService.getAll);
router.get("/:_id", questionService.get);
router.post("/delete", questionService.remove);

module.exports = router;
