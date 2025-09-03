# Approval Flow Service

Microservicio para gestionar flujos de aprobación de solicitudes empresariales.

## Descripción

Este microservicio permite crear, gestionar y aprobar diferentes tipos de solicitudes como despliegues, accesos, cambios técnicos, infraestructura, seguridad y otros.

## Tecnologías

- **Java 17**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **H2 Database** (desarrollo)
- **Gradle**
- **Lombok**

## Funcionalidades

- ✅ Crear solicitudes de aprobación
- ✅ Listar solicitudes con paginación
- ✅ Aprobar/Rechazar solicitudes
- ✅ Historial de cambios de estado
- ✅ Gestión de tipos de solicitud
- ✅ Conteo de aprobaciones pendientes por usuario
- ✅ Manejo de excepciones personalizado

## Endpoints Principales

### Solicitudes de Aprobación

- GET    /approval-flow/api/v1/approval-requests              # Listar todas las solicitudes (paginado)
- POST   /approval-flow/api/v1/approval-requests              # Crear nueva solicitud
- GET    /approval-flow/api/v1/approval-requests/{id}         # Obtener solicitud por ID
- PUT    /approval-flow/api/v1/approval-requests/{id}/approve # Aprobar solicitud
- PUT    /approval-flow/api/v1/approval-requests/{id}/reject  # Rechazar solicitud
- GET    /approval-flow/api/v1/approval-requests/pending-count # Contar aprobaciones pendientes


## Tipos de Solicitud

- **DEPLOYMENT** - Despliegues
- **ACCESS** - Solicitudes de acceso
- **TECHNICAL_CHANGE** - Cambios técnicos
- **INFRASTRUCTURE** - Infraestructura
- **SECURITY** - Seguridad
- **OTHER** - Otros

## Estados de Solicitud

- **PENDING** - Pendiente (estado inicial)
- **APPROVED** - Aprobada
- **REJECTED** - Rechazada

## Cómo Ejecutar

### Prerrequisitos
- Java 17+
- Gradle 7+

### Ejecución

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd approval-flow-service
   ```

2. **Ejecutar con Gradle**
   ```bash
   ./gradlew bootRun
   ```

3. **Acceder a la aplicación**
   - API: `http://localhost:8080`
   - H2 Console: `http://localhost:8080/h2-console`
     - JDBC URL: `jdbc:h2:mem:testdb`
     - Username: `sa`
     - Password: (vacío)

### Compilar JAR
```bash
./gradlew build
java -jar build/libs/approval-flow-service-0.0.1-SNAPSHOT.jar
```

## Configuración

La configuración principal se encuentra en `src/main/resources/application.properties`:

```properties
# Base de datos H2
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
```

## Ejemplo de Uso

### Crear una solicitud
```bash
curl -X POST http://localhost:8080/approval-flow/api/v1/approval-requests \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Despliegue Producción",
    "description": "Despliegue de nueva versión",
    "requester": "developer@company.com",
    "approver": "manager@company.com",
    "requestType": "DEPLOYMENT"
  }'
```

### Obtener tipos de solicitud
```bash
curl http://localhost:8080/approval-flow/api/v1/request-types
```

### Contar aprobaciones pendientes
```bash
curl http://localhost:8080/approval-flow/api/v1/requests/pending-count/manager@company.com
```
