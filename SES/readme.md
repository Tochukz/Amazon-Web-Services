# Amazon Simple Email Service  
[Docs](https://docs.aws.amazon.com/ses)    
[Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/Welcome.html)   
[API Reference V2](https://docs.aws.amazon.com/ses/latest/APIReference-V2/Welcome.html)   
[SES CLI](https://docs.aws.amazon.com/ses/latest/APIReference-V2/Welcome.htmls)    
[SDK Reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ses/index.html)

## Related Services  
If your application runs in Amazon Elastic Compute Cloud (Amazon EC2), you can use Amazon SES to send 62,000 emails every month at no additional charge.   

## Setting up Simple Email Service
### Creating and verifying identities in Amazon SES    
In Amazon SES, you can create an identity at the domain level or you can create an email address identity.
In most cases, creating a domain identity eliminates the need for creating and verifying individual email address identities, unless you want to apply custom configurations to a specific email address.
To send email from the same domain or email address in more than one AWS Region, you must create and verify a separate identity for each Region.   
Domain names are case-insensitive. Email addresses are case sensitive.  

__Creating a domain identity__    
1. __Verify domain identity__

You can verify you domain using the _VerifyDomainDkim_ operation.
```bash
$ aws ses verify-domain-dkim --domain k-medics.site
```  
When you execute the _VerifyDomainDkim_ operation, it returns a set of three DKIM tokens for a domain identity. Use the generated tokens to
create the CNAME records for DKIM authentication. The _host_ and _value_ for the DNS records are obtained by prepending the token to `_domainkey.[example.com]` and `.dkim.amazonses.com` respectively as shown below. Remember to replace _example.com_ by your actual domain name.

Param | Value
------|------
Host  |[token]._domainkey.[example.com]
Type  | CNAME
Value | [token].dkim.amazonses.com

Alternately, you can use _VerifyDomainIdentity_ operation.
```
$ aws ses verify-domain-identity --domain k-medics.site
```  
This generate a single _VerificationToken_ which you must use to add a TXT record to your DNS settings. The _Host_ and exact _Value_ to use is unclear.

2. __Enable DKIM signing if using VerifyDomainIdentity__  

If Easy DKIM signing is enabled for a domain, then Amazon SES uses DKIM to sign all email that it sends from addresses on that domain.

If you use the _VerifyDomainDkim_ operation, then DKIM signing will be enabled.  But if you use the _VerifyDomainIdentity_, you may need to enable DKIM as a different operation if needed.  
To enable DKIM signing.
```
$ aws ses set-identity-dkim-enabled --identity k-medics.site --dkim-enabled
```

3. __Enable custom mail-from__  

To set custom mail-from domain  
```
$ aws ses set-identity-mail-from-domain --identity k-medics.site --mail-from-domain mail.k-medics.site
```  
__NB:__ The _MailFromDomain_ must satisfy the following requirements:
1. It must be a subdomain of the Identity or parent domain that has been verified
2. It shouldn't be a subdomain that you also use to send email from.  
3. It shouldn't be a subdomain that you use to receive email.

After the SetIdentityMailFromDomain command, go to the SES management console. Then under configuration menu, click on _Verified Identity_ . Select your domain identity and go down to the _Custom MAIL FROM domainInfo_ section.  
Copy the _MX_ and _TXT_ record and add them to your DNS settings.  

__NB:__ The value for the _MX_ record may have an integer and a string separated by a space. Use the integer for the _Priority_ and the string as the actual value for the DNS record.

__Creating an email identity__    
If a domain identity has been configured, an email identity may not be needed if the email falls under the domain, except to override the domain configuration or for advances configurations settings.   
1. __Verify email identity__  

To verify an email address, execute the verify-email-identity command
```
$ aws ses verify-email-identity --email-address dev@tochukwu.xyz
```  
After verify-email-identity is called, the email address will receive a verification email. You click on the link in the email to complete the verification process.   

2. __Enable custom mail-from__  

To set custom mail-from domain  
```
$ aws ses set-identity-mail-from-domain --identity dev@tochukwu.xyz --mail-from-domain mailer.tochukwu.xyz
```  
The rules for the _MailFromDomain_ remains the same as stated for the domain identity. Similarly, the _MX_ must be treated the same way.


## Sending email through SES
### Send email using the SMTP interface
__Requirements__  
1. SMTP endpoint address
2. SMTP interface port number
3. SMTP username and password. (SMTP credentials are unique to each AWS Region)
4. Application that support Transport Layer Security (TLS).
5. An SES verified email address
6. Increased sending quotas, if you want to send large quantities of email.  

__NB:__ If your account is still in the Amazon SES sandbox, you may only send to verified addresses or domains, or to email addresses associated with the Amazon SES Mailbox Simulator.

__Create SMTP credential__  
1. Open up SES console.
2. Go to _SMTP setting_ and click on _Create SMTP credentials_ button on top left corner. This opens up the IAM console.
3. Enter an IAM user name and click the _Create_ button.
4. Click _Download Credential_ button.  
5. Click _Close_ button.   

[SMTP Service endpoints](https://docs.aws.amazon.com/general/latest/gr/ses.html)  
### send email using the API
