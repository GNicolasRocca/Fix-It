# Fix It

Fix It es una página web para sacar turnos de manera online para reparar equipos informáticos. Cuenta también con un sistema de usuarios, con el cual podemos ver nuestros turnos disponibles y ademas podemos modificar nuestra información personal.


## 🛠️ Tecnologías

* HTML
* CSS
* JavaScript (ES2025)
* TypeScript v5.9.3
* Express V5
* NodeJS v22
* TypeORM v0.3.27
* Bcrypt v6.0.0
* Axios v1.13.2
* React v19.1.1
* Vite v7.1.7

## 📁 Estructura del proyecto

Respecto a la estructura del proyecto es monolítica y con diseño modular. Con una separación de preocupaciones claras. El proyecto esta dividido en dos carpetas concisas, front y back. Por el lado del back tenemos la carpeta "src". Dentro de "src" tenemos las carpetas: config, controllers, dtos, entities, exceptions, handlers (services), interfaces, middlewares, repositories, routes, utils, entre otros. Por el lado del front tenemos la carpeta "vite-project", la cual contiene todo el front. La carpeta esta dividida en la carpeta "public" y "src" (entre otros). Dentro de "src" tenemos las carpetas: assets, components, context, helpers, views, entre otros.

## ⚙️ Instalación y uso local
### Requisitos previos

### Pasos
1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Fix-It.git
cd fix-it
```

2. Instalar dependencias del backend
```bash
cd back
npm install
```

3. Configurar variables de entorno: En el .gitignore se encuentra excluido el .env. Por lo que el desarrollador debería crear un archivo `.env` en la carpeta `back` con el siguiente contenido:
```
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/Arrays_peliculas
```

5. Iniciar el backend
```bash
npm start
```

5. Instalar dependencias del frontend
```bash
cd ../front
npm install
```

6. Compilar los scripts
```bash
npx webpack
```

7. Abrir el frontend
Abrí `front/pages/index.html` con Live Server o cualquier servidor estático.

## 🔌 Endpoints de la API

> Base URL: `http://localhost:3000` (local) — próximamente desplegado

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/movies` | Obtiene todas las películas |



## 📸 Capturas de pantalla


## 🚀 Próximas funcionalidades

- [ ] Función de "whitelist". El administrador va poder hablilitar o deshabilitar a un usuario según lo considere, sería una función totalmente opcional
- [ ] Verificación vía mail cuando el usuario se registre
- [ ] Poder cambiar contraseña, antes solicitaría verificación vía mail para hacerlo 
- [ ] Chat con ia o chatbot para consultas o reclamos
- [ ] Función para reactivar una cuenta de un usuario siendo administrador
