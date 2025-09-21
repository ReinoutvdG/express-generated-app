// src/middleware/session.middleware.js
const session = require('express-session');

const sessionMiddleware = session({
  secret: 'ditismijnsecret124532',        // verander dit voor productie
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
});

module.exports = sessionMiddleware;
