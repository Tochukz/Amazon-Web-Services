const express = require('express');
const { SQSClient, ReceiveMessageCommand, SendMessageCommand, }  = require('@aws-sdk/client-sqs');
const router = express.Router();

/* GET users listing. */
router.get('/list-messages', async function(req, res, next) {
  try {
    const count = req.query.count
    const region = process.env.AWS_REGION;
    const QueueUrl = process.env.QUEUE_URL
    const input  = {
      QueueUrl,
      MaxNumberOfMessages: count,
      VisibilityTimeout: 15,
    }
    const command = new ReceiveMessageCommand(input)
    const client  = new SQSClient( region );
    const response = await client.send(command);
    const messages = response?.Messages || [];
    const status= response?.$metadata.httpStatusCode || 400;
    return res.status(status).json(messages);
  } catch(err) {
    return next(err);
  }
});

router.post('/queue-message', async function(req, res, next) {
  try {
    const {message, salary, messageId } = req.body;
    const region = process.env.AWS_REGION;
    const QueueUrl = process.env.QUEUE_URL    
    const input = {
      QueueUrl,
      MessageBody: message,
      MessageAttributes: {
        Salary: {
          DataType: 'String',
          StringValue: salary.toString(),
        }
      }
    };
    if (QueueUrl.includes('fifo')) {
      input.MessageGroupId = 'MSG' + messageId;
      input.MessageDeduplicationId = 'DD' + messageId;
    }
    console.log('input', input);
    const command = new SendMessageCommand(input);
    const client  = new SQSClient( region );
    const response = await client.send(command);
    return res.status(201).json(response);
  } catch(err) {
    return next(err);
  }
})
module.exports = router;
