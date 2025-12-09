# 📚 Turistar Sul - Índice de Documentação

> Sistema completo de gestão turística com autenticação multi-role, sistema de aprovação e relatórios integrados ao Notion.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/joaogehlen/Turistar-Sul)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🚀 Começar Agora

**Primeira vez aqui?** Siga este caminho:

```
1️⃣ Visão Geral:  README.md           ← COMECE AQUI
2️⃣ Instalação:   QUICK_START.md      ← Instalar projeto
3️⃣ Uso:          API_EXAMPLES.md     ← Usar a API
4️⃣ Deploy:       DEPLOYMENT.md       ← Publicar online
```

---

## 📖 Documentação por Categoria

### 🎯 Essenciais (Leia Primeiro)

| Documento | Descrição | Tempo | Prioridade |
|-----------|-----------|-------|------------|
| **[README.md](README.md)** | 📄 Visão geral e instalação | 5 min | ⭐⭐⭐⭐⭐ |
| **[QUICK_START.md](QUICK_START.md)** | ⚡ Guia de início rápido | 5 min | ⭐⭐⭐⭐⭐ |
| **[FAQ.md](FAQ.md)** | ❓ Perguntas frequentes | 3 min | ⭐⭐⭐⭐ |
| **[NAVIGATION_GUIDE.md](NAVIGATION_GUIDE.md)** | 🗺️ Como navegar no projeto | 3 min | ⭐⭐⭐ |

### 🔌 API & Desenvolvimento

| Documento | Descrição | Para quem? |
|-----------|-----------|------------|
| **[API_DOCS.md](API_DOCS.md)** | 🔌 Documentação completa da API | Desenvolvedores |
| **[API_EXAMPLES.md](API_EXAMPLES.md)** | 💡 Exemplos práticos de uso | Desenvolvedores |
| **[TESTING_GUIDE.md](TESTING_GUIDE.md)** | 🧪 Guia de testes | Desenvolvedores |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | 🏗️ Arquitetura e tecnologias | Arquitetos |

### 🏗️ Estrutura & Arquitetura

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** | 📂 Estrutura de pastas | Entender organização |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | 🎯 Padrões e decisões técnicas | Design de sistema |
| **[SUMMARY.md](SUMMARY.md)** | 📋 Resumo executivo | Visão executiva |

### 🔔 Integrações

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[NOTION_SETUP.md](NOTION_SETUP.md)** | 🔔 Configurar integração | Setup inicial |
| **[NOTION_INTEGRATION.md](NOTION_INTEGRATION.md)** | ✨ Como funciona | Entender sincronização |

### 🚀 Deploy & Produção

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | 🚀 Guias de deploy | Publicar online |
| **[SECURITY.md](SECURITY.md)** | 🔒 Segurança e vulnerabilidades | Sempre |

### 🤝 Comunidade

| Documento | Descrição | Para quem? |
|-----------|-----------|------------|
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | 🤝 Como contribuir | Contribuidores |
| **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** | 📜 Código de conduta | Todos |
| **[CHANGELOG.md](CHANGELOG.md)** | 📝 Histórico de mudanças | Todos |
| **[LICENSE](LICENSE)** | ⚖️ Licença MIT | Legal |

### 📸 Recursos Visuais

| Documento | Descrição |
|-----------|-----------|
| **[SCREENSHOTS.md](SCREENSHOTS.md)** | 📸 Capturas de tela da aplicação |

### 🛠️ Arquivos Técnicos

| Arquivo | Descrição | Localização |
|---------|-----------|-------------|
| `schema.prisma` | 💾 Schema do banco de dados | `backend/prisma/` |
| `app.module.ts` | 📦 Módulo principal | `backend/src/` |
| `docker-compose.yml` | 🐳 Configuração Docker | Raiz |
| `setup.ps1` | 🔧 Script de instalação | Raiz |
| `package.json` | 📦 Dependências | `backend/` e `frontend/` |

---

## 🎯 Objetivos do Projeto

✅ **Sistema de Gestão Turística** completo e escalável
✅ **5 Roles** com permissões específicas
✅ **Sistema de Aprovação** de cadastros
✅ **Relatórios** com integração Notion
✅ **API RESTful** documentada
✅ **Arquitetura Moderna** (NestJS + Next.js)

---

## 🏗️ Estrutura

```
turistar-sul/
│
├── 📁 backend/              → API NestJS + PostgreSQL
│   ├── src/
│   │   ├── auth/           → Autenticação JWT
│   │   ├── approvals/      → Sistema de aprovação
│   │   ├── reports/        → Relatórios
│   │   └── notion/         → Integração Notion
│   └── prisma/
│       ├── schema.prisma   → Modelo de dados
│       └── seed.ts         → Dados iniciais
│
├── 📁 frontend/            → Next.js 14 + Tailwind
│   └── src/
│       ├── app/            → Páginas
│       ├── lib/            → Utilitários
│       └── store/          → Estado global
│
└── 📄 Documentação completa (8 arquivos)
```

---

## ⚡ Instalação Rápida

```powershell
# 1. Navegue até a pasta
cd "C:\Users\joao.gehlen\Desktop\projeto novo"

# 2. Execute o setup automático
.\setup.ps1

# 3. Rode o backend (Terminal 1)
cd backend
npm run start:dev

# 4. Rode o frontend (Terminal 2)
cd frontend
npm run dev
```

