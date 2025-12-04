# API_Petshop_2.0

# 🐶🐾 API Petshop 2.0 — Gestão Completa de Funcionários, Clientes, Pets e Agendamentos


Bem-vindo(a) à API Petshop 2.0, um sistema completo desenvolvido para ajudar petshops a gerenciarem funcionários, clientes, pets e agendamentos de forma simples, rápida e integrada.

Esta API inclui CRUD completo de todos os recursos, integração com banco de dados via Prisma, validação de dados com Zod, frontend e backend escritos em TypeScript, e um dashboard com métricas gerais dos cadastros.

# 🚀 Demonstração

🔗 API hospedada no Render:
https://api-petshop-2-0-1.onrender.com

# 🧩 Funcionalidades

✔️ Gestão completa com CRUD:

Funcionários

Clientes

Pets

Agendamentos (com calendário)

# 📊 Dashboard inteligente

Nosso diferencial é um dashboard com estatísticas gerais, incluindo:

Quantidade total de pets e clientes cadastrados

Percentual de crescimento mensal

Comparações entre períodos

Dados atualizados automaticamente

# 🛠️ Stack utilizada

Frontend: React + TypeScript + Axios + Tailwind + ShadCN

Backend: Node + Express + TypeScript + Prisma

Banco: PostgreSQL (Neon)

Deploy: Render (frontend + backend)

# 📁 Estrutura do Projeto

API_Petshop_2.0
 ├── backend
 └── frontend

# 🔌 Endpoints principais (exemplo)
Pets
GET    /pets
POST   /pets
PUT    /pets/:id
DELETE /pets/:id

Clientes
GET    /clientes
POST   /clientes
PUT    /clientes/:id
DELETE /clientes/:id

Agendamentos
GET    /agendamentos
POST   /agendamentos
PUT    /agendamentos/:id
DELETE /agendamentos/:id

#  ☁️ Mini Tutorial — Como fazer deploy no Render

A seguir está o guia resumido para subir o frontend e backend no Render a partir do GitHub.

# 🖥️ Deploy do Frontend (React + Vite)

No painel do Render:

1. Conecte sua conta GitHub

Escolha o repositório API_Petshop_2.0-1

2. Preencha assim:

Root Directory:

frontend


Build Command:

npm install && npm run build


Publish Directory:

dist


Pronto! Render vai gerar a URL do frontend automaticamente.

# 🛠️ Deploy do Backend (Node + Prisma)

Crie um novo Web Service no Render e configure assim:

Name:

API_Petshop_2.0


Repository:

https://github.com/4nabcosta/API_Petshop_2.0


Root Directory:

backend


Build Command:

npm install && npm run build


Start Command:

npx prisma migrate deploy && npm run dev

# 🔑 Variáveis de Ambiente

Crie a seguinte variável:

Key:

DATABASE_URL


Value:

postgresql://neondb_owner:npg_Ph68YfMnJUZe@ep-crimson-water-ac6ob5b8-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require


Este projeto é livre para uso educacional e aprimoramento.
