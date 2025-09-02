# Primera Etapa: Compilación
FROM gradle:8.9-jdk21-jammy AS build

WORKDIR /app
COPY build.gradle settings.gradle ./
COPY src ./src

RUN gradle bootJar

# Segunda Etapa: Ejecución
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app
COPY --from=build /app/build/libs/*-SNAPSHOT.jar ./approval-flow.jar

EXPOSE 8080
CMD ["java", "-jar", "approval-flow.jar"]
