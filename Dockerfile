FROM adoptopenjdk/openjdk15:alpine

COPY backend/build/libs/bingo-leaderboard.jar /usr/bin

RUN mkdir /etc/bingo-leaderboard
VOLUME ["/etc/bingo-leaderboard"]
WORKDIR /etc/bingo-leaderboard

CMD ["java", "-jar", "/usr/bin/bingo-leaderboard.jar"]