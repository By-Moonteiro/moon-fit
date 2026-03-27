<div align="center">

<img src="../docs/assets/logo.svg" alt="MoonFit" width="520"/>

### Interface web do MoonFit

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Hook Form](https://img.shields.io/badge/RHF-7-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=for-the-badge)](https://zod.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>

---

## 📚 Sobre

Frontend do MoonFit — interface para autenticação e gerenciamento de treinos, consumindo a [API REST do backend](../backend/README.md).

> Primeiro projeto frontend com integração real a uma API própria.

---

## 🎯 Funcionalidades

- [x] Tela de Login e Register (com tabs animadas)
- [x] Logo SVG animado
- [x] Formulários com validação (RHF + Zod)
- [x] Integração com a API via Axios + TanStack Query

---

## 🏗️ Estrutura

```
src/
├── components/
│   ├── ui/              # Componentes Shadcn (Tabs, etc.)
│   └── MoonLogo.tsx     # SVG animado
├── lib/
│   ├── axios.ts         # Instância configurada do Axios
│   └── utils.ts
├── pages/
│   ├── Login.tsx
│   └── Register.tsx
├── schemas/             # Schemas Zod de validação
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 24 LTS
- pnpm
- Backend rodando em `http://localhost:3333`

### Setup

**1. Entre na pasta:**

```bash
cd frontend
```

**2. Instale as dependências:**

```bash
pnpm install
```

**3. Configure as variáveis de ambiente:**

```bash
cp .env.example .env
```

**4. Inicie em desenvolvimento:**

```bash
pnpm dev
```

✅ App disponível em `http://localhost:5173`

---

## 🗺️ Rotas

| Rota | Página | Auth |
|---|---|---|
| `/` | Login | ❌ |
| `/register` | Register | ❌ |

---

## 📝 Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:3333
```

---

## 📖 Aprendizados

- [x] Estruturação de um projeto frontend do zero com Vite
- [x] Componentização com React e TypeScript
- [x] Estilização com Tailwind CSS e Shadcn/ui
- [x] Gerenciamento de formulários com React Hook Form
- [x] Validação de schemas com Zod
- [x] Requisições e cache com TanStack Query + Axios
- [x] Roteamento com React Router

---

## 📄 Licença

MIT