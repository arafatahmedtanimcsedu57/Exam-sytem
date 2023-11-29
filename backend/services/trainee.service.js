const TraineeEnterModel = require("../models/trainee");
const TestModel = require("../models/testpaper");
const FeedbackModel = require("../models/feedback");
const QuestionModel = require("../models/question");
const options = require("../models/option");
const answersheetModel = require("../models/answersheet");
const AnswersModel = require("../models/answers");
const sendmail = require("./mail").sendmail;

let registration = (req, res, _) => {
  req.check("emailId", "Invalid email address.").isEmail().notEmpty();
  req.check("name", "This field is required.").notEmpty();
  req
    .check("contact", "Invalid contact.")
    .isLength({ min: 14, max: 14 })
    .isNumeric({ no_symbols: false });

  const errors = req.validationErrors();

  if (errors) {
    res.json({
      success: false,
      message: "Invalid inputs",
      errors: errors,
    });
  } else {
    const { name, emailId, contact, organisation, testId, location } = req.body;

    TestModel.findOne({ _id: testId, isRegistrationAvailable: true })
      .then((info) => {
        if (info) {
          TraineeEnterModel.findOne({
            $or: [
              { emailId: emailId, testId: testId },
              { contact: contact, testId: testId },
            ],
          }).then((data) => {
            if (data) {
              res.json({
                success: false,
                message: "This id has already been registered for this test!",
              });
            } else {
              var newTrainee = TraineeEnterModel({
                name,
                emailId,
                contact,
                organisation,
                testId,
                location,
              });

              newTrainee
                .save()
                .then((trainee) => {
                  console.log(trainee);
                  sendmail(
                    emailId,
                    "Registered Successfully",
                    `You have been successfully registered for the test. Click on the link given to take test  "${
                      req.protocol + "://" + req.get("host")
                    }/trainee/taketest?testId=${trainee.testId}&traineeId=${
                      trainee._id
                    }"`
                  )
                    .then(() => {
                      console.log("MAIL SEND");
                    })
                    .catch(() => {
                      console.log("MAIL NOT SEND");
                    });
                  res.json({
                    success: true,
                    message: `Trainee registered successfully!`,
                    user: trainee,
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    success: false,
                    message: "Server error!",
                  });
                });
            }
          });
        } else {
          res.json({
            success: false,
            message: "Registration for this test has been closed!",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error!",
        });
      });
  }
};

let correctAnswers = (req, res, next) => {
  var _id = req.body._id;
  TestModel.find(
    { _id: _id, testConducted: true },
    {
      type: 0,
      subjects: 0,
      duration: 0,
      organisation: 0,
      difficulty: 0,
      testBegins: 0,
      status: 0,
      createdBy: 0,
      isRegistrationAvailable: 0,
      testConducted: 0,
    }
  )
    .populate("questions", "body")
    .populate("questions", "explanation")
    .populate({
      path: "questions",
      model: QuestionModel,
      select: {
        body: 1,
        quesImg: 1,
        weightAge: 1,
        ansCount: 1,
        explanation: 1,
      },
      populate: {
        path: "options",
        model: options,
      },
    })
    .exec(function (err, correctAnswers) {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Unable to fetch details",
        });
      } else {
        if (!correctAnswers) {
          res.json({
            success: false,
            message: "Invalid test id.",
          });
        } else {
          res.json({
            success: true,
            message: "Success",
            data: correctAnswers,
          });
        }
      }
    });
};

let feedback = (req, res, next) => {
  var userId = req.body.userId;
  var testId = req.body.testId;
  var feedback = req.body.feedback;
  var rating = req.body.rating;

  var tempdata = FeedbackModel({
    feedback: feedback,
    rating: rating,
    userId: userId,
    testId: testId,
  });
  tempdata
    .save()
    .then(() => {
      res.json({
        success: true,
        message: `Feedback recorded successfully!`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error occured!",
      });
    });
};

