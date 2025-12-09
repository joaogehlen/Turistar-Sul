# 🚀 Exemplos de Uso da API

Este guia contém exemplos práticos de como usar a API do Turistar Sul.

## 📚 Índice

- [Autenticação](#autenticação)
- [Usuários](#usuários)
- [Pontos Turísticos](#pontos-turísticos)
- [Restaurantes](#restaurantes)
- [Hospedagens](#hospedagens)
- [Aprovações](#aprovações)
- [Relatórios](#relatórios)

## 🔐 Autenticação

### Registro de Novo Usuário

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "SenhaSegura@123",
  "name": "João Silva",
  "role": "TOURIST_POINT"
}
```

**Resposta:**
```json
{
  "id": "uuid",
  "email": "usuario@example.com",
  "name": "João Silva",
  "role": "TOURIST_POINT",
  "createdAt": "2024-12-09T10:00:00Z"
}
```

### Login

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "SenhaSegura@123"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "name": "João Silva",
    "role": "TOURIST_POINT"
  }
}
```

### Usando o Token

Para todas as requisições autenticadas, inclua o header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 👤 Usuários

### Listar Todos os Usuários (Admin apenas)

```bash
GET /api/v1/users
Authorization: Bearer {token}
```

### Obter Perfil Atual

```bash
GET /api/v1/users/me
Authorization: Bearer {token}
```

### Atualizar Perfil

```bash
PATCH /api/v1/users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "João Silva Atualizado",
  "phone": "+55 48 99999-9999"
}
```

## 🏖️ Pontos Turísticos

### Criar Ponto Turístico

```bash
POST /api/v1/tourist-points
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Praia do Rosa",
  "description": "Uma das praias mais bonitas do sul do Brasil",
  "city": "Imbituba",
  "state": "SC",
  "address": "Estrada Geral do Rosa, s/n",
  "category": "BEACH",
  "phone": "+55 48 3355-0000",
  "website": "https://praiadosara.com.br"
}
```

**Resposta:**
```json
{
  "id": "uuid",
  "name": "Praia do Rosa",
  "description": "Uma das praias mais bonitas do sul do Brasil",
  "city": "Imbituba",
  "state": "SC",
  "status": "PENDING",
  "userId": "uuid",
  "createdAt": "2024-12-09T10:30:00Z"
}
```

### Listar Pontos Turísticos

```bash
GET /api/v1/tourist-points?city=Imbituba&status=APPROVED
Authorization: Bearer {token}
```

**Query Parameters:**
- `city` (opcional): Filtrar por cidade
- `state` (opcional): Filtrar por estado
- `category` (opcional): Filtrar por categoria
- `status` (opcional): Filtrar por status (PENDING, APPROVED, REJECTED)
- `page` (opcional): Número da página (default: 1)
- `limit` (opcional): Itens por página (default: 10)

### Buscar Ponto Turístico por ID

```bash
GET /api/v1/tourist-points/{id}
Authorization: Bearer {token}
```

### Atualizar Ponto Turístico

```bash
PATCH /api/v1/tourist-points/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "description": "Descrição atualizada com mais detalhes",
  "phone": "+55 48 3355-1111"
}
```

### Deletar Ponto Turístico

```bash
DELETE /api/v1/tourist-points/{id}
Authorization: Bearer {token}
```

## 🍽️ Restaurantes

### Criar Restaurante

```bash
POST /api/v1/restaurants
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Restaurante Mar Aberto",
  "description": "Especializado em frutos do mar",
  "city": "Florianópolis",
  "state": "SC",
  "address": "Av. das Rendeiras, 123",
  "cuisine": "Frutos do Mar",
  "priceRange": "$$",
  "phone": "+55 48 3333-4444",
  "openingHours": "11:00 - 23:00"
}
```

### Listar Restaurantes

```bash
GET /api/v1/restaurants?city=Florianópolis&cuisine=Frutos do Mar
Authorization: Bearer {token}
```

## 🏨 Hospedagens

### Criar Hospedagem

```bash
POST /api/v1/accommodations
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Pousada Beira Mar",
  "description": "Pousada aconchegante com vista para o mar",
  "city": "Garopaba",
  "state": "SC",
  "address": "Rua das Gaivotas, 456",
  "type": "POUSADA",
  "amenities": ["Wi-Fi", "Café da Manhã", "Estacionamento"],
  "pricePerNight": 250.00,
  "phone": "+55 48 3254-5678"
}
```

### Listar Hospedagens

```bash
GET /api/v1/accommodations?city=Garopaba&type=POUSADA
Authorization: Bearer {token}
```

## ✅ Aprovações (Admin apenas)

### Listar Solicitações Pendentes

```bash
GET /api/v1/approvals/pending
Authorization: Bearer {token-admin}
```

**Resposta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "TOURIST_POINT",
      "entity": {
        "id": "uuid",
        "name": "Praia do Rosa",
        "city": "Imbituba"
      },
      "submittedBy": {
        "name": "João Silva",
        "email": "joao@example.com"
      },
      "submittedAt": "2024-12-09T10:30:00Z"
    }
  ],
  "total": 5
}
```

### Aprovar Solicitação

```bash
POST /api/v1/approvals/{id}/approve
Authorization: Bearer {token-admin}
Content-Type: application/json

{
  "comments": "Aprovado. Conteúdo de qualidade!"
}
```

### Rejeitar Solicitação

```bash
POST /api/v1/approvals/{id}/reject
Authorization: Bearer {token-admin}
Content-Type: application/json

{
  "reason": "Informações incompletas. Por favor, adicione fotos e descrição mais detalhada."
}
```

## 📊 Relatórios

### Estatísticas Gerais

```bash
GET /api/v1/reports/stats
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "totalTouristPoints": 150,
  "totalRestaurants": 89,
  "totalAccommodations": 67,
  "pendingApprovals": 12,
  "approvedThisMonth": 34,
  "topCities": [
    { "city": "Florianópolis", "count": 98 },
    { "city": "Imbituba", "count": 45 }
  ]
}
```

### Relatório por Cidade

```bash
GET /api/v1/reports/by-city?city=Florianópolis
Authorization: Bearer {token}
```

### Exportar Relatório para Notion

```bash
POST /api/v1/reports/export-to-notion
Authorization: Bearer {token-admin}
Content-Type: application/json

{
  "reportType": "monthly",
  "month": "2024-12",
  "includeStats": true
}
```

## 🔍 Exemplos com cURL

### Login com cURL

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@turistarsul.com",
    "password": "Admin@123"
  }'
```

### Criar Ponto Turístico com cURL

```bash
curl -X POST http://localhost:3000/api/v1/tourist-points \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lagoa da Conceição",
    "description": "Lagoa famosa em Florianópolis",
    "city": "Florianópolis",
    "state": "SC",
    "category": "NATURE"
  }'
```

## 🧪 Testando com Postman

1. Importe a collection do Swagger: `http://localhost:3000/api-json`
2. Configure a variável de ambiente `baseUrl`: `http://localhost:3000/api/v1`
3. Configure a variável `token` após fazer login
4. Use `{{baseUrl}}` e `{{token}}` nas requisições

## 📝 Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token ausente ou inválido |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (ex: email já existe) |
| 500 | Internal Server Error - Erro no servidor |

## 🛡️ Rate Limiting

A API possui rate limiting configurado:
- **Geral**: 100 requisições por 15 minutos por IP
- **Login**: 5 tentativas por 15 minutos por IP

## 🔗 Links Úteis

- [Swagger UI](http://localhost:3000/api) - Documentação interativa
- [Prisma Studio](http://localhost:5555) - Visualizar banco de dados
- [Documentação Completa](API_DOCS.md)
