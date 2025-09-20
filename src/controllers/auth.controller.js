const logger = require("../util/logger");
const authService = require("../services/auth.service");

function showLogin(req, res) {
  res.render("auth/login", { error: null });
}

function login(req, res) {
  const { username, password } = req.body;
  logger.debug(`Login attempt: ${username}`);
  // TODO: checken met auth.service of DAO
  res.send("Login handler (nog niet af)");
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

function register(req, res, next) {
  const { username, password, first_name, last_name } = req.body;
  logger.debug(`Register attempt: ${username}`);

  const staff = { username, password, first_name, last_name };

  authService.registerStaff(staff, (err, staffId) => {
    if (err) {
      logger.error("Register error: " + err.message);
      return res.render("auth/register", { error: "Registration failed" });
    }

    logger.debug(`Staff registered with id=${staffId}`);
    res.redirect("/login");
  });
}

module.exports = {
  showLogin,
  login,
  logout,
  register
};
