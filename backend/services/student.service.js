const StudentModel = require("../models/student");

const create = (req, res, _) => {
  const { _id } = req.body || null;

  if (req.user.type === "ADMIN") {
    req.check("emailId", "Invalid email address").isEmail().notEmpty();
    req.check("name", "Invalid name").notEmpty();
    req
      .check("contact", "Invalid contact number")
      .isLength({ min: 14, max: 14 })
      .isNumeric({ no_symbols: false });

    const errors = req.validationErrors();

    if (errors)
      res.json({
        success: false,
        message: "Invalid inputs",
        errors,
      });
    else {
      const { name, emailId, contact, studentId } = req.body || {};

      //Old student
      if (_id !== null) {
        StudentModel.findOneAndUpdate(
          {
            _id: _id,
            status: 1, // student is active
          },
          {
            name,
            contact,
            emailId,
            studentId,
          }
        )
          .then(() => {
            res.json({
              success: true,
              message: "Student's Profile updated successfully!",
            });
          })
          .catch(() => {
            res.status(500).json({
              success: false,
              message: "Unable to update Student's Profile",
            });
          });
      }
      //New student
      else {
        StudentModel.findOne({ emailId: emailId, status: 1 }) // looking for active student with same emailId
          .then((user) => {
            if (!user) {
              const newUser = new StudentModel({
                name,
                emailId,
                contact,
                studentId,
              });

              newUser
                .save()
                .then(() => {
                  res.json({
                    success: true,
                    message: "Student's Profile created successfully!",
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    success: false,
                    message: "Unable to create Student's Profile",
                  });
                });
            } else {
              res.json({
                success: false,
                message: "This email id already exists!",
              });
            }
          })
          .catch(() => {
            res.status(500).json({
              success: false,
              message: "Unable to create Student's Profile",
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
    const { studentId } = req.params;

    StudentModel.find({ _id: studentId, status: 1 })
      .then((student) => {
        if (info.length === 0) {
          res.json({
            success: false,
            message: "This account doesn't exist!",
          });
        } else {
          res.json({
            success: true,
            message: "Success",
            data: student,
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

const getAll = (req, res, next) => {
  if (req.user.type === "ADMIN") {
    StudentModel.find({ status: 1 })
      .then((students) => {
        res.json({
          success: true,
          message: "Success",
          data: students,
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
    const { _id } = req.body;

    StudentModel.findOneAndUpdate({ _id }, { status: 0 })
      .then(() => {
        res.json({
          success: true,
          message: "Account has been removed",
        });
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Unable to remove account",
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
