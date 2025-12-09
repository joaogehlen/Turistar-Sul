# 🚀 Guia de Início Rápido

## Instalação Automática

Execute o script de setup:

```powershell
.\setup.ps1
```

Este script irá:
- ✅ Instalar dependências do backend e frontend
- ✅ Copiar arquivos de ambiente
- ✅ Configurar banco de dados
- ✅ Popular dados iniciais

## Instalação Manual

### 1. Backend

```powershell
cd backend
Copy-Item .env.example .env
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 2. Frontend

```powershell
cd frontend
Copy-Item .env.example .env.local
npm install
```

## Executar o Projeto

### Terminal 1 - Backend
```powershell
cd backend
npm run start:dev
```

### Terminal 2 - Frontend
```powershell
cd frontend
npm run dev
```

## Acessos

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000/api/v1
- **Swagger Docs**: http://localhost:3000/api

## Credenciais Padrão

| Role | Email | Senha |
|------|-------|-------|
| Admin | admin@turistarsul.com | Admin@123 |
| Prefeitura | prefeitura@gramado.rs.gov.br | Admin@123 |
| Ponto Turístico | contato@miniaturasgaucho.com.br | Admin@123 |
| Restaurante | contato@borattogastro.com.br | Admin@123 |
| Hospedagem | reservas@serraaul.com.br | Admin@123 |

## Estrutura de Permissões

### 🔴 ADMIN
- Controle total do sistema
- Aprovar/rejeitar cadastros
- Gerenciar todos os usuários
- Visualizar todos os relatórios
- Sincronizar com Notion

### 🏛️ PREFEITURA
- Visualizar relatórios da própria cidade
- Gerar relatórios estatísticos
- Consultar estabelecimentos aprovados

### 📍 TOURIST_POINT
- Cadastrar pontos turísticos (aguarda aprovação)
- Editar próprios pontos
- Visualizar estatísticas dos próprios pontos

### 🍽️ RESTAURANT
- Cadastrar restaurantes (aguarda aprovação)
- Editar próprios restaurantes
- Visualizar estatísticas dos próprios restaurantes

### 🏨 ACCOMMODATION
- Cadastrar hospedagens (aguarda aprovação)
- Editar próprias hospedagens
- Visualizar estatísticas das próprias hospedagens

## Fluxo de Aprovação

1. Parceiro cadastra estabelecimento
2. Sistema cria solicitação PENDING
3. Admin revisa e aprova/rejeita
4. Se aprovado: estabelecimento fica ACTIVE
5. Se rejeitado: estabelecimento fica INACTIVE

## Endpoints Principais

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Registro

### Pontos Turísticos
- `GET /tourist-points` - Listar (público)
- `POST /tourist-points` - Criar (requer auth)
- `GET /tourist-points/my-points` - Meus pontos

### Restaurantes
- `GET /restaurants` - Listar (público)
- `POST /restaurants` - Criar (requer auth)
- `GET /restaurants/my-restaurants` - Meus restaurantes

### Hospedagens
- `GET /accommodations` - Listar (público)
- `POST /accommodations` - Criar (requer auth)
- `GET /accommodations/my-accommodations` - Minhas hospedagens

### Aprovações (Admin)
- `GET /approvals/pending` - Listar pendentes
- `PATCH /approvals/:id/approve` - Aprovar
- `PATCH /approvals/:id/reject` - Rejeitar

### Relatórios
- `GET /reports/admin-stats` - Estatísticas gerais (Admin)
- `GET /reports/city-stats?city=Gramado` - Por cidade (Prefeitura/Admin)
- `POST /reports/generate` - Gerar e salvar relatório

### Notion
- `POST /notion/sync-report/:reportId` - Sincronizar com Notion

## Configuração do Notion

1. Crie uma integração no Notion: https://www.notion.so/my-integrations
2. Crie um database no Notion
3. Compartilhe o database com a integração
4. Atualize as variáveis no `.env`:

```env
NOTION_TOKEN="secret_YOUR_INTEGRATION_TOKEN"
NOTION_DATABASE_ID="your_database_id"
```

## Troubleshooting

### Erro de conexão com banco
```powershell
# Verifique se o PostgreSQL está rodando
# Ou use Docker: docker-compose up -d postgres
```

### Porta já em uso
```powershell
# Backend (porta 3000)
PORT=3005 npm run start:dev

# Frontend (porta 3001)
npm run dev -- -p 3002
```

## Próximos Passos

- [ ] Upload de imagens
- [ ] Sistema de favoritos
- [ ] Avaliações e comentários
- [ ] Filtros avançados
- [ ] Busca por localização
- [ ] Dashboard completo
