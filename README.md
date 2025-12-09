# 🌴 Turistar Sul - Sistema de Gestão Turística

Sistema completo para gestão de pontos turísticos, restaurantes e hospedagens com sistema de aprovação e relatórios integrados ao Notion.

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

## 🚀 Tecnologias

### Backend
- **NestJS** - Framework Node.js
- **Prisma** - ORM para PostgreSQL
- **JWT** - Autenticação
- **Notion API** - Integração de relatórios

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes

### Infraestrutura
- **PostgreSQL** - Banco de dados
- **Docker** - Containerização

## 📁 Estrutura do Projeto

```
turistar-sul/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Autenticação e autorização
│   │   ├── users/          # Gestão de usuários
│   │   ├── tourist-points/ # Pontos turísticos
│   │   ├── restaurants/    # Restaurantes
│   │   ├── accommodations/ # Hospedagens
│   │   ├── approvals/      # Sistema de aprovação
│   │   ├── reports/        # Relatórios e analytics
│   │   ├── notion/         # Integração Notion
│   │   └── common/         # Guards, decorators, utils
│   └── prisma/
│       └── schema.prisma
│
├── frontend/               # Next.js App
│   └── src/
│       ├── app/           # Pages e layouts
│       ├── components/    # Componentes reutilizáveis
│       └── services/      # API calls
│
└── docker-compose.yml     # Orquestração containers
```

## ⚙️ Instalação

### 1. Clonar e configurar ambiente

```powershell
# Navegar até a pasta do projeto
cd "C:\Users\joao.gehlen\Desktop\projeto novo"

# Backend
cd backend
Copy-Item .env.example .env
npm install

# Frontend
cd ../frontend
Copy-Item .env.example .env.local
npm install
```

### 2. Configurar banco de dados

```powershell
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 3. Rodar o projeto

**Com Docker:**
```powershell
docker-compose up -d
```

**Sem Docker:**
```powershell
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🔑 Acesso Inicial

Após o seed do banco:

- **Admin**: admin@turistarsul.com / Admin@123
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:3001
- **Swagger Docs**: http://localhost:3000/api

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

## 🎯 Roadmap

- [x] Estrutura base
- [x] Sistema de autenticação
- [x] Sistema de aprovação
- [x] CRUD entidades
- [x] Relatórios básicos
- [x] **Integração Notion (sincronização automática)**
- [ ] Upload de imagens
- [ ] Sistema de favoritos
- [ ] Avaliações
- [ ] Filtros avançados
- [ ] Sistema de assinaturas

## 📄 Licença

MIT License - veja [LICENSE](LICENSE)
