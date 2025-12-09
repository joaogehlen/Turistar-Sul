# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-12-09

### ✨ Adicionado
- Sistema de autenticação com JWT
- Sistema de gerenciamento de usuários com múltiplos roles (Admin, Pontos Turísticos, Restaurantes, Hospedagens, Prefeitura)
- CRUD completo para:
  - Pontos turísticos
  - Restaurantes
  - Hospedagens
- Sistema de aprovação em múltiplas camadas
- Integração automática com Notion para backup e relatórios
- Dashboard com métricas e analytics
- Documentação completa da API com Swagger
- Containerização com Docker e Docker Compose
- Sistema de relatórios por cidade
- Guards e decorators para autorização
- Validação de dados com class-validator
- ORM Prisma com PostgreSQL

### 🔒 Segurança
- Autenticação JWT segura
- Hash de senhas com bcrypt
- Proteção de rotas com guards
- CORS configurado
- Validação de inputs

### 📚 Documentação
- README.md completo
- Guia de início rápido
- Documentação da API
- Guia de estrutura do projeto
- Guia de integração com Notion
- Guia de testes
- Templates de issues e PRs
- Política de segurança
- Guia de contribuição

### 🛠️ Infraestrutura
- Docker Compose para orquestração
- PostgreSQL como banco de dados
- Prisma para migrations e seeding
- Script de setup automatizado

---

## Tipos de Mudanças

- ✨ `Adicionado` - Novas funcionalidades
- 🔄 `Modificado` - Mudanças em funcionalidades existentes
- ⚠️ `Descontinuado` - Funcionalidades que serão removidas
- 🗑️ `Removido` - Funcionalidades removidas
- 🐛 `Corrigido` - Correções de bugs
- 🔒 `Segurança` - Correções de vulnerabilidades
