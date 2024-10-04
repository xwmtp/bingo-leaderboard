FROM node:18-alpine as frontend
COPY frontend .
RUN npm i --legacy-peer-deps && npm run build

FROM eclipse-temurin:21-alpine as backend
COPY backend .
COPY gradle gradle/
COPY gradlew .
COPY --from=frontend build src/main/resources/static
RUN ./gradlew build -x test

FROM eclipse-temurin:21-jre-alpine

COPY --from=backend build/libs/bingo-leaderboard.jar /usr/bin

RUN mkdir /etc/bingo-leaderboard
VOLUME ["/etc/bingo-leaderboard"]
WORKDIR /etc/bingo-leaderboard

CMD ["java", "-jar", "/usr/bin/bingo-leaderboard.jar"]
