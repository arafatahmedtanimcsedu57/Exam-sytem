let TestPaperModel = require("../models/testpaper");
let QuestionModel = require("../models/question");
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

      if (_id) {
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

let get = (req, res, next) => {
  let { _id } = req.params;

  TestPaperModel.findOne(
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
    .exec(function (err, test) {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      } else {
        res.json({
          success: true,
          message: `Success`,
          data: test,
        });
      }
    });
};

let getAll = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    var title = req.body.title;

    TestPaperModel.find(
      {
        createdBy: req.user._id,
        status: 1,
      },
      { status: 0 }
    )
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
      .exec(function (err, test) {
        if (err)
          res.status(500).json({
            success: false,
            message: "Unable to fetch data",
          });
        else
          res.json({
            success: true,
            message: "Success",
            data: test,
          });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let remove = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    const { _id } = req.body;
    TestPaperModel.findOneAndUpdate({ _id }, { status: 0 })
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
    res.status(403).json({
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

let begin = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    const { id: _id } = req.body;
    TestPaperModel.findOneAndUpdate(
      { _id, testconducted: false },
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
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let end = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    const { id: _id } = req.body;
    TestPaperModel.findOneAndUpdate(
      { _id, testconducted: 0, testbegins: 1, isResultgenerated: 0 },
      { testbegins: false, testconducted: true, isResultgenerated: true },
      { new: true }
    )
      .then((info) => {
        if (info) {
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
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

module.exports = {
  create,
  get,
  getAll,
  remove,

  getCandidateDetails,
  getCandidates,
  begin,
  end,
};
