# Fix It

Fix It es una página web para sacar turnos de manera online para reparar equipos informáticos. Cuenta también con un sistema de usuarios, con el cual podemos ver nuestros turnos disponibles y ademas podemos modificar nuestra información personal.


## 🛠️ Tecnologías

### Frontend

* HTML5
* CSS3
* JavaScript
* Axios
* React 19
* React Router DOM
* Vite 7
* Styled Components

### Backend

* Node.js 22
* TypeScript 5.9
* Express 5
* TypeORM 0.3
* Bcrypt 6
* PostgreSQL
* JSON Web Token (JWT)
* Class Validator y Class Transformer

### Herramientas y despliegue

* Git y GitHub — control de versiones
* Railway — despliegue del backend
* Vercel — despliegue del frontend

## ✨ Funcionalidades principales

### Usuarios

* Registro de nuevos usuarios con validaciones
* Inicio de sesión mediante credenciales
* Autenticación con JWT
* Consulta y edición de información personal
* Solicitud y cancelación de turnos
* Consulta de turnos asociados a la cuenta
* Desactivación lógica de la cuenta

### Administración

* Consulta de usuarios registrados
* Consulta individual de usuarios
* Consulta de turnos de usuarios
* Cancelación administrativa de turnos
* Desactivación de cuentas de usuarios
* Acceso restringido mediante roles

### Seguridad

* Contraseñas protegidas mediante hashing con Bcrypt
* Validación de datos mediante DTOs y Class Validator
* Middleware de autenticación para verificar JWT
* Middleware de autorización por roles
* Restricción de acceso para usuarios desactivados
* Control de acceso a rutas protegidas

## 📁 Estructura del proyecto

Fix-It es una aplicación full stack organizada en dos partes independientes, frontend y backend, dentro de un mismo repositorio. El backend implementa una arquitectura modular con separación de responsabilidades entre controladores, servicios, repositorios y entidades. El frontend está desarrollado con React y utiliza componentes reutilizables, vistas, contextos y funciones auxiliares.

Fix-It/
├── back/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dtos/
│   │   ├── entities/
│   │   ├── exceptions/
│   │   ├── handlers/
│   │   ├── interfaces/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── index.ts
│   │   └── server.ts
│   └── package.json
│
├── front/
│   └── vite-project/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── context/
│       │   ├── helpers/
│       │   └── views/
│       └── package.json
│
└── README.md

### Arquitectura del backend

El flujo general de una petición es:
Cliente React
    ↓
Router Express
    ↓
Middlewares
    ↓
Controller
    ↓
Service (handlers)
    ↓
Repository / TypeORM
    ↓
PostgreSQL

### Responsabilidades

* Routes: definen los endpoints y los middlewares correspondientes
* Controllers: reciben las solicitudes HTTP y construyen las respuestas
* Handlers (Services): contienen la lógica de negocio
* Repositories: encapsulan las operaciones de acceso a datos
* Entities: representan las entidades persistidas mediante TypeORM
* DTOs: definen y validan los datos recibidos
* Middlewares: realizan tareas como autenticación, autorización y validación

## ⚙️ Instalación y uso local
### Requisitos previos

Para ejecutar Fix-It localmente, necesitás:
- Node.js 22.x
- npm
- PostgreSQL instalado y en ejecución
- Git

### Pasos


1. Clonar el repositorio

``` bash
git clone https://github.com/GNicolasRocca/Fix-It.git
cd Fix-It
```

2. Configurar la base de datos

Iniciar PostgreSQL y crear una base de datos para la aplicación.

Por ejemplo, desde psql:

CREATE DATABASE fixit;

Se necesita un usuario de PostgreSQL con permisos sobre la base de datos creada.

3. Instalar las dependencias del backend

Desde la raíz del proyecto:

cd back
npm install

4. Configurar las variables de entorno del backend

Crear un archivo .env dentro de back/.

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password_local
DB_NAME=fixit

DB_SYNCHRONIZE=true
DB_DROP_SCHEMA=false
DB_LOGGING=false

JWT_SECRET=reemplazar_por_una_clave_secreta_segura
FRONTEND_URL=http://localhost:5173

Importante:

Reemplazá DB_USERNAME y DB_PASSWORD con tus credenciales locales.

DB_SYNCHRONIZE=true está pensado únicamente para facilitar el desarrollo local con una base de datos de prueba.

En producción, se recomienda utilizar migraciones y mantener la sincronización automática desactivada.

DB_DROP_SCHEMA debe permanecer en false para evitar la eliminación del esquema de la base de datos.

JWT_SECRET debe ser una clave segura y privada.

No subas archivos .env con credenciales reales al repositorio.

5. Iniciar el backend

Para desarrollo:

``` bash
npm run dev

```

Para compilar TypeScript y ejecutar la versión compilada:

``` bash
npm run build
npm start
```

Por defecto, utilizando el .env del ejemplo, la API estará disponible en:

http://localhost:3000

El servidor inicia luego de establecer correctamente la conexión con PostgreSQL.

6. Instalar las dependencias del frontend

Abrir otra terminal desde la raíz del repositorio:

``` bash
cd front/vite-project
npm install
```

7. Configurar las variables de entorno del frontend

Crear un archivo .env dentro de front/vite-project/.

VITE_API_URL=http://localhost:3000

Esta variable indica la URL del backend al que se conectará Axios.

8. Iniciar el frontend

``` bash
npm run dev
```

Abrir la dirección indicada por Vite, habitualmente:

http://localhost:5173

Para generar una versión de producción del frontend:

``` bash
npm run build
```

### Nota: es necesario mantener el backend y frontend ejecutándose en terminales separadas durante el desarrollo local.

## 🔌 Endpoints de la API

> Base URL: `http://localhost:3000`

La API permite administrar usuarios y turnos mediante métodos HTTP.
Los endpoints protegidos requieren un token JWT válido, enviado mediante el encabezado:
Authorization: Bearer <TOKEN>

|--------|----------|-------------|
| Usuarios y autenticación        |
|--------|----------|-------------|
| Método | Endpoint | Descripción | Acceso
|--------|----------|-------------|
| POST | `/users/register` | Registrar un nuevo usuario | Público
| POST | `/appointments`
|--------|----------|-------------|
| Turnos                          |
|--------|----------|-------------|
| Método | Endpoint | Descripción | Acceso
|--------|----------|-------------|
| GET | `/appointments` | Consultar turnos | Autenticado |
| GET | `/appointments/my-appointments` | Consultar turnos propios| Autenticado |
| GET | `/appointments/user-id` | Consultar los turnos de un usuario | Admin |
| GET | `/appointments/:id` | Consultar un turno por ID | Admin |
| POST | `/appointments/schedule` | Solicitar un turno | Autenticado |
| PUT | `/appointments/cancel/:id` | Cancelar un turno | Autenticado |
| PUT | `/appointments/user-cancel/:userId/:appointmentId ` | Admin |



## 📸 Capturas de pantalla


## 🚀 Próximas funcionalidades

- [ ] Función de "whitelist". El administrador va poder hablilitar o deshabilitar a un usuario según lo considere, sería una función totalmente opcional
- [ ] Verificación vía mail cuando el usuario se registre
- [ ] Poder cambiar contraseña, antes solicitaría verificación vía mail para hacerlo 
- [ ] Chat con ia o chatbot para consultas o reclamos
- [ ] Función para reactivar una cuenta de un usuario siendo administrador
