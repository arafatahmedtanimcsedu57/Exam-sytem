var express = require("express");
var router = express.Router();

var subject = require("../services/subject.service");

router.post("/", subject.create);
router.get("/", subject.getAll);
router.get("/:subjectId", subject.get);

module.exports = router;
