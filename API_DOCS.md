# 📋 API Endpoints - Turistar Sul

## Base URL
```
http://localhost:3000/api/v1
```

## 🔐 Autenticação

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@turistarsul.com",
  "password": "Admin@123"
}

Response 200:
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "admin@turistarsul.com",
    "name": "Administrador",
    "role": "ADMIN"
  }
}
```

### Registro
```http
POST /auth/register
Content-Type: application/json

{
  "email": "novo@parceiro.com",
  "password": "Senha@123",
  "name": "Nome do Estabelecimento",
  "phone": "(51) 99999-9999",
  "role": "TOURIST_POINT",
  "cnpj": "12.345.678/0001-00"
}
```

## 📍 Pontos Turísticos

### Listar pontos (público)
```http
GET /tourist-points
GET /tourist-points?city=Gramado
```

### Buscar ponto específico
```http
GET /tourist-points/:id
```

### Criar ponto (requer auth)
```http
POST /tourist-points
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Mini Mundo",
  "description": "Parque temático com miniaturas",
  "address": "R. Horácio Cardoso, 1.000",
  "city": "Gramado",
  "state": "RS",
  "latitude": -29.3798,
  "longitude": -50.8757,
  "category": "Parque Temático",
  "openingHours": "09:00 - 18:00",
  "entryFee": "R$ 52,00"
}
```

### Listar meus pontos
```http
GET /tourist-points/my-points
Authorization: Bearer {token}
```

### Atualizar ponto
```http
PATCH /tourist-points/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "openingHours": "08:00 - 19:00",
  "entryFee": "R$ 60,00"
}
```

### Excluir ponto
```http
DELETE /tourist-points/:id
Authorization: Bearer {token}
```

## 🍽️ Restaurantes

Endpoints similares aos pontos turísticos:
- `GET /restaurants`
- `GET /restaurants/:id`
- `POST /restaurants`
- `GET /restaurants/my-restaurants`
- `PATCH /restaurants/:id`
- `DELETE /restaurants/:id`

### Criar restaurante
```http
POST /restaurants
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Restaurante Boratto",
  "description": "Culinária italiana autêntica",
  "address": "Av. Borges de Medeiros, 2.101",
  "city": "Gramado",
  "state": "RS",
  "cuisine": "Italiana",
  "priceRange": "$$$",
  "openingHours": "12:00 - 15:00, 19:00 - 23:00",
  "phone": "(54) 3286-1644"
}
```

## 🏨 Hospedagens

Endpoints similares:
- `GET /accommodations`
- `GET /accommodations/:id`
- `POST /accommodations`
- `GET /accommodations/my-accommodations`
- `PATCH /accommodations/:id`
- `DELETE /accommodations/:id`

### Criar hospedagem
```http
POST /accommodations
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Hotel Serra Azul",
  "description": "Hotel com vista panorâmica",
  "address": "Av. das Hortênsias, 1.845",
  "city": "Gramado",
  "state": "RS",
  "type": "Hotel",
  "rooms": 60,
  "capacity": 150,
  "pricePerNight": 450.00,
  "amenities": "Wi-Fi, Café da manhã, Piscina",
  "phone": "(54) 3295-1082"
}
```

## ✅ Aprovações (Admin)

### Listar pendentes
```http
GET /approvals/pending
Authorization: Bearer {token}
```

### Listar todas
```http
GET /approvals/all
Authorization: Bearer {token}
```

### Estatísticas
```http
GET /approvals/stats
Authorization: Bearer {token}

Response:
{
  "pending": 3,
  "approved": 10,
  "rejected": 2,
  "total": 15
}
```

### Detalhes de solicitação
```http
GET /approvals/:id
Authorization: Bearer {token}
```

### Aprovar
```http
PATCH /approvals/:id/approve
Authorization: Bearer {token}
```

### Rejeitar
```http
PATCH /approvals/:id/reject
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Dados incompletos ou inválidos"
}
```

## 📊 Relatórios

### Estatísticas gerais (Admin)
```http
GET /reports/admin-stats
Authorization: Bearer {token}

Response:
{
  "users": 25,
  "touristPoints": 15,
  "restaurants": 12,
  "accommodations": 8,
  "pendingApprovals": 3,
  "timestamp": "2024-12-09T..."
}
```

### Estatísticas por cidade (Prefeitura/Admin)
```http
GET /reports/city-stats?city=Gramado
Authorization: Bearer {token}

Response:
{
  "city": "Gramado",
  "stats": {
    "touristPoints": 8,
    "restaurants": 6,
    "accommodations": 5,
    "total": 19
  },
  "details": { ... }
}
```

### Gerar relatório
```http
POST /reports/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "CITY_STATS",
  "city": "Gramado"
}
```

### Listar relatórios
```http
GET /reports
GET /reports?city=Gramado
Authorization: Bearer {token}
```

## 🔔 Notion

### Sincronizar relatório
```http
POST /notion/sync-report/:reportId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "notionPageId": "page-id"
}
```

### Status de sincronização
```http
GET /notion/sync-status?entityType=REPORT&entityId=uuid
Authorization: Bearer {token}
```

## 👤 Usuários

### Listar usuários (Admin)
```http
GET /users
Authorization: Bearer {token}
```

### Perfil do usuário logado
```http
GET /users/profile
Authorization: Bearer {token}

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Nome",
  "role": "TOURIST_POINT",
  "stats": {
    "total": 5,
    "active": 3,
    "pending": 2
  }
}
```

### Buscar usuário por ID (Admin)
```http
GET /users/:id
Authorization: Bearer {token}
```

## 🔄 Status das Entidades

- `ACTIVE` - Ativo e visível publicamente
- `INACTIVE` - Inativo (rejeitado ou pausado)
- `PENDING_APPROVAL` - Aguardando aprovação

## 🎭 Roles

- `ADMIN` - Administrador do sistema
- `TOURIST_POINT` - Gerencia pontos turísticos
- `RESTAURANT` - Gerencia restaurantes
- `ACCOMMODATION` - Gerencia hospedagens
- `PREFECTURE` - Prefeitura (apenas relatórios)
