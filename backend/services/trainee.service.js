const TraineeEnterModel = require("../models/trainee");
const TestModel = require("../models/testpaper");
const FeedbackModel = require("../models/feedback");
const QuestionModel = require("../models/question");
const options = require("../models/option");
const AnswerSheetModel = require("../models/answersheet");
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
        AnswerSheetModel.find({ userId: userId, testId: testId }).then(
          (data) => {
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
                  var tempdata = AnswerSheetModel({
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
          }
        );
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

let examState = (req, res, _) => {
  const { testId, traineeId } = req.body;

  var present = new Date();

  const answerSheetPromise = AnswerSheetModel.findOne({
    userId: traineeId,
    testId,
  });

  const traineePromise = TraineeEnterModel.findOne({ _id: traineeId, testId });

  const testPromise = TestModel.findById(testId);

  Promise.all([testPromise, traineePromise, answerSheetPromise])
    .then((info) => {
      if (info && info.length) {
        const test = info[0];
        const trainee = info[1];
        const answerSheet = info[2];

        if (trainee) {
          //has registered user
          if (answerSheet) {
            // already has a answer paper
            const { _id, startTime, completed } = answerSheet || {};

            if (completed) {
              // submit the answer paper
              res.json({
                success: false,
                message: "You already submit your paper",
              });
            } else {
              if (test) {
                // has a valid test
                const { isResultGenerated } = test;

                if (!isResultGenerated) {
                  //result is not publised
                  res.status(200).json({
                    success: true,
                    data: {
                      testInfo: test,
                      examInfo: answerSheet,
                    },
                  });
                } else {
                  // result is published and you are late
                  res.status(404).json({
                    success: false,
                    message: "Test is over",
                  });
                }
              } else {
                //test doesn't exist
                res.status(404).json({
                  success: false,
                  message: "Test not found",
                });
              }
            }
          } else {
            if (test) {
              // has a valid test
              const { testConducted, testBegins } = test;

              if (!testConducted) {
                // user can start now

                if (testBegins) {
                  //Test is started
                  res.status(200).json({
                    success: true,
                    data: {
                      testInfo: test,
                      examInfo: null,
                    },
                  });
                } else {
                  res.json({
                    success: false,
                    message:
                      "The test has not yet commenced. We kindly request your patience as we await the official start. Please consider reaching out to your professor for further guidance or information.",
                  });
                }
              } else {
                res.json({
                  success: false,
                  message: "Joining time is over",
                });
              }
            } else {
              //test doesn't exist
              res.json({
                success: false,
                message: "Test not found",
              });
            }
          }
        } else {
          res.json({
            success: false,
            message:
              "Regrettably, you are not enrolled for this examination. We advise you to seek immediate clarification from the appropriate administrative channels or contact your academic advisor for further assistance in resolving this matter.",
          });
        }
      }
    })
    .catch((_) => {
      res.json({
        success: false,
        message: "Invalid URL",
      });
    });
};

let startExam = (req, res, _) => {
  const { testId, traineeId: userId } = req.body;

  AnswerSheetModel.findOne({ testId, userId }).then((answerSheet) => {
    if (answerSheet) {
      res.json({
        success: false,
        message: "You have already started",
      });
    } else {
      TestModel.findOne({ _id: testId, testConducted: false })
        .then((test) => {
          if (test) {
            const startTime = new Date();
            const { questions } = test;

            const newAnswerSheet = AnswerSheetModel({
              questions,
              answers: [],
              completed: false,
              startTime,
              testId,
              userId,
            });

            newAnswerSheet
              .save()
              .then((answerSheet) => {
                res.json({
                  success: true,
                  data: answerSheet,
                });
              })
              .catch(() => {
                res.status(500).json({
                  success: false,
                  message: "Something went wrong",
                });
              });
          } else {
            res.status(404).json({
              success: false,
              message: "Test is not found",
            });
          }
        })
        .catch(() => {
          res.status(404).json({
            success: false,
            message: "Test is not found",
          });
        });
    }
  });
};

let traineeDetails = (req, res, _) => {
  const { _id: traineeId } = req.body;

  TraineeEnterModel.findById(traineeId)
    .then((info) => {
      if (info) {
        res.json({
          success: true,
          data: info,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "This trainee does not exists",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        success: false,
        message: "This trainee does not exists",
      });
    });
};

let chosenOptions = (req, res, next) => {
  const { testId, userId } = req.body;

  AnswerSheetModel.findOne({ testId, userId }, { answers: 1 })
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

let updateAnswer = (req, res, _) => {
  const { testId, userId, questionId, newAnswer } = req.body;

  const testPromise = TestModel.findOne(
    { _id: testId, isResultGenerated: false },
    { duration: 1 }
  );
  const answerSheetPromise = AnswerSheetModel.findOne(
    { testId, userId, completed: false },
    { _id: 1, startTime: 1 }
  );

  const present = new Date();

  Promise.all([testPromise, answerSheetPromise])
    .then((info) => {
      if (info && info.length) {
        const test = info[0];
        const answerSheet = info[1];

        if (test) {
          if (answerSheet) {
            const { duration } = test;
            const { startTime } = answerSheet;

            let remainingtime = duration * 60 - (present - startTime) / 1000;

            console.log(remainingtime);

            if (remainingtime > 0) {
              AnswersModel.findOneAndUpdate(
                { questionId, userId },
                { chosenOption: newAnswer }
              )
                .then((info) => {
                  if (info) {
                    res.json({
                      success: true,
                      data: info,
                    });
                  } else {
                    const _newAnswer = AnswersModel({
                      questionId,
                      chosenOption: newAnswer,
                      userId,
                    });

                    _newAnswer
                      .save()
                      .then((answer) => {
                        if (answer) {
                          res.json({
                            success: true,
                            message: "Answer Stored",
                          });
                        } else {
                          res.status(500).json({
                            success: false,
                            message: "Server error!",
                          });
                        }
                      })
                      .catch(() => {
                        res.status(500).json({
                          success: false,
                          message: "Server error!",
                        });
                      });
                  }
                })
                .catch((_) => {
                  res.status(500).json({
                    success: false,
                    message: "Error occured!",
                  });
                });
            } else {
              res.status(500).json({
                success: false,
                message: "Time is up",
              });
            }
          } else {
            res.json({
              success: false,
              message: "Answer paper not found",
            });
          }
        } else {
          res.json({
            success: false,
            message: "Test not found",
          });
        }
      } else {
        res.json({
          success: false,
          message: "Error occured!",
        });
      }
    })
    .catch(() =>
      res.status(500).json({
        success: false,
        message: "Error occured!",
      })
    );
};

const submitAnswerSheet = (req, res, _) => {
  const { testId, userId } = req.body;

  AnswerSheetModel.findOneAndUpdate({ testId, userId }, { completed: true })
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
  const { questionId, userId } = req.body;

  QuestionModel.findOne(
    { _id: questionId, status: 1 },
    { body: 1, options: 1, quesImg: 1, weightAge: 1 }
  )
    .populate({
      path: "options",
      model: options,
      select: { optBody: 1, optImg: 1 },
    })
    .exec(function (err, question) {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      } else {
        if (!question) {
          res.json({
            success: false,
            message: `No such question exists`,
          });
        } else {
          AnswersModel.findOne({ questionId, userId }, { chosenOption: 1 })
            .then((chosenOption) => {
              if (chosenOption) {
                res.json({
                  success: true,
                  message: `Success`,
                  data: {
                    ...question._doc,
                    ...chosenOption._doc,
                  },
                });
              } else {
                res.json({
                  success: true,
                  message: `Success`,
                  data: { ...question._doc, chosenOption: [] },
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                success: false,
                message: "Unable to fetch data",
              });
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
  examState,
  chosenOptions,
  traineeDetails,
  testquestions,
  updateAnswer,
  submitAnswerSheet,
  startExam,
  getQuestion,
};
