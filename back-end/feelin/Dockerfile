#
# Build stage
#
FROM eclipse-temurin:17-jdk-alpine AS builder
ADD . /src
WORKDIR /src
RUN ./mvnw package -DskipTests

#
# Package stage
#
FROM eclipse-temurin:17-jre-alpine
COPY --from=builder src/target/feelin-0.0.1.jar feelin.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/feelin.jar"]