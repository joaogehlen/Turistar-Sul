# 📂 Estrutura do Projeto Turistar Sul

```
turistar-sul/
│
├── 📄 README.md                    # Documentação principal
├── 📄 QUICK_START.md               # Guia de início rápido
├── 📄 API_DOCS.md                  # Documentação completa da API
├── 📄 LICENSE                      # Licença MIT
├── 📄 .gitignore                   # Arquivos ignorados pelo Git
├── 📄 docker-compose.yml           # Orquestração Docker
├── 📜 setup.ps1                    # Script de instalação automática
│
├── 📁 backend/                     # Backend NestJS
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 nest-cli.json
│   ├── 📄 Dockerfile
│   ├── 📄 .env.example
│   │
│   ├── 📁 prisma/
│   │   ├── schema.prisma           # Schema do banco de dados
│   │   └── seed.ts                 # Dados iniciais
│   │
│   └── 📁 src/
│       ├── main.ts                 # Entry point
│       ├── app.module.ts           # Módulo principal
│       │
│       ├── 📁 prisma/              # Módulo Prisma
│       │   ├── prisma.service.ts
│       │   └── prisma.module.ts
│       │
│       ├── 📁 common/              # Recursos compartilhados
│       │   ├── 📁 decorators/
│       │   │   ├── roles.decorator.ts
│       │   │   ├── current-user.decorator.ts
│       │   │   └── public.decorator.ts
│       │   └── 📁 guards/
│       │       ├── jwt-auth.guard.ts
│       │       └── roles.guard.ts
│       │
│       ├── 📁 auth/                # Autenticação
│       │   ├── auth.module.ts
│       │   ├── auth.service.ts
│       │   ├── auth.controller.ts
│       │   ├── 📁 dto/
│       │   │   ├── login.dto.ts
│       │   │   └── register.dto.ts
│       │   └── 📁 strategies/
│       │       └── jwt.strategy.ts
│       │
│       ├── 📁 users/               # Gestão de usuários
│       │   ├── users.module.ts
│       │   ├── users.service.ts
│       │   └── users.controller.ts
│       │
│       ├── 📁 tourist-points/      # Pontos Turísticos
│       │   ├── tourist-points.module.ts
│       │   ├── tourist-points.service.ts
│       │   ├── tourist-points.controller.ts
│       │   └── 📁 dto/
│       │       └── tourist-point.dto.ts
│       │
│       ├── 📁 restaurants/         # Restaurantes
│       │   ├── restaurants.module.ts
│       │   ├── restaurants.service.ts
│       │   └── restaurants.controller.ts
│       │
│       ├── 📁 accommodations/      # Hospedagens
│       │   ├── accommodations.module.ts
│       │   ├── accommodations.service.ts
│       │   └── accommodations.controller.ts
│       │
│       ├── 📁 approvals/           # Sistema de Aprovação
│       │   ├── approvals.module.ts
│       │   ├── approvals.service.ts
│       │   ├── approvals.controller.ts
│       │   └── 📁 dto/
│       │       └── reject-request.dto.ts
│       │
│       ├── 📁 reports/             # Relatórios
│       │   ├── reports.module.ts
│       │   ├── reports.service.ts
│       │   └── reports.controller.ts
│       │
│       └── 📁 notion/              # Integração Notion
│           ├── notion.module.ts
│           ├── notion.service.ts
│           └── notion.controller.ts
│
└── 📁 frontend/                    # Frontend Next.js 14
    ├── 📄 package.json
    ├── 📄 tsconfig.json
    ├── 📄 next.config.js
    ├── 📄 tailwind.config.js
    ├── 📄 postcss.config.js
    ├── 📄 Dockerfile
    ├── 📄 .env.example
    │
    └── 📁 src/
        ├── 📁 app/                 # App Router Next.js 14
        │   ├── layout.tsx          # Layout principal
        │   ├── page.tsx            # Página inicial
        │   └── globals.css         # Estilos globais
        │
        ├── 📁 lib/                 # Utilitários
        │   └── api.ts              # Cliente Axios
        │
        └── 📁 store/               # Estado global
            └── auth.ts             # Store de autenticação (Zustand)
```

## 🎯 Principais Features Implementadas

### ✅ Backend (NestJS)

1. **Autenticação JWT**
   - Login e registro
   - Guards para proteção de rotas
   - Decorators personalizados (@CurrentUser, @Roles, @Public)

2. **Sistema de Roles**
   - ADMIN: Controle total
   - TOURIST_POINT: Gerencia pontos turísticos
   - RESTAURANT: Gerencia restaurantes
   - ACCOMMODATION: Gerencia hospedagens
   - PREFECTURE: Visualiza relatórios

3. **Sistema de Aprovação**
   - Fluxo: Cadastro → Pendente → Aprovado/Rejeitado
   - Admin pode aprovar/rejeitar com motivo
   - Tracking completo de status

4. **CRUD Completo**
   - Pontos Turísticos
   - Restaurantes
   - Hospedagens
   - Com validações e permissões

5. **Relatórios**
   - Estatísticas gerais (Admin)
   - Estatísticas por cidade (Prefeitura)
   - Histórico de relatórios

6. **Integração Notion**
   - Sincronização de relatórios
   - Tracking de sincronização

7. **Banco de Dados**
   - Prisma ORM
   - PostgreSQL
   - Schema simplificado e eficiente
   - Seed com dados de exemplo

### ✅ Frontend (Next.js 14)

1. **Estrutura Base**
   - Next.js 14 com App Router
   - TypeScript
   - Tailwind CSS
   - Página inicial responsiva

2. **Autenticação**
   - Store Zustand para gerenciar estado
   - Cliente Axios configurado

3. **Pronto para Expansão**
   - Estrutura modular
   - Componentes reutilizáveis
   - Rotas organizadas

## 🔧 Tecnologias Utilizadas

### Backend
- **NestJS 10** - Framework Node.js
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **Swagger** - Documentação automática
- **Notion SDK** - Integração

### Frontend
- **Next.js 14** - React Framework
- **TypeScript** - Tipagem
- **Tailwind CSS** - Estilização
- **Zustand** - State Management
- **Axios** - HTTP Client

### DevOps
- **Docker & Docker Compose** - Containerização
- **ESLint & Prettier** - Code Quality

## 📊 Modelo de Dados

### User
- Credenciais e perfil
- Role-based
- Relacionamentos com entidades

### TouristPoint / Restaurant / Accommodation
- Dados básicos
- Localização (endereço, lat/lng)
- Proprietário (User)
- Status de aprovação

### RegistrationRequest
- Sistema de aprovação
- Tracking de mudanças
- Histórico de decisões

### Report
- Relatórios salvos
- Dados em JSON
- Filtros por cidade/tipo

### NotionSync
- Tracking de sincronização
- Relacionamento com entidades

## 🚀 Próximas Features

- [ ] Upload de imagens (Cloudinary)
- [ ] Sistema de favoritos
- [ ] Avaliações e comentários
- [ ] Busca avançada com filtros
- [ ] Mapa interativo
- [ ] Dashboard completo no frontend
- [ ] Notificações em tempo real
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Sistema de assinaturas
- [ ] QR Code para avaliações
