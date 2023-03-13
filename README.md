<div>
  <h2 align="center">API for KSP</h2>
  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
  <p align="center">CRUD basico para una prueba tecnica..</p>
</div>

### About the Project

Este proyecto esta creado con Node.js v18.14.0 y el CLI de Nest v9.2

### Tech Stack

- [Nest.js](https://nestjs.com/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

### Prerequisites

Como requisitos, se recomienda tener instalado `docker` para poder correr la imagen de la base de datos.
Tambien es una opcion tener `yarn`.

### Installation

1. Ejecutar Docker desktop

2. Clonar el repositorio
   ```sh
   git clone https://github.com/edermarcos/ksp_test_api.git
   ```
3. Instalar las dependencias
   ```sh
   yarn install
   ```
4. Configurar las variables `.env` de entorno basado en el archivo `.env.example`

5. Crear un volumen para la base de datos
    ```
   docker volume create postgres-db
    ```

5. Ejecutar el comando para levantar la imagen de la base de datos
   ```sh
   docker compose up -d
   ```
6. Correr el servidor
   ```sh
   yarn start:dev
   ```
7. (Opcional) Para tener informacion dummy en la tabla de Employees, ejecutar el siguiente comando. Cada que se ejecuta, se agregan 15 registros pero se eliminan los que ya existian.
   ```sh
   http://localhost:3000/employees/seed
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Eder Marcos - eder.marcos.lara@gmail.com
