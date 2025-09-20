function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next(); // gebruiker is ingelogd → ga door
    }
    res.redirect('/login'); // niet ingelogd → stuur naar login
}

module.exports = ensureAuthenticated;
