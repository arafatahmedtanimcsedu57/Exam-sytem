var express = require("express");
var router = express.Router();

var trainerService = require("../services/trainer.service");

//create new Trainer
router.post("/create", trainerService.create);
router.get("/", trainerService.getAll);
router.get("/:_id", trainerService.get);
router.post("/delete", trainerService.remove);

module.exports = router;
