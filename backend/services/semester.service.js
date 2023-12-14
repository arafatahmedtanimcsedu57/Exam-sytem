const SemesterModel = require("../models/semester");

const create = (req, res, _) => {
  const { _id } = req.body || {};

  if (req.user.type === "ADMIN") {
    req.check("name", "Invalid name").isLength({ min: 1 });
    req.check("year", "Invalid year").isLength({ min: 4, max: 4 }).isNumeric();

    const errors = req.validationErrors();

    if (errors) {
      res.json({
        success: false,
        message: "Invalid inputs",
        errors,
      });
    } else {
      const { name, year } = req.body || {};

      if (!_id) {
        SemesterModel.findOne({ name, year })
          .then((semester) => {
            if (semester) {
              res.json({
                success: false,
                message: "This semester already exists!",
              });
            } else {
              const newSemester = new SemesterModel({
                name,
                year,
              });

              newSemester
                .save()
                .then(() => {
                  res.json({
                    success: true,
                    message: "Semester created successfully!",
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    success: false,
                    message: "Unable to create Semester",
                  });
                });
            }
          })
          .catch(() => {
            res.status(500).json({
              success: false,
              message: "Server Error",
            });
          });
      } else {
        SemesterModel.findOneAndUpdate({ _id }, { name, year })
          .then(() => {
            res.json({
              success: true,
              message: "Semester is updated",
            });
          })
          .catch(() => {
            res.status(500).json({
              success: false,
              message: "Unable to change semester",
            });
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

const get = (req, res, _) => {
  if (req.user.type === "ADMIN") {
    const { semesterId } = req.params;

    SemesterModel.find({ _id: semesterId, status: 1 })
      .then((semester) => {
        if (semester.length === 0) {
          res.json({
            success: false,
            message: "This semester doesn't exist!",
          });
        } else {
          res.json({
            success: true,
            message: "Success",
            data: semester,
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const getAll = (req, res, _) => {
  if (req.user.type === "ADMIN") {
    SemesterModel.find({ status: 1 })
      .then((semesters) => {
        res.json({
          success: true,
          message: "Success",
          data: semesters,
        });
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Unable to fetch data",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

const remove = (req, res, _) => {
  if (req.user.type === "ADMIN") {
    const { semesterId } = req.body;

    SemesterModel.findOneAndUpdate({ _id: semesterId }, { status: 0 })
      .then(() => {
        res.json({
          success: true,
          message: "Semester has been removed",
        });
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Unable to remove Semester",
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
  getAll,
  get,
  remove,
};
