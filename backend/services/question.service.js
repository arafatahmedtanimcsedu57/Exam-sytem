let QuestionModel = require("../models/question");
let OptionModel = require("../models/option");

const create = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    req.check("body", "Invalid question!").notEmpty();
    req.check("subject", "Enter subject!").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      res.json({
        success: false,
        message: "Invalid inputs",
        errors,
      });
    } else {
      const {
        explanation,
        weightAge,
        subject,
        body,
        options,
        quesImg,
        difficulty,
      } = req.body;

      let ansCount = 0;
      options.map((option) => {
        if (option.isAnswer) {
          ansCount = ansCount + 1;
        }
      });

      QuestionModel.findOne({ body: body, status: 1 }, { status: 0 }).then(
        (info) => {
          if (!info) {
            OptionModel.insertMany(options, (err, _options) => {
              if (err)
                res.status(500).json({
                  success: false,
                  message: "Unable to create new question!",
                });
              else {
                let _rightAnswers = [];

                _options.map((_option) => {
                  if (_option.isAnswer) {
                    _rightAnswers.push(_option._id);
                  }
                });

                const newQuestion = QuestionModel({
                  body,
                  explanation,
                  quesImg,
                  subject,
                  difficulty,
                  ansCount,
                  weightAge,
                  options: _options,
                  rightAnswers: _rightAnswers,
                  createdBy: req.user._id,
                });

                newQuestion
                  .save()
                  .then(() => {
                    res.json({
                      success: true,
                      message: "New question created successfully!",
                    });
                  })
                  .catch(() => {
                    res.status(500).json({
                      success: false,
                      message: "Unable to create new question!",
                    });
                  });
              }
            });
          } else {
            res.json({
              success: false,
              message: "This question already exists!",
            });
          }
        }
      );
    }
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let get = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    const { _id } = req.params;

    QuestionModel.find({ _id: _id, status: 1 }, { status: 0 })
      .populate("questions", "body")
      .populate("subject", "topic")
      .populate("options")
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
              message: "No such question exists",
            });
          } else {
            res.json({
              success: true,
              message: "Success",
              data: question,
            });
          }
        }
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let getAll = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    const { subject } = req.body;

    if (subject.length !== 0) {
      QuestionModel.find({ subject: subject, status: 1 }, { status: 0 })
        .sort({ updatedAt: -1 })
        .populate("createdBy", ["name", "emailId"])
        .populate("subject", "topic")
        .populate("options")
        .exec(function (err, questions) {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Unable to fetch data",
            });
          } else {
            res.json({
              success: true,
              message: "Success",
              data: questions,
            });
          }
        });
    } else {
      QuestionModel.find({ status: 1 }, { status: 0 })
        .sort({ updatedAt: -1 })
        .populate("createdBy", ["name", "emailId"])
        .populate("subject", "topic")
        .populate("options")
        .exec(function (err, questions) {
          if (err) {
            console.log(err);
            res.status(500).json({
              success: false,
              message: "Unable to fetch data",
            });
          } else {
            res.json({
              success: true,
              message: "Success",
              data: questions,
            });
          }
        });
    }
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

    QuestionModel.findOneAndUpdate({ _id: _id }, { status: 0 })
      .then(() => {
        res.json({
          success: true,
          message: "Question has been deleted",
        });
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Unable to delete question",
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
};
