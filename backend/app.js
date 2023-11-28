const express = require("express");
const expressValidator = require("express-validator");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");

const createError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");

const passport = require("./services/passportconf");
const mongoose = require("./services/connection");
const login = require("./routes/login");

const user = require("./routes/user");

const trainer = require("./routes/trainer");
const subject = require("./routes/subject");
const question = require("./routes/question");
const test = require("./routes/test");

const trainee = require("./routes/trainee");

const up = require("./routes/fileUpload");
const stopRegistration = require("./routes/stopRegistration");
const results = require("./routes/results");
const dummy = require("./routes/dummy");

const app = express();

app.use(cors());
app.use(expressValidator());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin"
  );
  next();
});

app.use(
  "/api/v1/trainer",
  passport.authenticate("user-token", { session: false }),
  trainer
);
app.use(
  "/api/v1/subject",
  passport.authenticate("user-token", { session: false }),
  subject
);

app.use(
  "/api/v1/user",
  passport.authenticate("user-token", { session: false }),
  user
);
app.use(
  "/api/v1/question",
  passport.authenticate("user-token", { session: false }),
  question
);
app.use(
  "/api/v1/test",
  passport.authenticate("user-token", { session: false }),
  test
);
app.use(
  "/api/v1/upload",
  passport.authenticate("user-token", { session: false }),
  up
);
app.use(
  "/api/v1/trainer",
  passport.authenticate("user-token", { session: false }),
  stopRegistration
);
app.use("/api/v1/trainee", trainee);
app.use("/api/v1/final", results);
app.use("/api/v1/lala", dummy);

app.use("/api/v1/login", login);

app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname + "/public/index.html"))
);

//error handlings
app.use(function (_, __, next) {
  next(
    createError(
      404,
      "Invalid API. Use the official documentation to get the list of valid APIS."
    )
  );
});

app.use((err, _, res, __) => {
  res.status(err.status).json({
    success: false,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server Started. Server listening to port ${PORT}`);
});
