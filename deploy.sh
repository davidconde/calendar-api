sam package --output-template-file packaged.yaml --s3-bucket calendar-api-deployment
sam deploy --template-file packaged.yaml --stack-name calendar-api --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name calendar-api --output table