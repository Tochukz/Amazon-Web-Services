#!/bin/bash
# Filename: copy-assets.sh
# Description: Copies the frontend assets to the relevant S3 origin server for a cloudfront distribution

env=$1

if test -z "$env"
then
  echo "Please supply a deployment environment e.g ./copy-assets.sh dev"
  exit
fi 

case $env in 
  dev)        
    ;;
  staging)    
    ;;
  prod)    
    ;;
  *)
    echo -n "Unsupported environment! The only supported values are dev, staging and prod"
    exit
    ;;
esac

cd ../../sample-app
npm run build 
aws s3 sync build/ s3://tochukwu-$env-site-bucket