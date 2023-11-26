let userdetails = (req, res, next) => {
  res.json({
    success: true,
    message: "successfull",
    user: {
      name: req.user.name,
      type: req.user.type,
      _id: req.user._id,
      emailId: req.user.emailId,
      contact: req.user.contact,
    },
  });
};

module.exports = { userdetails };
