#!/bin/bash
set -e

docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

echo "Pushing image: flasher/fluffy:$TRAVIS_COMMIT"
docker tag openaq_fluffy flasher/fluffy:$TRAVIS_COMMIT
docker push flasher/fluffy:$TRAVIS_COMMIT

# Only push to latest if this is production branch
if [[ $TRAVIS_BRANCH == ${PRODUCTION_BRANCH} ]]; then
  echo "Also pushing as :latest"
  docker tag openaq_fluffy flasher/fluffy:latest
  docker push flasher/fluffy:latest

  # And set some vars for the update_task script
  export ENV_FILE="production.env"
  export TASK_NAME="fluffy"
fi

echo "Installing aws cli"
sudo pip install awscli

echo "Running the update_task script"
sh .build_scripts/update-task.sh
