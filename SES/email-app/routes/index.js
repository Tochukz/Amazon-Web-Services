const express = require('express');
const router = express.Router();
const { makeTemplate } = require('../helpers/email-helper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test-template', function(req, res, next) {
  return res.send(makeTemplate('Here comes Tochukwu, the Cloud Architech!'))
});


module.exports = router;
