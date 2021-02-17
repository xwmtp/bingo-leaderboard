plugins {
    id("org.springframework.boot") version "2.3.3.RELEASE"
    id("io.spring.dependency-management") version "1.0.8.RELEASE"
    java
}

group = "xwmtp"
version = "1.0-SNAPSHOT"

tasks.withType<Jar> {
    archiveBaseName.set("bingo-leaderboard")
    archiveVersion.set("")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(module = "junit-vintage-engine")
    }
    implementation("com.google.code.gson:gson:2.8.6")
}