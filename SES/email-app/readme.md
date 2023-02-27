# Email App 

__Description__  
Email App is a simple implementation of mailing functionality supported by Amazon Simple Email Server (SES).  

The App features two API endpoint that send messages as email using Simple Email Service (SES).  
The email sending is implemented using a different methods for each endpoint.   
1. Using the SES API via AWS SDK. See _routes/api.js_.    
   This method requires an AWS credential - AccesskeyId and SecretAccessKey. The credential is automatically read from the environment variables or from shared credential file `~/.aws/credentials)`.  
2. Using the SMTP interface. See _routes/index.js_.  
   This method uses SMTP username and password which can be generated from the SES console. 

__Testing__  
To test the feature, you send an HTTP post request from an HTTP client such as Postman.  


Endpoint       | Implemetation | Body 
---------------|---------------|-------------
/api/send-mail | SES API       | {"message": "Hello mailer"}
/send-mail     | SES SMTP      | {"message": "Hello mailer"}