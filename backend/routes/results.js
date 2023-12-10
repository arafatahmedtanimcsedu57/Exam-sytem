var express = require("express");
var router = express.Router();

var results = require("../services/generateResults");
// router.post('/results', results.generateResults);
router.post("/result", results.getResults);
module.exports = router;
