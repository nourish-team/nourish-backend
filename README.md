<div align="center">
<img width="300" alt="nourish_logo" src="https://github.com/nourish-team/nourish-frontend/assets/114712265/3eb85d69-f70d-4994-89a5-638a53f3194d">
</div>

# Nourish - Server

## Backend repository

Welcome to our backend repository. We are always welcoming new contributors. Please reach out to us so we can give you a tour of our backend.

## 💪 Contributors

<table>
   <tbody>
      <tr>
         <td align="center" valign="top" width="14.28%"><a href="https://github.com/Anissa3005"><img src="https://avatars.githubusercontent.com/u/114712265?v=4" width="100px;" alt="Anissa Chadouli"/><br /><sub><b>Anissa Chadouli</b></sub></a><br /><a href="https://github.com/Anissa3005" title="Profile">💻</a></td>
         <td align="center" valign="top" width="14.28%"><a href="https://github.com/FefesG5"><img src="https://avatars.githubusercontent.com/u/116435020?v=4" width="100px;" alt="Gee Chai"/><br /><sub><b>Gee Chai</b></sub></a><br /><a href="https://github.com/FefesG5" title="Profile">💻</a></td>
         <td align="center" valign="top" width="14.28%"><a href="https://github.com/shonancanuck"><img src="https://avatars.githubusercontent.com/u/105531674?v=4" width="100px;" alt="Sean McKay"/><br /><sub><b>Sean McKay</b></sub></a><br /><a href="https://github.com/shonancanuck" title="Profile">💻</a></td>
         <td align="center" valign="top" width="14.28%"><a href="https://github.com/oddpharmacy"><img src="https://avatars.githubusercontent.com/u/107352832?v=4" width="100px;" alt="Lisa Tan"/><br /><sub><b>Lisa Tan</b></sub></a><br /><a href="https://github.com/oddpharmacy" title="Profile">💻</a></td>
      </tr>
   </tbody>
</table>

## Getting Started

### ✅ Prerequisites

- [Node](https://nodejs.org/en/) version 18.18.2
- [Docker Dektop](https://www.docker.com/products/docker-desktop/)

### 🛠️ Setup

#### 1. Install dependencies

```sh
npm install
```

#### 2. Setup Husky hooks 🐶

This will run linting before pushing your commits.

```sh
npm run prepare
```

#### 3. Setup Database 🐳

To keep things simple we use Docker to run an image of PostgreSQL database.

#### 3.a Add database URL to your .env file

This should match with the Docker environment.

```sh
DATABASE_URL=postgresql://postgres:test@localhost:6500/nourishdb-dev
```

If you want to setup a local postgreSQL database you can change this to your postgreSQL database info.

#### 3.b Run Docker compose and migrations

```sh
npm run dev:startdb
```

#### 3.c View the database

```sh
npm run prisma:studio
```

#### 3.d Stop Docker container

```sh
npm run db:dockerdown
```

If you don't stop your container correctly, you may encounter some issues when starting the Docker container. If that's the case, please try to clean your Docker system by running:

```sh
docker system prune
```

#### 4. Run the API

```sh
npm run dev
```

That's it!

## 🧪 How to Test your code

<details> 
  <summary> Testing your linting </summary>

1. Run ESlint for catching errors:

```
npm run lint
```

2. If errors occur you can run:

```
npm run lint:fix
```

This will fix linting errors such as double quotes and spacing issues. However, it will not address more complex errors, such as TypeScript errors or the use of duplicate value names.

</details>

<details>
   <summary>Testing with Jest</summary>

1. Run tests
   ```
   npm test
   ```
   After the tests have finished running, the results can be viewed in the console.
   </details>

## 📊 Data used

- Seeding skincare data:

Since free skincare APIs are hard to come by, we seeded our database with the data provided by [Laura Robertson](https://github.com/LauraRobertson/skincareAPI).

## License

This project is licensed under the MIT License.