let checkFeedback = (req, res, next) => {
  var userId = req.body.userId;
  var testId = req.body.testId;
  FeedbackModel.findOne({ userId: userId, testId: testId })
    .then((info) => {
      if (!info) {
        res.json({
          success: true,
          message: "Feedback is not given by this userId.",
          status: false,
        });
      } else {
        res.json({
          success: true,
          message: "Feedback given",
          status: true,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error occured!",
      });
    });
};

let resendmail = (req, res, next) => {
  var userId = req.body.id;
  TraineeEnterModel.findById(userId, { emailId: 1, testId: 1 }).then((info) => {
    if (info) {
      console.log(info);
      sendmail(
        info.emailId,
        "Registered Successfully",
        `You have been successfully registered for the test. Click on the link given to take test  "${
          req.protocol + "://" + req.get("host")
        }/trainee/taketest?testId=${info.testId}&traineeId=${info._id}"`
      )
        .then((dd) => {
          console.log(dd);
        })
        .catch((errr) => {
          console.log(errr);
        });
      res.json({
        success: true,
        message: `Link sent successfully!`,
      });
    } else {
      res.json({
        success: false,
        message: "This user has not been registered.",
      });
    }
  });
};

let testquestions = (req, res, next) => {
  var testId = req.body.id;
  TestModel.findById(testId, {
    type: 0,
    title: 0,
    subjects: 0,
    organisation: 0,
    difficulty: 0,
    testBegins: 0,
    status: 0,
    createdBy: 0,
    isRegistrationAvailable: 0,
  })
    .populate("questions", "body")
    .populate({
      path: "questions",
      model: QuestionModel,
      select: { body: 1, quesImg: 1, weightAge: 1, ansCount: 1, duration: 1 },
      populate: {
        path: "options",
        select: { optBody: 1, optImg: 1 },
      },
    })
    .exec(function (err, testquestions) {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Unable to fetch details",
        });
      } else {
        if (!testquestions) {
          res.json({
            success: false,
            message: "Invalid test id.",
          });
        } else {
          res.json({
            success: true,
            message: "Success",
            data: testquestions.questions,
          });
        }
      }
    });
};

let answersheet = (req, res, next) => {
  var userId = req.body.userId;
  var testId = req.body.testId;
  var p1 = TraineeEnterModel.find({ _id: userId, testId: testId });
  var p2 = TestModel.find({
    _id: testId,
    testBegins: true,
    testConducted: false,
  });

  Promise.all([p1, p2])
    .then((info) => {
      if (info[0].length && info[1].length) {
        answersheetModel
          .find({ userId: userId, testId: testId })
          .then((data) => {
            if (data.length) {
              res.json({
                success: true,
                message: "Answer Sheet already exists!",
                data: data,
              });
            } else {
              var qus = info[1][0].questions;
              var answer = qus.map((d, i) => {
                return {
                  questionId: d,
                  chosenOption: [],
                  userId: userId,
                };
              });
              AnswersModel.insertMany(answer, (err, ans) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({
                    success: false,
                    message: "Unable to create answersheet!",
                  });
                } else {
                  var startTime = new Date();
                  var tempdata = answersheetModel({
                    startTime: startTime,
                    questions: qus,
                    answers: ans,
                    testId: testId,
                    userId: userId,
                  });
                  tempdata
                    .save()
                    .then((answersheet) => {
                      res.json({
                        success: true,
                        message: "Test has started!",
                      });
                    })
                    .catch((error) => {
                      res.status(500).json({
                        success: false,
                        message: "Unable to fetch details",
                      });
                    });
                }
              });
            }
          });
      } else {
        res.json({
          success: false,
          message: "Invalid URL",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Unable to fetch details",
      });
    });
};

let flags = (req, res, _) => {
  const { testId, traineeId } = req.body;

  const p1 = answersheetModel.findOne(
    { userId: traineeId, testId: testId },
    { _id: 1, startTime: 1, completed: 1 }
  );

  const p2 = TraineeEnterModel.findOne(
    { _id: traineeId, testId: testId },
    { _id: 1 }
  );

  const p3 = TestModel.findById(testId, {
    testBegins: 1,
    testConducted: 1,
    duration: 1,
  });

  var present = new Date();

  Promise.all([p1, p2, p3])
    .then((info) => {
      //checking valid (registered trainee) user
      if (info[1] === null) {
        //this tainee id is not valid
        res.json({
          success: false,
          message: "Invalid URL!",
        });
      } else {
        //this trinee is valid
        let startedWriting = false; //this variable will track trinee has already start the test or not
        let pending = null; //counting remaining time

        if (info[0] !== null) {
          const testDuration = info[2].duration;
          const testStartTime = info[0].startTime;

          startedWriting = true;
          pending = testDuration * 60 - (present - testStartTime) / 1000;

          if (pending <= 0) {
            //time over

            answersheetModel
              .findOneAndUpdate(
                { userId: traineeId, testId: testId },
                { completed: true } // finished
              )
              .then(() => {
                res.json({
                  success: true,
                  message: "Successfull",
                  data: {
                    testBegins: info[2].testBegins,
                    testConducted: info[2].testConducted,
                    startedWriting: startedWriting,
                    pending: pending,
                    completed: true,
                  },
                });
              })
              .catch(() => {
                res.status(500).json({
                  success: false,
                  message: "Unable to fetch details",
                });
              });
          } else {
            res.json({
              success: true,
              message: "Successfull",
              data: {
                testBegins: info[2].testBegins,
                testConducted: info[2].testConducted,
                startedWriting: startedWriting,
                pending: pending,
                completed: info[0].completed,
              },
            });
          }
        } else {
          res.json({
            success: true,
            message: "Successfull",
            data: {
              testBegins: info[2].testBegins,
              testConducted: info[2].testConducted,
              startedWriting: startedWriting,
              pending: pending,
              completed: false,
            },
          });
        }
      }
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: "Unable to fetch details",
      });
    });
};

