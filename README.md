<!--

TODO:
- Create prisma seeds
- Create repositories
- Create in-memory repositories
- Create services and make unit tests
- Create prisma repositories
- Create controllers and make e2e tests
- Generate insomnia json
-->

<!-- https://efficient-sloth-d85.notion.site/Desafio-03-0b927eb32dbd4f21ab40224ffdf6cf19 -->

# 🐩 Find a Friend API
I developed this project as a challenge of my latest studies on Node lessons at [Rocketseat](https://www.rocketseat.com.br).

## 🚀 Techs and Tools
- [Node.js v18](https://nodejs.org/)
- [Fastify](https://fastify.dev)
- [Prisma](https://www.prisma.io) / [PostgreSQL](https://www.postgresql.org/)  / [Docker](https://www.docker.com/)
- [Insomnia](https://insomnia.rest/)
- [Vitest](https://vitest.dev/)


## 🖥️ Project
<!-- WRITE ABOUT THE PROJECT -->

## ⚙️ Get started
```zsh
npm i
npm run start:dev

docker compose up -d

npx prisma migrate dev
```

## 🔗 Routes
<!-- GENERATE AND TEST -->
<!-- [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Ignite%20Node.js%3A%20Find%20a%20Friend%20API%0A&uri=https://raw.githubusercontent.com/rcrdk/find-a-friend-nodejs-api/main/insomnia.json) -->

## 📋 Business Rules and Requirements

### Functional Requirements
- [ ] It should be able to create a pet;
- [ ] It should be able to go get all available pets in a city;
- [ ] It should be able to filter pets by it's carecteristics;
- [ ] It should be able to show details of a pet for adotion;
- [ ] It should be able to register as a NGO (Non-Governamental Organization);
- [ ] It should be able to authenticate as a NGO;

### Business Rules
- [ ] To fetch all pets, a city must be provied;
- [ ] A NGO must have a address and a WhatsApp phone number;
- [ ] A pet must be connected with a NGO;
- [ ] The user who wishes to adopt, must contact the NGO by their WhatsApp number;
- [ ] All filters, besides the city, are optional;
- [ ] For a NGO access the app as admin, they must be authenticated;

### Non Functional Requirements
- [ ] The user password must be encypted;
- [ ] All application data must be persisted on a postgreSQL database;
- [ ] All data listed should be paginated with 20 itens by page;
- [ ] The user must be identified by a JWT (JSON Web Token);