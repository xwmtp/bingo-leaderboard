plugins {
    id("org.springframework.boot") version "4.1.1"
    id("io.spring.dependency-management") version "1.1.7"
    java
}

group = "xwmtp"
version = "1.0.1-SNAPSHOT"

tasks.withType<Jar> {
    archiveBaseName.set("bingo-leaderboard")
    archiveVersion.set("")
}

repositories {
    mavenCentral()
}

dependencies {

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")

    implementation("com.google.code.gson:gson:2.14.0")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.assertj:assertj-core:3.27.7")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
