#
# Build stage
#
FROM maven:3.6.0-jdk-17-slim AS builder
ADD . /src
WORKDIR /src
RUN ./mvnw package -DskipTests

#
# Package stage
#
FROM openjdk:17-jre-slim
COPY --from=builder /target/feelin-0.0.1.jar feelin.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/feelin.jar"]