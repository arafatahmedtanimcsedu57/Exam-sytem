let TestModel = require("../models/testpaper");
const appRoot = require("app-root-path");
let FeedbackModel = require("../models/feedback");

let updateStatus = (req, res, _) => {
  if (req.user.type === "TRAINER") {
    const { id, status } = req.body;

    TestModel.findById(id, {
      testBegins: 1,
      testConducted: 1,
    })
      .then((test) => {
        if (test) {
          if (test.testBegins !== true && test.testConducted !== true) {
            TestModel.findOneAndUpdate(
              { _id: id },
              { isRegistrationAvailable: status }
            ).exec(function (err) {
              if (err) {
                res.status(500).json({
                  success: false,
                  message: "Unable to change registration status",
                });
              } else {
                res.json({
                  success: true,
                  message: "Registration status changed!",
                  currentStatus: status,
                });
              }
            });
          } else {
            res.json({
              success: false,
              message: "Unable to change registration status",
            });
          }
        } else {
          res.status(500).json({
            success: false,
            message: "Unable to change registration status",
          });
        }
      })
      .catch((_) => {
        res.status(500).json({
          success: false,
          message: "Unable to change registration status",
        });
      });
  } else {
    res.status(403).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};
/*
let Download = (req,res,next)=>{
    var testId = req.body.id;
    if(req.user.type === 'TRAINER'){
        const file = `${appRoot}/public/result/result-${testId}.xlsx`;
        res.download(file);
    }else{
       res.status(401).json({
           success : false,
           message : "Permissions not granted!"
       })
    }

}
*/
let Download = (req, res, next) => {
  var testId = req.body.id;
  if (req.user.type === "TRAINER") {
    const file = `${
      req.protocol + "://" + req.get("host")
    }/result/result-${testId}.xlsx`;
    res.json({
      success: true,
      message: "File sent successfully",
      file: file,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

let getFeedBack = (req, res, next) => {
  var testId = req.body.testId;
  if (req.user.type === "TRAINER") {
    FeedbackModel.find({ testId: testId })
      .populate("userId")
      .exec((err, data) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Server Error",
          });
        } else {
          res.json({
            success: true,
            message: "Feedbacks Sent Successfully",
            data: data,
          });
        }
      });
  } else {
    res.status(401).json({
      success: false,
      message: "Permissions not granted!",
    });
  }
};

module.exports = { updateStatus, Download, getFeedBack };
