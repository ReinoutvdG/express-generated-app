const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const model = { title: 'Javascript app' };
  const view = "index";
  res.render(view, model);
});

module.exports = router;
