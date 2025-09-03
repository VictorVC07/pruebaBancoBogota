# Approval Flow System - Frontend

Sistema de flujo de aprobaciones desarrollado con 
Angular 15 y PrimeNG para la gestión de 
solicitudes de aprobación con control de acceso 
basado en roles.

## 🌟 Características

- **Gestión de Solicitudes**: Crear, visualizar y 
gestionar solicitudes de aprobación
- **Control de Acceso por Roles**: Diferentes 
permisos para Solicitantes y Aprobadores
- **Notificaciones en Tiempo Real**: Sistema de 
notificaciones para solicitudes pendientes
- **Filtrado y Paginación**: Búsqueda avanzada y 
navegación eficiente
- **Interfaz Responsiva**: Diseño adaptable para 
diferentes dispositivos
- **Tema Personalizable**: Integración con 
PrimeNG para una UI moderna

## 🛠️ Tecnologías Utilizadas

- **Angular 15**: Framework principal
- **PrimeNG**: Biblioteca de componentes UI
- **RxJS**: Programación reactiva
- **TypeScript**: Lenguaje de programación
- **SCSS**: Preprocesador CSS
- **Angular Reactive Forms**: Manejo de 
formularios

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm (versión 8 o superior)
- Angular CLI (versión 15)

## 🔧 Instalación

1.   **Clonar el repositorio**

```bash
git clone https://github.com/VictorVC07/pruebaBancoBogota.git

cd approval-flow-front
```

2. **Instalar dependencias**
```bash
npm install  
```

3. **Configurar variables de entorno**
   
Editar src/environments/environment.ts :

```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```
4. **Ejecutar la aplicación**
```bash
ng serve
```
   La aplicación estará disponible en http://localhost:4200

## 👥 Usuarios de Prueba
El sistema incluye usuarios predefinidos para testing:

### Solicitantes
- Usuario : maria.lopez@ejemplo.com
- Usuario : carlos.rodriguez@ejemplo.com
- Usuario : ana.martinez@ejemplo.com
### Aprobadores
- Usuario : aprobador@bancobogota.com
- Usuario : supervisor@bancobogota.com

## 🏗️ Arquitectura del Proyecto
```
src/
├── app/
│   ├── core/                    # Servicios 
principales y configuración
│   │   ├── guards/              # Guards de 
autenticación y autorización
│   │   ├── interceptors/        # Interceptores 
HTTP
│   │   ├── models/              # Interfaces y 
modelos de datos
│   │   └── services/            # Servicios de 
negocio
│   ├── features/                # Módulos de 
funcionalidades
│   │   ├── auth/               # Autenticación y 
autorización
│   │   └── requests/           # Gestión de 
solicitudes
│   └── shared/                 # Componentes y 
utilidades compartidas
│       ├── components/         # Componentes 
reutilizables
│       └── pipes/              # Pipes 
personalizados
├── assets/                     # Recursos 
estáticos
├── environments/               # Configuraciones 
de entorno
└── styles.scss                # Estilos globales
```
## 📱 Funcionalidades Principales
### 1. Lista de Solicitudes
- Visualización paginada de todas las solicitudes
- Filtros por estado, tipo, solicitante y aprobador
- Búsqueda en tiempo real con debounce
- Indicadores visuales de estado y prioridad
### 2. Creación de Solicitudes
- Formulario reactivo con validaciones
- Selección de tipo de solicitud
- Carga de archivos adjuntos
- Validación en tiempo real
### 3. Detalles de Solicitud
- Vista completa de la información de la solicitud
- Acciones de aprobación/rechazo (solo para aprobadores)
- Sistema de comentarios
- Historial de cambios de estado
### 4. Notificaciones
- Campana de notificaciones en tiempo real
- Contador de solicitudes pendientes
- Actualización automática cada 30 segundos
## 🔐 Control de Acceso
### Roles del Sistema
Solicitante (REQUESTER)

- ✅ Crear nuevas solicitudes
- ✅ Ver sus propias solicitudes
- ✅ Editar solicitudes en estado DRAFT
- ❌ Aprobar/rechazar solicitudes
Aprobador (APPROVER)

- ✅ Ver todas las solicitudes
- ✅ Aprobar/rechazar solicitudes
- ✅ Agregar comentarios
- ✅ Recibir notificaciones de solicitudes pendientes
- ❌ Crear nuevas solicitudes
## 🎨 Temas y Estilos
El proyecto utiliza PrimeNG con tema personalizado:

- Tema Principal : Basado en Bootstrap con colores corporativos
- Componentes : Tabla, formularios, botones y notificaciones de PrimeNG
- Responsividad : Diseño adaptable para móviles y escritorio
- Iconografía : PrimeIcons para consistencia visual
## 🧪 Testing
```
# Ejecutar tests unitarios
ng test

# Ejecutar tests con coverage
ng test --code-coverage

# Ejecutar tests e2e
ng e2e
```
## 🚀 Build y Despliegue
### Desarrollo
```
ng serve
```
### Producción
```
# Build para producción
ng build --configuration production

# Los archivos se generarán en dist/
```
### Variables de Entorno
Configurar en src/environments/environment.prod.ts :

```
export const environment = {
  production: true,
  apiUrl: 'https://api.bancobogota.com/
  approval-flow'
};
```
## 🔌 Integración con API
El frontend se conecta con una API REST que debe proporcionar:

### Endpoints Principales
- POST /auth/login - Autenticación
- GET /requests - Lista paginada de solicitudes
- POST /requests - Crear nueva solicitud
- GET /requests/{id} - Obtener solicitud por ID
- PUT /requests/{id}/approve - Aprobar solicitud
- PUT /requests/{id}/reject - Rechazar solicitud
- GET /requests/pending-count - Contador de pendientes
### Formato de Respuesta Esperado
```
{
  "content": [...],
  "page": {
    "totalElements": 100,
    "totalPages": 10,
    "size": 10,
    "number": 0
  }
}
```
## 🐛 Solución de Problemas
### Problemas Comunes
1. 1.
   Error de CORS
   
   - Verificar configuración del backend
   - Asegurar que la URL de la API sea correcta
2. 2.
   Paginación no funciona
   
   - Verificar que el backend retorne el formato correcto
   - Revisar la configuración de totalElements en la respuesta
3. 3.
   Notificaciones no se actualizan
   
   - Verificar que el usuario tenga rol de APPROVER
   - Comprobar la conectividad con la API
### Logs de Desarrollo
```
# Ver logs detallados
ng serve --verbose

# Analizar bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```
## 🤝 Contribución
1. 1.
   Fork el proyecto
2. 2.
   Crear una rama para la feature ( git checkout -b feature/nueva-funcionalidad )
3. 3.
   Commit los cambios ( git commit -am 'Agregar nueva funcionalidad' )
4. 4.
   Push a la rama ( git push origin feature/nueva-funcionalidad )
5. 5.
   Crear un Pull Request
### Estándares de Código
- Seguir las convenciones de Angular
- Usar TypeScript estricto
- Documentar componentes y servicios principales
- Escribir tests para nueva funcionalidad
