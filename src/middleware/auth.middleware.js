function ensureAuthenticated(req, res, next) {
  // check of er staff óf user is opgeslagen
  if (req.session && (req.session.user || req.session.staff)) {
    return next();
  }
  res.redirect('/login');
}

module.exports = ensureAuthenticated;
