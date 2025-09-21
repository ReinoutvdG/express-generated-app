const express = require("express");
const createError = require('http-errors');
const path = require("path");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");

// importeer middleware
const sessionMiddleware = require("./src/middleware/session.middleware");
const currentUserMiddleware = require("./src/middleware/currentUser.middleware");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

// sessie-middleware en currentUser-middleware activeren
app.use(sessionMiddleware);
app.use(currentUserMiddleware);

//routers
const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const movieRouter = require("./src/routes/movie.routes");
const authRouter = require("./src/routes/auth.routes");
const aboutRouter = require('./src/routes/about.routes');

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/movies", movieRouter);
app.use("/", authRouter);
app.use('/', aboutRouter);

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
