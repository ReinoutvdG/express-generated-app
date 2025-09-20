const logger = require("../util/logger");
const authService = require("../services/auth.service");

function showLogin(req, res) {
  res.render("auth/login", { error: null });
}

function login(req, res) {
  const { username, password } = req.body;
  logger.debug(`Login attempt: ${username}`);

  // authService.authenticate retourneert een Promise
  authService.authenticate(username, password)
    .then(staff => {
      if (!staff) {
        // verkeerde credentials
        return res.render("auth/login", { error: "Invalid username or password" });
      }

      // credentials oké – staff in sessie zetten
      req.session.staff = {
        id: staff.staff_id,
        username: staff.username,
        first_name: staff.first_name,
        last_name: staff.last_name
      };

      logger.debug(`Staff ${staff.username} logged in`);
      res.redirect("/"); // of een andere pagina
    })
    .catch(err => {
      logger.error("Login error: " + err.message);
      res.render("auth/login", { error: "Login failed" });
    });
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
