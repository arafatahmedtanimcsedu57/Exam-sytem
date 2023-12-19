const SectionModel = require("../models/section");
const StudentModel = require("../models/student");

const create = async (req, res, _) => {
  const { _id } = req.body || null;

  if (req.user.type === "ADMIN") {
    req.check("name", "Invalid name").notEmpty();
    const errors = req.validationErrors();

    if (errors)
      res.json({
        success: false,
        message: "Invalid inputs",
        errors,
      });
    else {
      const { name, subjectId, semesterId, trainerId, students } =
        req.body || {};

      const studentIds = [];

      if (_id) {
        // Old section

        SectionModel.findOne({ semesterId, subjectId, name })
          .then(async (section) => {
            if (section) {
              res.json({
                success: false,
                message: "Section aleady exists",
              });
            } else {
              await Promise.all(
                students.map(async (student) => {
                  // Check if the student already exists
                  let existingStudent = await StudentModel.findOne({
                    emailId: student.emailId,
                  });

                  // If the student doesn't exist, create a new one
                  if (!existingStudent) {
                    const newStudent = new StudentModel({
                      name: student.name,
                      contact: student.contact,
                      emailId: student.emailId,
                      studentId: student.studentId,
                    });
                    existingStudent = await newStudent.save();
                  }

                  // Add the student ID to the array
                  studentIds.push(existingStudent._id);
                })
              );

              SectionModel.findOneAndUpdate(
                {
                  _id,
                  status: 1,
                },
                {
                  name,
                  subjectId,
                  semesterId,
                  trainerId,
                  studentIds,
                }
              )
                .then(() => {
                  res.json({
                    success: true,
                    message: "Section is updated successfully",
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    success: false,
                    message: "Unable to update Section",
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
        // New Section

        SectionModel.findOne({ semesterId, subjectId, name })
          .then(async (section) => {
            if (section) {
              res.json({
                success: false,
                message: "Section aleady exists",
              });
            } else {
              await Promise.all(
                students.map(async (student) => {
                  // Check if the student already exists
                  let existingStudent = await StudentModel.findOne({
                    emailId: student.emailId,
                  });

                  // If the student doesn't exist, create a new one
                  if (!existingStudent) {
                    const newStudent = new StudentModel({
                      name: student.name,
                      contact: student.contact,
                      emailId: student.emailId,
                      studentId: student.studentId,
                    });
                    existingStudent = await newStudent.save();
                  }

                  // Add the student ID to the array
                  studentIds.push(existingStudent._id);
                })
              );

              const newSction = new SectionModel({
                name,
                subjectId,
                semesterId,
                trainerId,
                studentIds,
              });

              newSction
                .save()
                .then(() => {
                  res.json({
                    success: true,
                    message: "Section is created successfully",
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    success: false,
                    message: "Unable to create new Section",
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
    const { sectionId } = req.params;

    SectionModel.find({ _id: sectionId })
      .then((section) => {
        if (section.length === 0) {
          res.json({
            success: false,
            message: "This semester doesn't exist!",
          });
        } else {
          res.json({
            success: true,
            message: "Success",
            data: section,
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

const getTrainerSection = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const { trainerId } = req.params;

    SectionModel.find({ trainerId: trainerId })
      .populate("studentIds")
      .populate("semesterId")
      .populate("subjectId")
      .then((section) => {
        if (section.length === 0) {
          res.json({
            success: false,
            message: "This semester doesn't exist!",
          });
        } else {
          res.json({
            success: true,
            message: "Success",
            data: section,
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

const getTrainerSubject = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const { trainerId } = req.params;

    SectionModel.find(
      { trainerId: trainerId },
      { studentIds: 0, semesterId: 0 }
    )
      .populate("semesterId")
      .populate("subjectId")
      .then((section) => {
        if (section.length === 0) {
          res.json({
            success: false,
            message: "This semester doesn't exist!",
          });
        } else {
          res.json({
            success: true,
            message: "Success",
            data: section,
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
    SectionModel.find({ status: 1 })
      .populate("studentIds", ["name", "emailId", "contact", "studentId"])
      .populate("subjectId", "topic")
      .populate("trainerId", ["name", "emailId", "contact"])
      .populate("semesterId", ["name", "year"])

      .then((sections) => {
        res.json({
          success: true,
          message: "Success",
          data: sections,
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
  console.log("I am here");
  if (req.user.type === "ADMIN") {
    const { sectionId } = req.body;

    SectionModel.findOne({ _id: sectionId, status: 0 }).then((p) => {
      console.log(p);
    });

    SectionModel.findOneAndUpdate({ _id: sectionId }, { status: 0 })
      .then(() => {
        res.json({
          success: true,
          message: "Section has been removed",
        });
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "Unable to remove Section",
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
  getTrainerSection,
  getTrainerSubject,

  remove,
};
