var express = require("express");
var router = express.Router();

var testService = require("../services/test.service");

router.post("/create", testService.create);

router.post("/", testService.getAll);

router.post("/trainer-test", testService.getTrainerTest);
router.get("/:_id", testService.get);

router.post("/delete", testService.remove);

router.post("/begin", testService.begin);
router.post("/end", testService.end);

router.post("/candidates", testService.getCandidates);
router.post("/candidates_results", testService.getCandidateDetails);

module.exports = router;
