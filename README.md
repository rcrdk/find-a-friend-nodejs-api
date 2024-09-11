# 🐩 Find a Friend API
I developed this project as a challenge of my latest studies on Node lessons at [Rocketseat](https://www.rocketseat.com.br).

## 🚀 Techs and Tools
- [Node.js v18](https://nodejs.org/)
- [Fastify](https://fastify.dev)
- [Prisma](https://www.prisma.io) / [PostgreSQL](https://www.postgresql.org/)  / [Docker](https://www.docker.com/)
- [Insomnia](https://insomnia.rest/)
- [Vitest](https://vitest.dev/)


## 🖥️ Project
This project was developed as a challenge to practice the development of a API REST in Node.js with Fastify applying concepts as SOLID, design patterns (factory pattern, repositories pattern) and clean architecture.

To get started with the flow of the application, you can register a new user and authenticate or used the seeded data. You should be able to get a user profile and updated it if you're authenticated, also you can finda list o users by location (to be used on filters on front-end); Authenticated users can create, update and delete their own pets; For public access it's possible to find pets by location (required) and pets caracteristics (optional), it's possible to show pet profile for adoption.

In this project it was ensured that all application works by running all test over testing simply with routes on Insomnia. It was applied unit tests to services layer and E2E test on controllers. It was used Vitest along with supertest to make requests. It was implemented GitHub Actions to run unit tests on push and E2E tests on pull requests.

Prisma was used as ORM and client alongside with PostgreSQL database to mage with data. To make the authentication it was used JWT (JSON Web Token) to persist user information with security into the application. 

## ⚙️ Get started
```zsh
npm i
npm run start:dev

docker compose up -d

npx prisma migrate dev
```

## 🔗 Routes
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Ignite%20Node.js%3A%20Find%20a%20Friend%20API%0A&uri=https://raw.githubusercontent.com/rcrdk/find-a-friend-nodejs-api/main/insomnia.json)

## 📋 Business Rules and Requirements
<!-- 
COULD BE DONE:
- Implement pet requirements
- Implement pet image gallery with AWS
- Error watcher with Sentry
 -->

### Functional Requirements
- [x] It should be able to add a pet;
- [x] It should be able to update a pet;
- [x] It should be able to remove a pet;
- [x] It should be able to get all available pets in a city;
- [x] It should be able to filter pets by it's carecteristics;
- [x] It should be able to show details of a pet for adoption;
- [x] It should be able to register as a NGO (Non-Governamental Organization);
- [x] It should be able to authenticate as a NGO;
- [x] It should be able to show details of a NGO;
- [x] It should be able to update a NGO profile;
- [x] It should be able to fetch all NGO's in a city;

### Business Rules
- [x] To fetch all pets, a state and a city must be provied;
- [x] All filters, besides the city ans state, are optional;
- [x] A NGO must have a address and a WhatsApp phone number;
- [x] A pet must be connected with a NGO;
- [x] The user who wishes to adopt, must contact the NGO by their WhatsApp number;
- [x] For a NGO access the app as admin, they must be authenticated;
- [x] A NGO can only update their own profile;
- [x] A NGO can only update their own pets;
- [x] A NGO can only delete their own pets;

### Non Functional Requirements
- [x] The user password must be encypted;
- [x] All application data must be persisted on a postgreSQL database;
- [x] All data listed should be paginated with 20 itens by page;
- [x] The user must be identified by a JWT (JSON Web Token);