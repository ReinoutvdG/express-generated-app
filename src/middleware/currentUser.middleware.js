// src/middleware/currentUser.middleware.js
function currentUserMiddleware(req, res, next) {
  // hier kijken we of er een user/staff in de sessie zit
  res.locals.currentUser = req.session.user || req.session.staff || null;
  next();
}

module.exports = currentUserMiddleware;
