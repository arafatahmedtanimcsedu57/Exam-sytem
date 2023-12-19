const QuestionModel = require("../models/question");
const OptionModel = require("../models/option");
const TagModel = require("../models/tag");

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
        tags,
      } = req.body;

      QuestionModel.findOne({ body: body, status: 1 }, { status: 0 })
        .then((info) => {
          if (!info) {
            // New question

            let tagIds = [];
            let optionIds = [];
            let ansCount = 0;

            OptionModel.insertMany(options, async (err, _options) => {
              if (err)
                res.status(500).json({
                  success: false,
                  message: "Unable to create new question!",
                });
              else {
                //Calculating correct-ans number
                options.map((option) => {
                  if (option.isAnswer) {
                    ansCount = ansCount + 1;
                  }
                });

                //options ids
                optionIds = _options.map((option) => option._id);

                //tags ids
                await Promise.all(
                  tags.map(async (tag) => {
                    //check if the tags already exists
                    let existingTag = await TagModel.findOne({
                      value: tag.trim().toLowerCase().replace(/ +/g, "_"),
                    });

                    //If the tag doesn't exits, create a new one
                    if (!existingTag) {
                      const newTag = new TagModel({
                        label: tag,
                        value: tag.trim().toLowerCase().replace(/ +/g, "_"),
                      });
                      existingTag = await newTag.save();
                    }

                    tagIds.push(existingTag._id);
                  })
                );

                // new question
                const newQuestion = QuestionModel({
                  body,
                  explanation,
                  quesImg,
                  subject,
                  difficulty,
                  ansCount,
                  weightAge,
                  options: optionIds,
                  tags: tagIds,
                  createdBy: req.user._id,
                });

                newQuestion
                  .save()
                  .then(() => {
                    res.json({
                      success: true,
                      message: "New question is created successfully!",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
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
              message: "This question already exist",
            });
          }
        })
        .catch(() => {
          res.status(500).json({
            success: false,
            message: "Unable to create new question!",
          });
        });
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

let getAll = (req, res, _) => {
  let query = {
    status: 1,
  };

  // Check if the request has a subjects parameter
  if (req.query.subjects) {
    const subjectsArray = Array.isArray(req.query.subjects)
      ? req.query.subjects
      : [req.query.subjects];
    query["subject"] = { $in: subjectsArray };
  }

  // Check if the request has a tags parameter
  if (req.query.tags) {
    const tagsArray = Array.isArray(req.query.tags)
      ? req.query.tags
      : [req.query.tags];
    query["tags"] = { $in: tagsArray };
  }

  if (req.user.type === "TRAINER") {
    //   const { subject } = req.query;

    //   if (subject.length !== 0) {
    QuestionModel.find({ ...query }, { status: 0 })
      .sort({ updatedAt: -1 })
      .populate("createdBy", ["name", "emailId"])
      .populate("subject", "topic")
      .populate("options")
      .populate("tags")
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
    //   } else {
    //     QuestionModel.find({ status: 1 }, { status: 0 })
    //       .sort({ updatedAt: -1 })
    //       .populate("createdBy", ["name", "emailId"])
    //       .populate("subject", "topic")
    //       .populate("options")
    //       .populate("tags")
    //       .exec(function (err, questions) {
    //         if (err) {
    //           console.log(err);
    //           res.status(500).json({
    //             success: false,
    //             message: "Unable to fetch data",
    //           });
    //         } else {
    //           res.json({
    //             success: true,
    //             message: "Success",
    //             data: questions,
    //           });
    //         }
    //       });
    //   }
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let remove = (req, res, next) => {
  if (req.user.type === "TRAINER") {
    const { questionId } = req.body;

    QuestionModel.findOneAndUpdate({ _id: questionId }, { status: 0 })
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
