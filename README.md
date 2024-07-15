<h3 align="center">Prueba Clay Technologies</h3>

## Descripción
Este proyecto es una prueba técnica diseñada para demostrar habilidades en el desarrollo de software. La aplicación permite gestionar idiomas para proyectos y aplicaciones según los requerimientos y parámetros establecidos por el cliente.

> Este projecto uso como framework principal [Nest](https://docs.nestjs.com/) en conjunto con [Prisma](https://www.prisma.io/orm), además se recomienda uso de [pnpm](https://pnpm.io/es/installation#usando-pnpm). 

## Instalación
Para configurar y correr la aplicación localmente, sigue estos pasos:
```bash
$ pnpm install
```

## Migraciones
Primero debemos crear el env, para ello copiamos el de ejemplo:
```bash
cp .env.example .env
```
Para manejar las migraciones de la base de datos, usa los siguientes comandos:

```bash
# Ejecutar y crear collections en la base datos
$ pnpm run prisma generate

```

## Ejecución de la aplicación
Puedes correr la aplicación en modo desarrollo utilizando los comandos:
```bash
# Modo desarrollo
$ pnpm run start

# Modo watch (reinicio automático)
$ pnpm run start:dev
```
La documentación y los endpoints de prueba están disponibles en Swagger en la siguiente URL:
```
# ruta de documentacion y test en swagger
$ http://localhost:8080/api

```

## Pruebas

```bash
# Ejecutar pruebas unitarias
$ pnpm run test

# Ver la cobertura de pruebas
$ pnpm run test:cov
```

## Revisión funcionalidades

1. Accede a Swagger en http://localhost:8080/api.

La aplicación dispone de 5 endpoints. Las 4 operaciones CRUD para el manejo de idiomas de un proyecto, incluyendo ruta, lenguaje y localidad, donde el conjunto de claves/valor dependerá de estos 4 parámetros. Además, hay un quinto endpoint del tipo GET usado en el frontend para devolver el idioma que se desea manejar según la vista.


## Alcances

- Metodo Create solo creara, en caso que el elemento que se busque se intente crear ya exista, retornara el objeto.
- No se completó la cobertura total de pruebas debido a limitaciones de tiempo y la naturaleza práctica del ejercicio.

## Author

- Paul Beltrán - [Github](https://github.com/pbeltranes) - [Lindked](https://www.linkedin.com/in/paul-beltran-espinosa/)