const TagModel = require("../models/tag");

const create = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    req.check("value", "Invalid tag!").notEmpty();
    req.check("label", "Enter tag!").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      res.json({
        success: false,
        message: "Invalid tag",
        errors,
      });
    } else {
      const { label, value, status } = req.body;

      TagModel.findOne({ value, status: 1 })
        .then((tag) => {
          if (!tag) {
            const newTag = TagModel({
              label,
              value,
              status,
            });

            newTag
              .save()
              .then(() => {
                res.json({
                  success: true,
                  message: "New tag is created successfully!",
                });
              })
              .catch(() => {
                res.status(500).json({
                  success: false,
                  message: "Unable to create new tag!",
                });
              });
          } else {
            res.json({
              success: false,
              message: "This tag already exists!",
            });
          }
        })
        .catch(() => {
          res.status(500).json({
            success: false,
            message: "Unable to create new tag!",
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

const getAll = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    TagModel.find({ status: 1 }, { status: 0 })
      .sort({ updatedAt: -1 })
      //   .populate("label")
      //   .populate("value")
      .exec(function (err, tags) {
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
            data: tags,
          });
        }
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
  getAll,
};
