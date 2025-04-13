FROM eclipse-temurin:21-alpine as backend
COPY backend .
COPY gradle gradle/
COPY gradlew .
RUN ./gradlew build -x test

FROM eclipse-temurin:21-jre-alpine

COPY --from=backend build/libs/bingo-leaderboard.jar /usr/bin

RUN mkdir /etc/bingo-leaderboard
VOLUME ["/etc/bingo-leaderboard"]
WORKDIR /etc/bingo-leaderboard

CMD ["java", "-jar", "/usr/bin/bingo-leaderboard.jar"]
