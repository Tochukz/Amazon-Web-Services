# SPA frontend cloud infrastructure

## Setup

**Install AWS CLI**  
To install AWS CLI checkout [Installing or updating the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

**Rain CLI tool**
Rain is a command line tool for working with AWS CloudFormation templates and stacks.  
[Rain Github](https://github.com/aws-cloudformation/rain)  
[Rain Docs](https://aws-cloudformation.github.io/rain/)

**Install rain CLI**  
Install _rain_ using home brew

```
$ brew install rain
$ rain --help
```

## Request and ACM certificate

Request an SSL ceritificate from AWS Ceritifcate Manager.
The Certificate ARN must be used as the values of the _CertificateArn_ of the _params_ file of the relevant environment.  
For example the _CertificateArn_ of the _dev-params.yaml_ file must have a value of the development alternate domain.

## Deployment

**Deploy to development environment**

```
$ rain deploy SPATemplate.yaml SPAFrontendDevStack --config params/dev-params.yaml
```

**Deploy to staging environment**

```
$ rain deploy SPATemplate.yaml SPAFrontendStagingStack --config params/staging-params.yaml
```

**Deploy to production environment**

```
$ rain deploy SPATemplate.yaml SPAFrontendProdStack --config params/prod-params.yaml
```

## Updates

To update the stack, you make changes to the code and deploy to the relevant environment using the corresponding stack name and params.

## Manual deploy

To manually deploy the built frontend assets to the origin bucket, run the _copy-assets_ script as follows

```
$ cd scripts
$ ./copy-assets.sh dev
```

This will build the frontend assets and copy it over to the development S3 bucket.
To copy to the production environment, repelace the dev parameter with _prod_.  
**NB:** For the _copy-assets_ script to work properly, you frontend repo must site beside this repo.
