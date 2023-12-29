var express = require("express");
var router = express.Router();

var results = require("../services/generateResults");

router.post("/", results.getResults);
router.post("/trainee-result", results.getTraineeResult);
router.post("/publish", results.publishResult);
module.exports = router;
