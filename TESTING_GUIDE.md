# 🧪 Como Testar o Sistema Turistar Sul

## 📋 Pré-requisitos

1. PostgreSQL rodando (ou Docker)
2. Backend iniciado: `cd backend && npm run start:dev`
3. Dados populados: `npx prisma db seed`

## 🎯 Cenários de Teste

### 1️⃣ Login como Admin

```bash
# Windows PowerShell
$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    email = "admin@turistarsul.com"
    password = "Admin@123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method Post -Headers $headers -Body $body
$token = $response.access_token
Write-Host "Token: $token"
```

**Resultado esperado:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@turistarsul.com",
    "name": "Administrador",
    "role": "ADMIN"
  }
}
```

### 2️⃣ Criar Ponto Turístico (como parceiro)

```bash
# 1. Login como parceiro
$body = @{
    email = "contato@miniaturasgaucho.com.br"
    password = "Admin@123"
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
$token = $response.access_token

# 2. Criar ponto turístico
$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $token"
}
$body = @{
    name = "Lago Negro Test"
    description = "Lago artificial belíssimo"
    address = "Av. das Hortênsias"
    city = "Gramado"
    state = "RS"
    category = "Natureza"
    openingHours = "24 horas"
    entryFee = "Grátis"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/tourist-points" -Method Post -Headers $headers -Body $body
```

**Resultado esperado:**
```json
{
  "message": "Ponto turístico criado e aguardando aprovação",
  "point": {
    "id": "uuid",
    "name": "Lago Negro Test",
    "status": "PENDING_APPROVAL",
    ...
  }
}
```

### 3️⃣ Listar Solicitações Pendentes (Admin)

```bash
# Login como admin primeiro
$body = @{
    email = "admin@turistarsul.com"
    password = "Admin@123"
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
$token = $response.access_token

# Listar pendentes
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/approvals/pending" -Method Get -Headers $headers
```

### 4️⃣ Aprovar Solicitação (Admin)

```bash
# Usando o ID da solicitação
$requestId = "uuid-da-solicitacao"
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/approvals/$requestId/approve" -Method Patch -Headers $headers
```

### 5️⃣ Listar Pontos Públicos (Sem autenticação)

```bash
# Buscar todos
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/tourist-points" -Method Get

# Buscar por cidade
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/tourist-points?city=Gramado" -Method Get
```

### 6️⃣ Gerar Relatório (Prefeitura)

```bash
# Login como prefeitura
$body = @{
    email = "prefeitura@gramado.rs.gov.br"
    password = "Admin@123"
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
$token = $response.access_token

# Buscar estatísticas da cidade
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/reports/city-stats?city=Gramado" -Method Get -Headers $headers
```

### 7️⃣ Sincronizar com Notion (Admin)

```bash
# Primeiro, configure o .env com suas credenciais Notion
# NOTION_TOKEN e NOTION_DATABASE_ID

# Login como admin
$body = @{
    email = "admin@turistarsul.com"
    password = "Admin@123"
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
$token = $response.access_token

# Sincronizar relatório
$reportId = "uuid-do-relatorio"
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/notion/sync-report/$reportId" -Method Post -Headers $headers
```

## 🎨 Teste no Swagger UI

1. Acesse: http://localhost:3000/api
2. Clique em "Authorize" no canto superior direito
3. Faça login em `/auth/login` para obter o token
4. Cole o token no campo de autorização
5. Teste qualquer endpoint visualmente

## 🔍 Verificar Dados no Prisma Studio

```bash
cd backend
npx prisma studio
```

Abre interface visual em http://localhost:5555 para ver todos os dados do banco.

## 📊 Fluxo Completo de Teste

### Cenário: Parceiro Cadastra Restaurante

1. **Registro do Parceiro**
```bash
$body = @{
    email = "novo@restaurante.com"
    password = "Senha@123"
    name = "Restaurante Novo"
    phone = "(51) 99999-9999"
    role = "RESTAURANT"
    cnpj = "12.345.678/0001-99"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/register" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
```

2. **Login do Parceiro**
```bash
$body = @{
    email = "novo@restaurante.com"
    password = "Senha@123"
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
$token = $response.access_token
```

3. **Cadastrar Restaurante**
```bash
$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $token"
}
$body = @{
    name = "Restaurante Teste"
    description = "Comida caseira"
    address = "Rua Teste, 123"
    city = "Gramado"
    state = "RS"
    cuisine = "Brasileira"
    priceRange = "$$"
    openingHours = "11:00 - 22:00"
    phone = "(51) 99999-9999"
} | ConvertTo-Json
$restaurant = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/restaurants" -Method Post -Headers $headers -Body $body
$restaurantId = $restaurant.restaurant.id
```

4. **Admin Aprova**
```bash
# Login admin
$body = @{
    email = "admin@turistarsul.com"
    password = "Admin@123"
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
$adminToken = $response.access_token

# Buscar solicitação pendente
$headers = @{ "Authorization" = "Bearer $adminToken" }
$pending = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/approvals/pending" -Method Get -Headers $headers
$requestId = $pending[0].id

# Aprovar
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/approvals/$requestId/approve" -Method Patch -Headers $headers
```

5. **Verificar Restaurante Ativo**
```bash
# Buscar publicamente (sem token)
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/restaurants" -Method Get
```

## ⚠️ Troubleshooting

### Erro: "Unauthorized"
- Verifique se o token está correto
- Token expira em 7 dias (configurável no JWT_EXPIRES_IN)

### Erro: "Forbidden"
- Usuário não tem permissão (role incorreta)
- Verifique se está usando o usuário correto

### Erro: "Not Found"
- Endpoint incorreto
- ID inválido

### Erro de Conexão
- Backend não está rodando
- Porta incorreta (deve ser 3000)

## 📝 Logs Úteis

```bash
# Backend logs em tempo real
cd backend
npm run start:dev

# Ver queries SQL (ative no Prisma)
# Adicione em schema.prisma: log = ["query"]
```

## ✅ Checklist de Testes

- [ ] Login admin funciona
- [ ] Login parceiro funciona
- [ ] Registro de novo parceiro
- [ ] Criar ponto turístico (pendente)
- [ ] Criar restaurante (pendente)
- [ ] Criar hospedagem (pendente)
- [ ] Admin lista pendentes
- [ ] Admin aprova solicitação
- [ ] Admin rejeita solicitação
- [ ] Listar entidades públicas
- [ ] Buscar por cidade
- [ ] Editar própria entidade
- [ ] Relatório admin
- [ ] Relatório prefeitura
- [ ] Perfil do usuário
- [ ] Sincronizar com Notion (se configurado)
