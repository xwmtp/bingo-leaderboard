#!/bin/bash

git pull
./gradlew clean
npm --prefix frontend install
rm -rf frontend/build
npm run --prefix frontend build
rm -rf backend/src/main/resources/static
cp -r frontend/build backend/src/main/resources/static
./gradlew build
sudo docker-compose build --pull
sudo docker-compose up -d