**Pronto!** Acesse:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api/v1
- Swagger: http://localhost:3000/api

---

## 🔑 Acesso Padrão

```
Admin:       admin@turistarsul.com              | Admin@123
Prefeitura:  prefeitura@gramado.rs.gov.br       | Admin@123
Ponto:       contato@miniaturasgaucho.com.br    | Admin@123
Restaurante: contato@borattogastro.com.br       | Admin@123
Hospedagem:  reservas@serraaul.com.br           | Admin@123
```

---

## 🎓 Roteiro de Aprendizado

### Para Novatos

```
Dia 1: Setup e Exploração
├─ Instale o projeto (setup.ps1)
├─ Explore o Swagger UI
├─ Teste login com credenciais padrão
└─ Veja dados no Prisma Studio

Dia 2: Entenda a API
├─ Leia API_DOCS.md
├─ Teste endpoints no Swagger
├─ Crie um ponto turístico
└─ Aprove uma solicitação

Dia 3: Código
├─ Leia PROJECT_STRUCTURE.md
├─ Explore módulos no backend/src/
├─ Veja como funciona autenticação
└─ Entenda fluxo de aprovação
```

### Para Desenvolvedores

```
✅ Setup completo (10 min)
✅ Entenda arquitetura (15 min)
✅ Teste todos endpoints (20 min)
✅ Adicione novo campo (prática)
✅ Crie novo endpoint (prática)
```

---

## 🛠️ Tecnologias

| Layer | Tecnologia |
|-------|-----------|
| **Backend** | NestJS 10, Prisma, PostgreSQL, JWT, Swagger |
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, Zustand |
| **DevOps** | Docker, Docker Compose |
| **Integrações** | Notion API |

---

## 📊 Features Implementadas

### ✅ Autenticação
- Login JWT
- Registro de parceiros
- Guards por role
- Rotas protegidas

### ✅ Sistema de Aprovação
- Cadastros aguardam aprovação
- Admin aprova/rejeita
- Tracking de status
- Histórico completo

### ✅ CRUD Entidades
- Pontos Turísticos
- Restaurantes
- Hospedagens
- Listagem pública
- Filtros por cidade

### ✅ Relatórios
- Estatísticas gerais (Admin)
- Por cidade (Prefeitura)
- **🔥 Integração Notion (sincronização automática)**
- Histórico de relatórios
- Dashboard visual no Notion

### ✅ Permissões
- 5 roles funcionais
- Controle granular
- Validações no backend
- Guards customizados

---

## 🔍 Busca Rápida

### Como fazer...?

| Ação | Onde Encontrar |
|------|----------------|
| Instalar | `setup.ps1` ou `QUICK_START.md` |
| Testar API | `TESTING_GUIDE.md` + Swagger |
| Entender código | `PROJECT_STRUCTURE.md` |
| Ver endpoints | `API_DOCS.md` |
| Navegar docs | `NAVIGATION_GUIDE.md` |
| Visão geral | `SUMMARY.md` |
| Configurar Notion | `NOTION_SETUP.md` (integração automática) |
| Ver sincronia Notion | `NOTION_INTEGRATION.md` |
| Adicionar campo | `backend/prisma/schema.prisma` |
| Criar endpoint | Ver exemplo em `backend/src/tourist-points/` |

---

## 🎯 Próximos Passos

### Curto Prazo
- [ ] Testar todos os endpoints
- [ ] Configurar Notion (opcional)
- [ ] Expandir frontend
- [ ] Adicionar upload de imagens

### Médio Prazo
- [ ] Sistema de favoritos
- [ ] Avaliações e reviews
- [ ] Busca avançada
- [ ] Dashboard completo

### Longo Prazo
- [ ] Sistema de assinaturas
- [ ] QR Code para avaliações
- [ ] Newsletter
- [ ] App mobile

---

## 📞 Suporte

Dúvidas sobre:
- ✅ Instalação → `QUICK_START.md`
- ✅ Como usar API → `API_DOCS.md`
- ✅ Arquitetura → `PROJECT_STRUCTURE.md`
- ✅ Testes → `TESTING_GUIDE.md`
- ✅ Navegação → `NAVIGATION_GUIDE.md`

**Tudo documentado!** 📚

---

## ⭐ Destaques

```
✨ Código limpo e organizado
✨ TypeScript em todo projeto
✨ Documentação completa
✨ Pronto para produção
✨ Fácil de expandir
✨ Arquitetura escalável
```

---

## 🎉 Você tem em mãos:

✅ **Backend completo** (8 módulos, ~40 endpoints)
✅ **Frontend base** (Next.js 14 configurado)
✅ **Banco modelado** (7 tabelas + seed)
✅ **Autenticação JWT** (5 roles)
✅ **Sistema de aprovação** (workflow completo)
✅ **Relatórios** (Notion integrado)
✅ **Docker** (ambiente containerizado)
✅ **8 arquivos** de documentação
✅ **Scripts** de instalação
✅ **Dados de exemplo** (5 usuários, 6 entidades)

---

## 🚀 Comece Agora!

```powershell
# Cole no PowerShell:
cd "C:\Users\joao.gehlen\Desktop\projeto novo"
.\setup.ps1
```

**Boa sorte com seu projeto! 🌴**

---

*Última atualização: Dezembro 2024*
*Versão: 1.0.0*
*Licença: MIT*
