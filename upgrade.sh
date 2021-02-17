#!/bin/bash

./gradlew clean
npm --prefix frontend install
rm -rf frontend/build
npm run --prefix frontend build
cp -r frontend/build backend/src/main/resources/static
git pull
./gradlew build
docker-compose build --pull
docker-compose up -d
