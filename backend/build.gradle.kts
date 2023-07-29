plugins {
    id("org.springframework.boot") version "2.7.12"
    id("io.spring.dependency-management") version "1.1.0"
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
    implementation("com.google.code.gson:gson:2.8.9")
    testImplementation(platform("org.junit:junit-bom:5.7.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("org.assertj:assertj-core:3.16.1")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
