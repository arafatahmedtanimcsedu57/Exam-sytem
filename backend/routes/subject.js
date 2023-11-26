var express = require("express");
var router = express.Router();

var subject = require("../services/subject.service");

router.post("/create", subject.create);
router.get("/", subject.getAll);
router.get("/:_id", subject.get);

module.exports = router;
