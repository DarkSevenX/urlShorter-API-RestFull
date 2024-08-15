# API rest Acortador de URLs

Esta es una API RESTful para acortar URLs, construida con **Express** y **Prisma ORM**. La API proporciona funcionalidades para acortar URLs largas, redirigir a las URLs originales y verificar si una URL corta ya está registrada.

# Documentación interactiva
https://bysh.glitch.me/

# Live preview 
https://darksevenx.github.io/byte-short-FrontEnd/

## Índice

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Rutas](#rutas)
- [Documentación](#documentación)
- [Pruebas](#pruebas)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Características

- Acorta URLs largas
- Redirige a las URLs originales usando el código corto
- Maneja errores para URLs no encontradas y URLs inválidas
- Documentación interactiva con Swagger

## Tecnologías

- **Express**: Framework para construir la API.
- **Prisma ORM**: ORM para la gestión de base de datos.
- **shortid**: Para generar códigos cortos únicos.
- **Swagger**: Para documentación interactiva de la API.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/DarkSevenX/urlShorter-API-RestFull.git
   cd urlShorter-API-RestFull
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura tu base de datos:

   - Asegúrate de tener una base de datos configurada y actualiza el archivo `.env` con las credenciales de tu base de datos.

4. Ejecuta las migraciones de Prisma:

   ```bash
   npx prisma migrate dev
   ```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
DATABASE_URL="tu_url_de_base_de_datos"
DOMAIN="http://short.url/"
```

- **`DATABASE_URL`**: URL de conexión a tu base de datos.
- **`DOMAIN`**: Dominio base para las URLs acortadas ej: localhost:3000.

## Uso

1. Inicia el servidor:

   ```bash
   npm start
   ```

2. La API estará disponible en `http://localhost:3000`.

## Rutas

### Acortar URL

- **POST /api/**
  - Crea una URL corta para una URL original si no existe ya una URL corta registrada.
  - **Body**: `{"url": "http://www.wikipedia.com"}`
  - **Responses**:
    - `200 OK`: `{"originalUrl": "http://www.wikipedia.com", "urlShorted": "http://short.url/api/abc123"}`
    - `400 Bad Request`: `{"error": "invalid url"}`
    - `500 Internal Server Error`: `{"error": "Error message"}`

### Redirigir URL Corta

- **GET /api/{urlCode}**
  - Redirige a la URL original asociada con el código corto proporcionado.
  - **Parameters**: 
    - `urlCode`: Código corto de la URL que se desea redirigir.
  - **Responses**:
    - `302 Found`: Redirige a la URL original.
    - `404 Not Found`: `{"error": "url not found"}`
    - `500 Internal Server Error`: `{"error": "Error message"}`

## Documentación

La documentación interactiva de la API está disponible en `http://localhost:3000/api/docs/`. Puedes explorar los endpoints y ver ejemplos de solicitudes y respuestas.

## Pruebas

Las pruebas están implementadas usando [Jest](https://jestjs.io/). Puedes ejecutar las pruebas con:

```bash
npm test
```

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un "issue" o envía un "pull request" con tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
