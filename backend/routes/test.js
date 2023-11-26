var express = require("express");
var router = express.Router();

var testService = require("../services/test.service");

router.post("/create", testService.create);

router.post("/new/name/check", testService.checkTestName);
router.get("/details/:_id", testService.getSingletest);
router.post("/details/all", testService.getAlltests);
router.post("/delete", testService.deleteTest);
router.post("/basic/details", testService.basicTestdetails);
router.post("/questions", testService.getTestquestions);
router.post("/candidates", testService.getCandidates);
router.post("/begin", testService.beginTest);
router.post("/end", testService.endTest);
router.post("/trainer/details", testService.TestDetails);
router.post("/candidates/details", testService.getCandidateDetails);
router.post("/max/marks", testService.MM);

module.exports = router;
