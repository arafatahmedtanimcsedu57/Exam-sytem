var express = require("express");
var router = express.Router();

var trainerService = require("../services/trainer.service");

//create new Trainer
router.post("/", trainerService.create);
router.get("/", trainerService.getAll);
router.get("/:trainerId", trainerService.get);
router.post("/delete", trainerService.remove);

module.exports = router;
