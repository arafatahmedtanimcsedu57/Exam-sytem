var TraineeEnterModel = require("../models/trainee");
var TestPaperModel = require("../models/testpaper");
var QuestionModel = require("../models/question");
var options = require("../models/option");
var AnswersheetModel = require("../models/answersheet");
var AnswersModel = require("../models/answers");
var subResultsModel = require("../models/subResults");
var ResultModel = require("../models/results");
const questionSchema = require("../schemas/question");

let generateResults = (req, res, next) => {
  var userId = req.body.userId;
  var testId = req.body.testId;

  gresult(userId, testId)
    .then((result) => {
      console.log(result);
      res.json({
        success: true,
        message: "Result generated successfully",
        result: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Unable to generate result",
      });
    });
};

let gresult = (uid, tid) => {
  return new Promise((resolve, reject) => {
    const ansMap = ["A", "B", "C", "D", "E"];
    ResultModel.findOne({ userId: uid, testId: tid })
      .populate("result")
      .exec(function (err, results) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (!results) {
            AnswersheetModel.findOne(
              { userId: uid, testId: tid, completed: true },
              { testId: 0, userId: 0, startTime: 0, completed: 0 }
            )
              .populate({
                path: "questions",
                select: {
                  explanation: 1,
                  weightAge: 1,
                  body: 1,
                },
                populate: {
                  path: "options",
                  model: options,
                  select: {
                    isAnswer: 1,
                  },
                },
              })
              .populate("answers", "questionId chosenOption")
              .exec(function (err, answersheet) {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  if (!answersheet) {
                    reject(new Error("invalid Inputs"));
                  } else {
                    var Score = 0;
                    var questions = answersheet.questions;
                    var answers = answersheet.answers;
                    let subResults = questions.map((d, i) => {
                      var ans = answers[i].chosenOption;
                      var correctAns = [];
                      var givenAns = [];
                      d.options.map((dd, ii) => {
                        if (dd.isAnswer) {
                          correctAns.push(ansMap[ii]);
                        }
                        for (var m = 0; m < ans.length; m++) {
                          if (String(ans[m]) == String(dd._id)) {
                            givenAns.push(ansMap[ii]);
                          }
                        }
                      });
                      var l1 = correctAns.length;
                      var l2 = givenAns.length;
                      var iscorrect = false;
                      if (l1 == l2) {
                        var count = 0;
                        for (var p = 0; p < l1; p++) {
                          for (var q = 0; q < l2; q++) {
                            if (correctAns[p] == givenAns[q]) {
                              count++;
                              break;
                            }
                          }
                        }
                        if (count == l1) {
                          iscorrect = true;
                          Score += d.weightAge;
                        }
                      }
                      var tmp = {
                        questionId: d._id,
                        weightAge: d.weightAge,
                        correctAnswer: correctAns,
                        givenAnswer: givenAns,
                        explanation: d.explanation,
                        iscorrect: iscorrect,
                      };

                      return tmp;
                    });
                    subResultsModel.insertMany(subResults, (err, subres) => {
                      if (err) {
                        reject(err);
                      } else {
                        var tempdata = ResultModel({
                          testId: tid,
                          userId: uid,
                          answerSheetid: answersheet._id,
                          result: subres,
                          score: Score,
                        });
                        tempdata
                          .save()
                          .then((data) => {
                            resolve(data);
                          })
                          .catch((err) => {
                            reject(err);
                          });
                      }
                    });
                  }
                }
              });
          } else {
            resolve(results);
          }
        }
      });
  });
};

let getResults = (req, res, _) => {
  const { testId } = req.body;
  // console.log(testId);

  TraineeEnterModel.find({ testId })
    .then((trainee) => {
      if (trainee && trainee.length) {
        let _answerPaper = [];

        let traineeIds = trainee.map((_trainee) => _trainee._id);
        AnswersModel.aggregate([
          {
            $match: {
              userId: {
                $in: traineeIds,
              },
            },
          },
          {
            $lookup: {
              from: "traineeentermodels", // Replace with the actual name of your User model collection
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $lookup: {
              from: "optionmodels", // Replace with the actual name of your User model collection
              localField: "chosenOption",
              foreignField: "_id",
              as: "chosenOption",
            },
          },
          {
            $lookup: {
              from: "questionmodels", // Replace with the actual name of your User model collection
              localField: "questionId",
              foreignField: "_id",
              as: "question",
            },
          },
          {
            $group: {
              _id: "$userId", // Group by the document's _id
              answerSheet: { $push: "$$ROOT" }, // Push each document into the responses array
            },
          },
        ])
          .then((answer) => {
            console.log(answer);
            res.json({
              success: true,
              data: answer,
            });
            // if (answer && answer.length) {
            //   _answerPaper.push({
            //     // userInfo: _trainee,
            //     answerPaper: answer,
            //   });
            // } else {
            //   _answerPaper.push({
            //     // userInfo: _trainee,
            //     answerPaper: [],
            //   });
            // }
          })
          .catch((err) => {
            console.log(err);
            // _answerPaper.push({
            //   // userInfo: _trainee,
            //   answerPaper: [],
            // });
          });

        // console.log(_answerPaper);
      } else {
        res.json({
          success: false,
          message: "No one attened this test",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        message: "No one attened this test",
      });
    });

  // res.json({
  //   success: true,
  //   message: "Result generated successfully",
  //   result: testId,
  // });
};

module.exports = { generateResults, gresult, getResults };
