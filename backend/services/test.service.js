let QuestionModel = require("../models/question");
let TestPaperModel = require("../models/testpaper");
let TraineeEnterModel = require("../models/trainee");
let OptionModel = require("../models/option");
let SubjectModel = require("../models/subject");
let ResultModel = require("../models/results");

let tool = require("./tool");
let result = require("./excel").result;

let create = (req, res, next) => {
  const { _id } = req.body || null;

  if (req.user.type === "TRAINER") {
    req.check("type", "invalid type").notEmpty();
    req.check("title", "Enter title").notEmpty();
    req.check("questions", "Enter questions").notEmpty();

    var errors = req.validationErrors();
    if (errors)
      res.json({
        success: false,
        message: "Invalid inputs",
        errors,
      });
    else {
      const {
        type,
        title,
        questions,
        difficulty,
        organisation,
        duration,
        subjects,
      } = req.body;

      if (_id !== null) {
        TestPaperModel.findOneAndUpdate(
          { _id: _id },
          {
            title: title,
            questions: questions,
          }
        )
          .then(() => {
            res.json({
              success: true,
              message: "Testpaper has been updated!",
            });
          })
          .catch(() => {
            res.status(500).json({
              success: false,
              message: "Unable to update testpaper!",
            });
          });
      } else {
        TestPaperModel.findOne(
          { title, type, testbegins: 0 },
          { status: 0 }
        ).then((info) => {
          if (!info) {
            const newTest = TestPaperModel({
              type,
              title,
              questions,
              difficulty,
              organisation,
              duration,
              subjects,
              createdBy: req.user._id,
            });

            newTest
              .save()
              .then((test) => {
                res.json({
                  success: true,
                  message: "New testpaper created successfully!",
                  testid: test._id,
                });
              })
              .catch(() => {
                res.status(500).json({
                  success: false,
                  message: "Unable to create new testpaper!",
                });
              });
          } else {
            res.json({
              success: false,
              message: "This testpaper already exists!",
            });
          }
        });
      }
    }
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let getSingletest = (req, res, next) => {
  let { _id } = req.params;

  TestPaperModel.find(
    { _id, status: 1 },
    { createdAt: 0, updatedAt: 0, status: 0 }
  )
    .populate("createdBy", "name")
    .populate("questions", "body")
    .populate({
      path: "subjects",
      model: SubjectModel,
    })
    .populate({
      path: "questions",
      populate: {
        path: "options",
        model: OptionModel,
      },
    })
    .exec(function (err, testpaper) {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      } else {
        res.json({
          success: true,
          message: `Success`,
          data: testpaper,
        });
      }
    });
};

let getAlltests = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    var title = req.body.title;
    TestPaperModel.find({ createdBy: req.user._id, status: 1 }, { status: 0 })
      .populate("questions", "body")
      .populate({
        path: "subjects",
        model: SubjectModel,
      })
      .populate({
        path: "questions",
        populate: {
          path: "options",
          model: OptionModel,
        },
      })

      .exec(function (err, testpaper) {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Unable to fetch data",
          });
        } else {
          res.json({
            success: true,
            message: `Success`,
            data: testpaper,
          });
        }
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let deleteTest = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    var _id = req.body._id;
    TestPaperModel.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        status: 0,
      }
    )
      .then(() => {
        res.json({
          success: true,
          message: "Test has been deleted",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Unable to delete test",
        });
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};
let TestDetails = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    let testid = req.body.id;
    TestPaperModel.findOne(
      { _id: testid, createdBy: req.user._id },
      {
        isResultgenerated: 0,
        isRegistrationavailable: 0,
        createdBy: 0,
        status: 0,
        testbegins: 0,
        questions: 0,
      }
    )
      .populate("subjects", "topic")
      .exec(function (err, TestDetails) {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Unable to fetch details",
          });
        } else {
          if (!TestDetails) {
            res.json({
              success: false,
              message: "Invalid test id.",
            });
          } else {
            res.json({
              success: true,
              message: "Success",
              data: TestDetails,
            });
          }
        }
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let basicTestdetails = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    let testid = req.body.id;
    TestPaperModel.findById(testid, { questions: 0 })
      .populate("createdBy", "name")
      .populate("subjects", "topic")
      .exec(function (err, basicTestdetails) {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Unable to fetch details",
          });
        } else {
          if (!basicTestdetails) {
            res.json({
              success: false,
              message: "Invalid test id.",
            });
          } else {
            res.json({
              success: true,
              message: "Success",
              data: basicTestdetails,
            });
          }
        }
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let getTestquestions = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    var testid = req.body.id;
    TestPaperModel.findById(testid, {
      type: 0,
      title: 0,
      subjects: 0,
      duration: 0,
      organisation: 0,
      difficulty: 0,
      testbegins: 0,
      status: 0,
      createdBy: 0,
      isRegistrationavailable: 0,
    })
      .populate("questions", "body")
      .populate({
        path: "questions",
        model: QuestionModel,
        select: { body: 1, quesImg: 1, weightAge: 1, ansCount: 1 },
        populate: {
          path: "options",
          model: OptionModel,
        },
      })
      .exec(function (err, getTestquestions) {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Unable to fetch details",
          });
        } else {
          if (!getTestquestions) {
            res.json({
              success: false,
              message: "Invalid test id.",
            });
          } else {
            res.json({
              success: true,
              message: "Success",
              data: getTestquestions.questions,
            });
          }
        }
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let getCandidateDetails = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    var testid = req.body.testid;
    ResultModel.find({ testid: testid }, { score: 1, userid: 1 })
      .populate("userid")
      .exec(function (err, getCandidateDetails) {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Unable to fetch details",
          });
        } else {
          if (getCandidateDetails.length == null) {
            res.json({
              success: false,
              message: "Invalid testid!",
            });
          } else {
            res.json({
              success: true,
              message: "Candidate details",
              data: getCandidateDetails,
            });
          }
        }
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let getCandidates = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    var testid = req.body.id;
    TraineeEnterModel.find({ testid: testid }, { testid: 0 })
      .then((getCandidates) => {
        res.json({
          success: true,
          message: "success",
          data: getCandidates,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Unable to get candidates!",
        });
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let beginTest = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    var id = req.body.id;
    TestPaperModel.findOneAndUpdate(
      { _id: id, testconducted: false },
      { testbegins: 1, isRegistrationavailable: 0 },
      { new: true }
    )
      .then((data) => {
        if (data) {
          res.json({
            success: true,
            message: "Test has been started.",
            data: {
              isRegistrationavailable: data.isRegistrationavailable,
              testbegins: data.testbegins,
              testconducted: data.testconducted,
              isResultgenerated: data.isResultgenerated,
            },
          });
        } else {
          res.json({
            success: false,
            message: "Unable to start test.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let endTest = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    var id = req.body.id;
    TestPaperModel.findOneAndUpdate(
      { _id: id, testconducted: 0, testbegins: 1, isResultgenerated: 0 },
      { testbegins: false, testconducted: true, isResultgenerated: true },
      {
        new: true,
      }
    )
      .then((info) => {
        if (info) {
          console.log(info);
          result(id, MaxMarks)
            .then((sheet) => {
              res.json({
                success: true,
                message: "The test has ended.",
                data: {
                  isRegistrationavailable: info.isRegistrationavailable,
                  testbegins: info.testbegins,
                  testconducted: info.testconducted,
                  isResultgenerated: info.isResultgenerated,
                },
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                success: false,
                message: "Server Error",
              });
            });
        } else {
          res.json({
            success: false,
            message: "Invalid inputs!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let MaxMarks = (testid) => {
  return new Promise((resolve, reject) => {
    TestPaperModel.findOne({ _id: testid }, { questions: 1 })
      .populate({
        path: "questions",
        model: QuestionModel,
        select: { weightAge: 1 },
      })
      .exec(function (err, Ma) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (!Ma) {
            reject(new Error("Invalid testid"));
          } else {
            let m = 0;
            Ma.questions.map((d, i) => {
              m += d.weightAge;
            });
            console.log(m);
            resolve(m);
          }
        }
      });
  });
};

let MM = (req, res, next) => {
  var testid = req.body.testid;
  if (req.user.type === "TRAINER") {
    MaxMarks(testid)
      .then((MaxM) => {
        res.json({
          success: true,
          message: "Maximum Marks",
          data: MaxM,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Unable to get Max Marks",
        });
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let checkTestName = (req, res, next) => {
  var testName = req.body.testname;
  if (req.user.type === "TRAINER") {
    TestPaperModel.findOne({ title: testName }, { _id: 1 })
      .then((data) => {
        if (data) {
          res.json({
            success: true,
            can_use: false,
          });
        } else {
          res.json({
            success: true,
            can_use: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Server error",
        });
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

module.exports = {
  create,

  checkTestName,
  getSingletest,
  getAlltests,
  deleteTest,
  MaxMarks,
  MM,
  getCandidateDetails,
  basicTestdetails,
  TestDetails,
  getTestquestions,
  getCandidates,
  beginTest,
  endTest,
};
