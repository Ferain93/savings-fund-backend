# Savings Fund Backend

API backend para el sistema de Caja de Ahorro, construido con **Koa.js** y **MySQL**.

## Requisitos previos

- Node.js >= 18
- MySQL 8+
- npm

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Ferain93/savings-fund-backend.git
cd savings-fund-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de base de datos
```

## Variables de entorno

| Variable         | Descripción                  | Ejemplo                 |
| ---------------- | ---------------------------- | ----------------------- |
| `PORT`           | Puerto del servidor          | `3000`                  |
| `DB_HOST`        | Host de MySQL                | `localhost`             |
| `DB_PORT`        | Puerto de MySQL              | `3306`                  |
| `DB_USER`        | Usuario de MySQL             | `root`                  |
| `DB_PASSWORD`    | Contraseña de MySQL          | `password`              |
| `DB_NAME`        | Nombre de la base de datos   | `savings_fund_xx`       |
| `JWT_SECRET`     | Clave secreta para JWT       | `tu_clave_secreta`      |
| `JWT_EXPIRES_IN` | Tiempo de expiración del JWT | `7d`                    |
| `FRONTEND_URL`   | URL del frontend (para CORS) | `http://localhost:7000` |

## Ejecución

```bash
# Modo desarrollo (con hot-reload)
npm run dev

# Modo producción
npm start
```

## Migraciones y Seeds

```bash
# Ejecutar migraciones
npm run migrate

# Revertir migraciones
npm run migrate:rollback

# Ejecutar seeds
npm run seed
```

## Linting y Formateo

```bash
# Verificar errores de estilo
npm run lint

# Corregir errores automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format
```

## Estructura del proyecto

```
savings-fund-backend/
├── src/
│   ├── config/          # Configuración de la app
│   ├── controllers/     # Controladores (lógica de request/response)
│   ├── db/              # Conexión y utilidades de BD
│   │   ├── migrations/  # Migraciones de Knex
│   │   └── seeds/       # Seeds de datos iniciales
│   ├── middlewares/      # Middlewares de Koa
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── app.js           # Configuración de la app Koa
│   └── server.js        # Punto de entrada del servidor
├── database/            # Configuración de Knex (knexfile, conexión)
│   ├── migrations/
│   └── seeds/
├── .env.example         # Plantilla de variables de entorno
├── .prettierrc          # Configuración de Prettier
├── eslint.config.js     # Configuración de ESLint
└── package.json
```

## Convención de ramas

```
feature/SCRUM-XX-descripcion-corta
fix/SCRUM-XX-descripcion-corta
chore/SCRUM-XX-descripcion-corta
```
