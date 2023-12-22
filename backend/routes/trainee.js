const express = require("express");
const router = express.Router();

const trainee = require("../services/trainee.service");

router.post("/registration", trainee.registration);
router.post("/flags", trainee.flags);

router.post("/details", trainee.traineeDetails);

router.post("/feedback", trainee.feedback);
router.post("/feedback/status", trainee.checkFeedback);

router.post("/resend/testlink", trainee.resendmail);

router.post("/correct/answers", trainee.correctAnswers);
router.post("/answersheet", trainee.answersheet);

router.post("/paper/questions", trainee.testquestions);
router.post("/get/question", trainee.getQuestion);
router.post("/chosen/options", trainee.chosenOptions);
router.post("/update/answer", trainee.updateAnswers);

router.post("/start/test", trainee.startTest);
router.post("/submit-answer-sheet", trainee.submitAnswerSheet);

module.exports = router;