let traineeDetails = (req, res, _) => {
  const { _id: traineeId } = req.body;

  TraineeEnterModel.findById(traineeId, { name: 1, emailId: 1, contact: 1 })
    .then((info) => {
      if (info) {
        res.json({
          success: true,
          message: "Trainee details",
          data: info,
        });
      } else {
        res.json({
          success: false,
          message: "This trainee does not exists",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Unable to fetch details",
      });
    });
};

let chosenOptions = (req, res, next) => {
  const { testId, userId } = req.body;

  answersheetModel
    .findOne({ testId, userId }, { answers: 1 })
    .populate("answers")
    .exec(function (err, answersheet) {
      if (err) {
        res.json({
          success: false,
          message: "answersheet does not exist",
        });
      } else {
        res.json({
          success: true,
          message: "Chosen Options",
          data: answersheet,
        });
      }
    });
};

let updateAnswers = (req, res, _) => {
  const { testId, userId, questionId, newAnswer } = req.body;

  const p1 = TestModel.findOne(
    { _id: testId, testConducted: false },
    { duration: 1 }
  );
  const p2 = answersheetModel.findOne(
    { testId, userId, completed: false },
    { _id: 1, startTime: 1 }
  );

  var present = new Date();
  Promise.all([p1, p2])
    .then((info) => {
      if (info[1]) {
        let pending = null;
        pending = info[0].duration * 60 - (present - info[1].startTime) / 1000;
        if (pending > 0) {
          AnswersModel.findOneAndUpdate(
            { questionId, userId },
            { chosenOption: newAnswer }
          )
            .then((info) => {
              if (info) {
                res.json({
                  success: true,
                  message: "Answer Updated",
                  data: info,
                });
              } else {
                res.json({
                  success: false,
                  message: "Question is required!",
                });
              }
            })
            .catch((error) => {
              res.status(500).json({
                success: false,
                message: "Error occured!",
              });
            });
        } else {
          answersheetModel
            .findByIdAndUpdate(
              { testId: testId, userId: userId },
              { completed: true }
            )
            .then(() => {
              res.json({
                success: false,
                message: "Time is up!",
              });
            })
            .catch((error) => {
              res.status(500).json({
                success: false,
                message: "Error occured!",
              });
            });
        }
      } else {
        res.json({
          success: false,
          message: "Unable to update answer",
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: "Error occured!",
      });
    });
};

let endTest = (req, res, _) => {
  const { testId, userId } = req.body;

  answersheetModel
    .findOneAndUpdate({ testId, userId }, { completed: true })
    .then((info) => {
      if (info) {
        res.json({
          success: true,
          message: "Your answers have been submitted",
        });
      } else {
        res.json({
          success: false,
          message: "Unable to submit answers!",
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: "Error occured!",
      });
    });
};

let getQuestion = (req, res, _) => {
  const { questionId } = req.body;

  QuestionModel.find(
    { _id: questionId, status: 1 },
    { body: 1, options: 1, quesImg: 1 }
  )
    .populate({
      path: "options",
      model: options,
      select: { optBody: 1, optImg: 1 },
    })
    .exec(function (err, question) {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      } else {
        if (question.length === 0) {
          res.json({
            success: false,
            message: `No such question exists`,
          });
        } else {
          res.json({
            success: true,
            message: `Success`,
            data: question,
          });
        }
      }
    });
};

module.exports = {
  registration,
  feedback,
  checkFeedback,
  resendmail,
  correctAnswers,
  answersheet,
  flags,
  chosenOptions,
  traineeDetails,
  testquestions,
  updateAnswers,
  endTest,
  getQuestion,
};
