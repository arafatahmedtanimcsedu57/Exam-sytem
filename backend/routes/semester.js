var express = require("express");
var router = express.Router();

var semesterService = require("../services/semester.service");

router.post("/", semesterService.create);
router.get("/", semesterService.getAll);
router.get("/:semesterId", semesterService.get);
router.post("/delete", semesterService.remove);

module.exports = router;
