let UserModel = require("../models/user");
let tool = require("./tool");

let trainerRegister = (req, res, next) => {
  const _id = req.body._id || null;

  if (req.user.type === "ADMIN") {
    // Check for new user
    // ---pasword length
    // ---empty email
    if (_id === null) {
      req.check("password", "Invalid password").isLength({ min: 5, max: 10 });
      req.check("emailId", "Invalid email address").isEmail().notEmpty();
    }

    // Check for any (new or old) user
    // --empty name
    // --phone number lemgth
    req.check("name", `Invalid name`).notEmpty();
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
      const { name, emailId, contact, password } = req.body || {};

      //Old user
      if (_id !== null) {
        UserModel.findOneAndUpdate(
          {
            _id: _id,
            status: 1, // user is active
          },
          {
            name,
            contact,
          }
        )
          .then(() => {
            res.json({
              success: true,
              message: "Trainer's Profile updated successfully!",
            });
          })
          .catch(() => {
            res.status(500).json({
              success: false,
              message: "Unable to update Trainer's Profile",
            });
          });
      }
      //New user
      else {
        UserModel.findOne({ emailId: emailId, status: 1 }) // looking for active user with same emailId
          .then((user) => {
            if (!user) {
              tool
                .hashPassword(password)
                .then((hash) => {
                  const newUser = new UserModel({
                    name,
                    emailId,
                    contact,
                    password: hash,
                    createdBy: req.user._id,
                  });

                  newUser
                    .save()
                    .then(() => {
                      res.json({
                        success: true,
                        message: "Trainer's Profile created successfully!",
                      });
                    })
                    .catch(() => {
                      res.status(500).json({
                        success: false,
                        message: "Unable to create Trainer's Profile",
                      });
                    });
                })
                .catch(() => {
                  res.status(500).json({
                    success: false,
                    message: "Unable to create Trainer's Profile",
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
              message: "Unable to create Trainer's Profile",
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

let removeTrainer = (req, res, next) => {
  if (req.user.type === "ADMIN") {
    const { _id } = req.body;

    UserModel.findOneAndUpdate({ _id }, { status: 0 })
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

let getAllTrainers = (req, res, next) => {
  if (req.user.type === "ADMIN") {
    UserModel.find(
      { type: "TRAINER", status: 1 },
      { password: 0, type: 0, createdBy: 0, status: 0 }
    )
      .then((info) => {
        res.json({
          success: true,
          message: "Success",
          data: info,
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

let getSingleTrainer = (req, res, next) => {
  if (req.user.type === "ADMIN") {
    const { _id } = req.params;

    UserModel.find(
      { _id, status: 1 },
      { password: 0, type: 0, createdBy: 0, status: 0 }
    )
      .then((info) => {
        if (info.length === 0) {
          res.json({
            success: false,
            message: `This account doesn't exist!`,
          });
        } else {
          res.json({
            success: true,
            message: `Success`,
            data: info,
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

module.exports = {
  trainerRegister,
  getAllTrainers,
  getSingleTrainer,
  removeTrainer,
};
