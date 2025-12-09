<div align="center">

# 🌴 Turistar Sul

### Sistema de Gestão Turística Inteligente

[![CI/CD Pipeline](https://github.com/joaogehlen/Turistar-Sul/actions/workflows/ci.yml/badge.svg)](https://github.com/joaogehlen/Turistar-Sul/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/NestJS-10.3-E0234E?logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

<p align="center">
  <strong>Plataforma completa para gestão de pontos turísticos, restaurantes e hospedagens com sistema de aprovação em múltiplas camadas e integração automática com Notion para relatórios.</strong>
</p>

[Instalação](#-instalação) •
[Funcionalidades](#-funcionalidades) •
[Tecnologias](#-stack-tecnológica) •
[Documentação](#-documentação) •
[FAQ](#-perguntas-frequentes) •
[Licença](#-licença)

</div>

---

## ✨ Destaques

- 🔐 **Sistema de Autenticação Robusto** com JWT e controle de acesso baseado em roles
- ✅ **Workflow de Aprovação** para moderação de conteúdo
- 🔄 **Sincronização Automática** com Notion para backup e relatórios
- 📊 **Dashboard Analítico** com métricas em tempo real
- 🐳 **Deploy Simplificado** com Docker e Docker Compose
- 📱 **Interface Responsiva** construída com Next.js e Tailwind CSS
- 🔍 **API RESTful** documentada com Swagger/OpenAPI

## 📋 Funcionalidades

### 🔐 Sistema de Roles
- **Admin**: Controle total, aprovações, relatórios gerais
- **Pontos Turísticos**: Gerencia seus pontos turísticos
- **Restaurantes**: Gerencia seus restaurantes
- **Hospedagens**: Gerencia suas hospedagens
- **Prefeitura**: Visualiza relatórios da cidade

### ✅ Sistema de Aprovação
- Cadastro de entidades passa por aprovação do admin
- Workflow: Pendente → Aprovado/Rejeitado
- **Sincronização automática com Notion** quando aprovado
- Notificações de status

### 📊 Relatórios
- Estatísticas por cidade
- Métricas de visualizações e favoritos
- **Exportação automática para Notion**
- Integração completa com Notion API
- Dashboard para cada role

## 🛠️ Stack Tecnológica

<table>
<tr>
<td width="50%">

### Backend
- ⚡ **NestJS** - Framework Node.js progressivo
- 🗄️ **Prisma ORM** - Type-safe database client
- 🔐 **Passport JWT** - Autenticação segura
- 📝 **Swagger** - Documentação automática da API
- 🔔 **Notion API** - Integração e sincronização

</td>
<td width="50%">

### Frontend
- ⚛️ **Next.js 14** - React framework com SSR
- 🎨 **Tailwind CSS** - Utility-first CSS
- 🧩 **shadcn/ui** - Componentes acessíveis
- 📦 **Zustand** - State management
- 🎯 **TypeScript** - Type safety

</td>
</tr>
<tr>
<td colspan="2">

### Infraestrutura & DevOps
- 🐘 **PostgreSQL** - Banco de dados relacional
- 🐳 **Docker & Docker Compose** - Containerização
- 🔄 **GitHub Actions** - CI/CD (ready)

</td>
</tr>
</table>

## 📁 Estrutura do Projeto

```
turistar-sul/
├── 📁 backend/                      # API NestJS + Prisma
│   ├── 📁 src/
│   │   ├── 🔐 auth/                # Autenticação JWT
│   │   ├── 👥 users/               # Gestão de usuários
│   │   ├── 🏖️ tourist-points/      # Pontos turísticos
│   │   ├── 🍽️ restaurants/         # Restaurantes
│   │   ├── 🏨 accommodations/      # Hospedagens
│   │   ├── ✅ approvals/           # Sistema de aprovação
│   │   ├── 📊 reports/             # Relatórios e analytics
│   │   ├── 🔔 notion/              # Integração Notion
│   │   └── 🛡️ common/              # Guards, decorators, utils
│   └── 📁 prisma/
│       └── 📄 schema.prisma        # Schema do banco
│
├── 📁 frontend/                     # Next.js 14 App
│   └── 📁 src/
│       ├── 📱 app/                 # Pages e layouts (App Router)
│       ├── 🧩 components/          # Componentes reutilizáveis
│       ├── 🔧 lib/                 # Utilitários e helpers
│       └── 📦 store/               # State management (Zustand)
│
├── 📁 .github/                      # GitHub configs
│   ├── 📁 workflows/               # CI/CD pipelines
│   └── 📁 ISSUE_TEMPLATE/          # Templates de issues
│
├── 🐳 docker-compose.yml            # Orquestração Docker
├── 📖 README.md                     # Este arquivo
└── 📚 docs/                         # Documentação adicional
```

> 💡 **Dica**: Veja a [estrutura completa](PROJECT_STRUCTURE.md) para mais detalhes sobre cada módulo.

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ e npm
- PostgreSQL 15+ (ou Docker)
- Git

### Opção 1: Instalação Rápida com Docker 🐳 (Recomendado)

```powershell
# Clone o repositório
git clone https://github.com/joaogehlen/Turistar-Sul.git
cd Turistar-Sul

# Configure as variáveis de ambiente
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env.local

# Inicie todos os serviços
docker-compose up -d

# Execute as migrations e seed
docker-compose exec backend npm run prisma:generate
docker-compose exec backend npm run db:push
docker-compose exec backend npm run db:seed
```

**🎉 Pronto!** Acesse:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api

### Opção 2: Instalação Manual

<details>
<summary>Clique para expandir</summary>

#### 1. Clone e instale dependências

```powershell
git clone https://github.com/joaogehlen/Turistar-Sul.git
cd Turistar-Sul

# Backend
cd backend
Copy-Item .env.example .env
npm install

# Frontend
cd ../frontend
Copy-Item .env.example .env.local
npm install
```

#### 2. Configure o banco de dados

```powershell
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed
```

#### 3. Inicie os serviços

```powershell
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

</details>

## 🔑 Credenciais de Acesso

Após executar o seed do banco de dados:

| Perfil | Email | Senha |
|--------|-------|-------|
| **Admin** | admin@turistarsul.com | Admin@123 |

### 🌐 Endpoints

| Serviço | URL | Descrição |
|---------|-----|-----------|
| 🖥️ **Frontend** | http://localhost:3001 | Interface do usuário |
| 🔌 **Backend API** | http://localhost:3000 | API RESTful |
| 📚 **Swagger Docs** | http://localhost:3000/api | Documentação interativa |
| 🗄️ **Prisma Studio** | http://localhost:5555 | Gerenciador de DB (dev) |

## 📝 Variáveis de Ambiente

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/turistarsul"
JWT_SECRET="seu-secret-jwt"
JWT_EXPIRES_IN="7d"

# Notion (Opcional - veja NOTION_SETUP.md)
NOTION_TOKEN="secret_seu-token-notion"
NOTION_DATABASE_ID="id-do-database"
```

**📝 Para configurar Notion:** Veja o guia completo em [NOTION_SETUP.md](NOTION_SETUP.md)

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📸 Screenshots

> Veja exemplos visuais da aplicação em [SCREENSHOTS.md](SCREENSHOTS.md)

<details>
<summary>📱 Pré-visualização</summary>

**Dashboard Administrativo**
> Interface intuitiva com métricas em tempo real e gráficos interativos

**Sistema de Aprovação**
> Workflow simples para revisar e aprovar/rejeitar cadastros

**Integração Notion**
> Sincronização automática de dados aprovados para backup e relatórios

</details>

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [📖 API Docs](API_DOCS.md) | Documentação completa da API REST |
| [🔌 API Examples](API_EXAMPLES.md) | Exemplos práticos de uso da API |
| [🚀 Quick Start](QUICK_START.md) | Guia de início rápido |
| [📂 Estrutura](PROJECT_STRUCTURE.md) | Arquitetura do projeto |
| [🧪 Testing Guide](TESTING_GUIDE.md) | Guia de testes |
| [🔔 Notion Setup](NOTION_SETUP.md) | Configuração da integração Notion |
| [🗺️ Navigation](NAVIGATION_GUIDE.md) | Guia de navegação |
| [🤝 Contributing](CONTRIBUTING.md) | Como contribuir |
| [🔒 Security](SECURITY.md) | Política de segurança |
| [📝 Changelog](CHANGELOG.md) | Histórico de mudanças |

## 🎯 Roadmap

### ✅ Concluído
- Sistema de autenticação com JWT
- CRUD completo de entidades
- Sistema de aprovação multi-role
- Integração automática com Notion
- Relatórios e analytics básicos
- Documentação da API com Swagger
- Containerização com Docker

### 🚧 Em Desenvolvimento
- [ ] Upload e otimização de imagens
- [ ] Sistema de favoritos por usuário
- [ ] Sistema de avaliações e comentários
- [ ] Filtros avançados e busca

### 🔮 Futuro
- [ ] Notificações em tempo real
- [ ] Sistema de assinaturas/planos
- [ ] API GraphQL
- [ ] App mobile (React Native)
- [ ] Integração com redes sociais
- [ ] Analytics avançado com BI

## ❓ Perguntas Frequentes

Confira nosso [FAQ completo](FAQ.md) com respostas para as dúvidas mais comuns sobre:
- 🚀 Instalação e configuração
- 🔐 Autenticação e permissões
- ⚙️ Funcionalidades do sistema
- 🔔 Integração com Notion
- 🔧 Troubleshooting e soluções de problemas

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

Veja nosso [guia de contribuição](CONTRIBUTING.md) para mais detalhes.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**João Gehlen**

- GitHub: [@joaogehlen](https://github.com/joaogehlen)
- LinkedIn: [João Gehlen](https://linkedin.com/in/joaogehlen)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Made with ❤️ by [João Gehlen](https://github.com/joaogehlen)

</div>
