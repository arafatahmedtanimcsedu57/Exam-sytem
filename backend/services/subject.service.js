//view all subjects and single subject
let SubjectModel = require("../models/subject");

let create = (req, res, next) => {
  var { _id } = req.body || null;

  //Only admin can create a new subject
  if (req.user.type === "ADMIN") {
    // Check for subject name
    // -- Empty string
    req.check("topic", "Invalid subject name").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      res.json({
        success: false,
        message: "Invalid inputs",
        errors,
      });
    } else {
      const { topic } = req.body;

      // Update subject
      if (_id !== null) {
        SubjectModel.findOneAndUpdate({ _id }, { topic })
          .then(() => {
            res.json({
              success: true,
              message: "Subject name has been changed",
            });
          })
          .catch(() => {
            res.status(500).json({
              success: false,
              message: "Unable to change subject name",
            });
          });
      } else {
        //   Check for already exist or not
        SubjectModel.findOne({ topic: topic }).then((info) => {
          //   Really a new one
          if (!info) {
            var newSubject = SubjectModel({
              topic,
              createdBy: req.user._id,
            });
            newSubject
              .save()
              .then(() => {
                res.json({
                  success: true,
                  message: `New subject created successfully!`,
                });
              })
              .catch(() => {
                res.status(500).json({
                  success: false,
                  message: "Unable to create new subject!",
                });
              });
          } else {
            res.json({
              success: false,
              message: "This subject already exists!",
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
  const { _id } = req.params;

  SubjectModel.find({ _id }, { createdAt: 0, updatedAt: 0, status: 0 })
    .populate("createdBy", "name")
    .exec(function (err, subject) {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      } else {
        res.json({
          success: true,
          message: "Success",
          data: subject,
        });
      }
    });
};

let getAll = (req, res, next) => {
  SubjectModel.find({ status: 1 }, { createdAt: 0, updatedAt: 0 })
    .populate("createdBy", "name")

    .exec(function (err, subjects) {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      } else {
        res.json({
          success: true,
          message: "Success",
          data: subjects,
        });
      }
    });
};

module.exports = {
  create,
  getAll,
  get,
};
