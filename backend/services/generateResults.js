var TraineeEnterModel = require("../models/trainee");
var AnswersModel = require("../models/answers");
const TestModel = require("../models/testpaper");

const getResults = (req, res, _) => {
  const { testId } = req.body;

  TestModel.findById(testId)
    .populate("subject")
    .populate("questions")
    .then((test) => {
      if (test) {
        if (test.isResultGenerated) {
          TraineeEnterModel.find({ testId })
            .then((trainee) => {
              if (trainee && trainee.length) {
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
                      from: "optionmodels",
                      localField: "chosenOption",
                      foreignField: "_id",
                      as: "chosenOption",
                    },
                  },
                  {
                    $lookup: {
                      from: "questionmodels",
                      localField: "questionId",
                      foreignField: "_id",
                      as: "question",
                    },
                  },
                  {
                    $lookup: {
                      from: "optionmodels",
                      localField: "question.options",
                      foreignField: "_id",
                      as: "options",
                    },
                  },

                  {
                    $unwind: "$chosenOption",
                  },
                  {
                    $unwind: "$question",
                  },
                  {
                    $group: {
                      _id: "$userId",
                      score: {
                        $sum: {
                          $cond: [
                            { $eq: ["$chosenOption.isAnswer", true] },
                            "$question.weightAge",
                            0,
                          ],
                        },
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: "traineeentermodels",
                      localField: "_id",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  {
                    $unwind: "$user",
                  },
                  { $sort: { score: -1 } },
                ])
                  .then((answer) => {
                    const totalMarks = test.questions.reduce(
                      (prev, curr) => prev + curr.weightAge,
                      0
                    );

                    if (answer && answer.length) {
                      res.json({
                        success: true,
                        data: {
                          test: { ...test._doc, totalMarks },
                          result: answer,
                        },
                      });
                    } else {
                      res.json({
                        success: false,
                        message: "No one attened this test",
                      });
                    }
                  })
                  .catch(() => {
                    res.json({
                      success: false,
                      message: "No one attened this test",
                    });
                  });
              } else {
                res.json({
                  success: false,
                  message: "No one attened this test",
                });
              }
            })
            .catch(() => {
              res.json({
                success: false,
                message: "No one attened this test",
              });
            });
        } else {
          res.json({
            success: false,
            message: "Result is not published yet",
          });
        }
      } else {
        res.json({
          success: false,
          message: "Test information not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Test information not found",
      });
    });
};

const publishResult = (req, res, _) => {
  const { testId } = req.body;

  TestModel.findOneAndUpdate({ _id: testId }, { isResultGenerated: true })
    .then(() =>
      res.json({
        success: true,
        message: "Result is published",
      })
    )
    .catch((err) => {
      console.log(err);

      res.json({
        success: false,
        message: "Server Error",
      });
    });
};

module.exports = { getResults, publishResult };
