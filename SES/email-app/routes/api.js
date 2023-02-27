const express = require('express');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const router = express.Router();
const { makeTemplate } = require('../helpers/email-helper');

/** Send email via SES API */
router.post('/send-mail', async function(req, res, next) {
  try {
    const message = req.body.message;
    const region = process.env.AWS_REGION;
    const source = process.env.SOURCE_EMAIL
    const client = new SESClient({ region });
    const input = {
      Source: source,
      Destination: {
        ToAddresses: [ 'bbdchucks@gmail.com' ], // Must be verified email if using sandbox environmment
        CcAddresses: [],
      },
      Message: {
        Subject: {
          Data: 'Test Email For SES API'
        },
        Body: {
          Text: {
            Data: message,
          },
          Html: {
            Data: makeTemplate(message),
          }
        }
      },
      ReplyToAddresses: ['info@ojlinks.tochukwu.xyz']
    };
    const command = new SendEmailCommand(input);
    const response = await client.send(command);
    return res.status(201).json(response);
  } catch(error) {
    console.log('error', error);
    return next(error);
  }
});

module.exports = router;
