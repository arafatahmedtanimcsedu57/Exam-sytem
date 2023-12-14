var express = require("express");
var router = express.Router();

var studentService = require("../services/student.service");

router.post("/create", studentService.create);
router.get("/", studentService.getAll);
router.get("/:studentId", studentService.get);
router.post("/delete", studentService.remove);

module.exports = router;
