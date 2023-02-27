const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
const { makeTemplate } = require('../helpers/email-helper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test-template', function(req, res, next) {
  return res.send(makeTemplate('Here comes Tochukwu, the Cloud Architech!'))
});

/** Send email via SES SMTP interface */
router.post('/send-mail', async function(req, res, next) {
  try {
    const {SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SOURCE_EMAIL} = process.env;
    const message = req.body.message;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_USERNAME, 
        pass: SMTP_PASSWORD, 
      },
    });

    const  info = await transporter.sendMail({
      from: SOURCE_EMAIL,
      to: "bbdchucks@gmail.com, t.nwachukwu@outlook.com", 
      subject: "Test Email for SES SMTP", 
      text: message,
      html: makeTemplate(message), 
    });
    return res.status(201).json(info);
  } catch(error) {
    console.log('error', error);
    return next(error);
  }
});

module.exports = router;
