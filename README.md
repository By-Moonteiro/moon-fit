<div align="center">

<img src="docs/assets/logo.svg" alt="MoonFit" width="520"/>

### API de gerenciamento de treinos — construída para durar

Projeto pessoal de estudo e uso real, focado em arquitetura backend sólida com NestJS, boas práticas e evolução contínua.

[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
![Swagger](https://img.shields.io/badge/Swagger-OAS3-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Scalar](https://img.shields.io/badge/Scalar-API_Docs-6366f1?style=for-the-badge)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow?style=for-the-badge)

</div>

---

## 📚 Sobre o Projeto

**MoonFit** é uma API REST para gerenciamento de fichas de treino, desenvolvida com foco em aprendizado prático de NestJS, arquitetura backend e boas práticas.

O projeto resolve um problema real — controle de treinos — e serve como laboratório para aplicar conceitos de forma progressiva: autenticação, estrutura em módulos, testes e performance.

> Este repositório é público e evolui junto com meu aprendizado. Sinta-se livre para explorar e acompanhar o progresso.

---

## 🎯 Funcionalidades (atuais)

- [x] Autenticação com JWT (Access)
- [x] Cadastro e gerenciamento de usuários
- [x] Rotas protegidas com guards NestJS

---

## 🏗️ Arquitetura

```

src/
├── main.ts
├── app.module.ts
├── auth/                        # Módulo de autenticação
│   ├── decorators/              # @CurrentUser e outros
│   ├── dtos/
│   ├── guards/                  # JwtAuthGuard
│   ├── strategy/                # JWT Strategy (Passport)
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── users/
├── exercises/
├── training_category/
├── training_sheet/
├── prisma/                      # Módulo compartilhado do Prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── test/

```

> Com exceção do auth/ e prisma/, todos os módulos seguem a estrutura padrão: controller, service, module, dtos/, repositories/, entities/ e \*.spec.ts para testes unitários.

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 24 LTS
- pnpm
- Docker e Docker Compose

### Setup

**1. Clone o repositório:**

```bash
git clone https://github.com/By-Moonteiro/moon-fit.git
cd moon-fit
```

**2. Instale as dependências:**

```bash
pnpm install
```

**3. Configure as variáveis de ambiente:**

```bash
cp .env.example .env
```

**4. Suba o banco com Docker:**

```bash
docker compose up -d
```

**5. Gere o Prisma Client e rode as migrations:**

```bash
pnpm prisma:migrate
```

**6. Inicie em desenvolvimento:**

```bash
pnpm start:dev
```

✅ API disponível em `http://localhost:3333`  
✅ Documentação interativa em `http://localhost:3333/docs`

---

## 📡 Endpoints (atuais)

### Auth

| Método | Rota             | Descrição         | Auth |
| ------ | ---------------- | ----------------- | ---- |
| `POST` | `/auth/register` | Registrar usuário | ❌   |
| `POST` | `/auth/login`    | Login             | ❌   |

### Users

| Método   | Rota          | Descrição         | Auth |
| -------- | ------------- | ----------------- | ---- |
| `GET`    | `/users/me`   | Perfil do usuário | ✅   |
| `PATCH`  | `/users/edit` | Editar usuário    | ✅   |
| `DELETE` | `/users/`     | Apagar usuário    | ✅   |

### Exercises

| Método   | Rota                               | Descrição                  | Auth |
| -------- | ---------------------------------- | -------------------------- | ---- |
| `POST`   | `/exercise/`                       | Registra exercício         | ✅   |
| `GET`    | `/exercise/`                       | Buscar Todos os exercícios | ✅   |
| `GET`    | `/exercise/:name`                  | Buscar por nome            | ✅   |
| `GET`    | `/exercise/completed/:isCompleted` | Filtrado por status        | ✅   |
| `PATCH`  | `/exercise/:name`                  | Editar exercício           | ✅   |
| `DELETE` | `/exercise/:name`                  | Apagar exercício           | ✅   |

---

## 📝 Variáveis de Ambiente

```env
# Banco de dados
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=moonfit

# Prisma
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/moon-fit?schema=public"

# JWT
JWT_SECRET=sua_chave_secreta


# App
PORT=3333
```

---

## 🐳 Docker

```bash
# Subir ambiente
docker compose up -d

# Parar
docker compose down

# Resetar banco (apaga dados)
docker compose down -v && docker compose up -d
```

---

## 📖 Aprendizados

Conceitos aplicados neste projeto:

- [x] Arquitetura modular com NestJS
- [x] ORM com Prisma + PostgreSQL
- [x] Ambiente isolado com Docker
- [x] Autenticação JWT com Guards e Decorators
- [x] Validação com class-validator
- [x] Documentacao da API com Swagger + Scalar (API Reference)

---

## 🗺️ Roadmap

- **Fase 1** — Base da API (auth, usuários, fichas) ← _atualmente_
- **Fase 2** — Testes e validações robustas
- **Fase 3** — Migração para Fastify
- **Fase 4** — Frontend/Mobile
- **Fase 5** — Deploy

---

## 📄 Licença

MIT
