const SectionModel = require("../models/section");

const create = (req, res, _) => {
  const { sectionId } = req.body || null;

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
      const { name, subjectId, semesterId, trainerId, studentIds } =
        req.body || {};

      if (sectionId) {
        // Old section
        SectionModel.findOneAndUpdate(
          {
            _id: semesterId,
            status: 1,
          },
          {
            name,
            subjectId,
            semesterId,
            trainerId,
            studentIds,
          }
        ).then(() => {
          res
            .json({
              success: true,
              message: "Section is updated successfully",
            })
            .catch(() => {
              res.status(500).json({
                success: false,
                message: "Unable to update Section",
              });
            });
        });
      } else {
        // New Section
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

const getAll = (req, res, _) => {
  if (req.user.type === "ADMIN") {
    SectionModel.find({ status: 1 })
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
  if (req.user.type === "ADMIN") {
    const { sectionId } = req.body;

    SectionModel.findOneAndUpdate({ sectionId }, { status: 0 })
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
  remove,
};
