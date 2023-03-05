cd sample-app
npm run build 
aws s3 sync build/ s3://plus1-website-bucket