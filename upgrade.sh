#!/bin/bash

./gradlew clean
npm --prefix frontend install
rm -rf frontend/build
npm --prefix frontend build
cp frontend/build backend/src/main/resources/public
git pull
./gradlew build
docker-compose build --pull
docker-compose up -d
