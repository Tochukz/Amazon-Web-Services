const express = require('express');
const { SQSClient, ReceiveMessageCommand, SendMessageCommand, DeleteMessageCommand }  = require('@aws-sdk/client-sqs');
const router = express.Router();

const region = process.env.AWS_REGION;
const QueueUrl = process.env.QUEUE_URL;

/* GET users listing. */
router.get('/list-messages', async function(req, res, next) {
  try {
    const count = req.query.count
    const input  = {
      QueueUrl,
      MaxNumberOfMessages: count,
      VisibilityTimeout: 30,
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
});

router.delete('/queue/delete-message', async function(req, res, next) {
  try {
    const ReceiptHandle = req.body.receiptHandle;
    const input = {
      QueueUrl,
      ReceiptHandle,
    }
    const command = new DeleteMessageCommand(input);
    const client  = new SQSClient( region );
    const response = await client.send(command);
    return res.status(204).json({});
  } catch(err) {
    return next(err);
  }
});
module.exports = router;
