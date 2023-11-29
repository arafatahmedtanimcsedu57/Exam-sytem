let getdomain = async (req, res, next) => {
  var testId = "1234";
  var userId = "7899";
  res.json({
    url: `${
      req.protocol + "://" + req.get("host")
    }/trainee/taketest?testId=${testId}&traineeId=${userId}`,
  });
};
module.exports = { getdomain };
