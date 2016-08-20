#!/bin/bash
set -e

if [[ $TRAVIS_BRANCH == ${PRODUCTION_BRANCH} ]]; then
  export STAGE="production"
else
  export STAGE="staging"
fi
export ENV_FILE=$STAGE".json"
echo 'Deploying latest code to stage: '$STAGE

echo "Getting latest env file from S3"
aws s3 cp s3://openaq-env-variables/fluffy/$ENV_FILE $ENV_FILE

echo "Deploying new tasks with Apex"
apex deploy --env-file $ENV_FILE -a $STAGE
