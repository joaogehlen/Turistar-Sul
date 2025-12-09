# 🔔 PROMPT PARA CONFIGURAÇÃO DO NOTION

## 📋 Contexto

O sistema **Turistar Sul** sincroniza automaticamente todas as entidades aprovadas para o Notion. Você precisa criar um database no Notion com as propriedades corretas.

---

## 🎯 Prompt para o Notion (Cole no Notion AI ou crie manualmente)

```
Crie um database do Notion chamado "Turistar Sul - Entidades" com as seguintes propriedades:

PROPRIEDADES OBRIGATÓRIAS:
- Name (Title) - Nome da entidade
- Type (Select) - Opções: "Ponto Turístico", "Restaurante", "Hospedagem", "Relatório"
- City (Select) - Cidades (Gramado, Canela, etc)
- State (Text) - Estado (RS, SC, etc)
- Status (Select) - Opções: "ACTIVE", "INACTIVE", "PENDING_APPROVAL"
- Owner (Text) - Nome do proprietário
- Address (Text) - Endereço completo
- CreatedAt (Date) - Data de criação

PROPRIEDADES ESPECÍFICAS:

Para Pontos Turísticos:
- Category (Select) - Opções: "Parque Temático", "Natureza", "Museu", "Cultural", "Aventura"

Para Restaurantes:
- Cuisine (Select) - Opções: "Italiana", "Brasileira", "Japonesa", "Francesa", "Contemporânea"
- PriceRange (Select) - Opções: "$", "$$", "$$$", "$$$$"
- Phone (Phone)

Para Hospedagens:
- AccommodationType (Select) - Opções: "Hotel", "Pousada", "Resort", "Hostel"
- Rooms (Number) - Número de quartos
- PricePerNight (Number) - Preço por noite
- Phone (Phone)

Para Relatórios:
- ReportType (Select) - Opções: "CITY_STATS", "ENTITY_STATS", "APPROVALS"

VIEWS SUGERIDAS:
1. "Todos" - Table view com todas as entidades
2. "Por Tipo" - Board view agrupado por Type
3. "Por Cidade" - Board view agrupado por City
4. "Aprovados" - Filtered by Status = ACTIVE
5. "Pendentes" - Filtered by Status = PENDING_APPROVAL
```

---

## 🔧 Passo a Passo Manual

### 1. Criar Database no Notion

1. Abra o Notion
2. Crie uma nova página
3. Adicione um "Database - Full Page"
4. Nomeie: **"Turistar Sul - Entidades"**

### 2. Adicionar Propriedades

Clique em **"+ Add a property"** e crie cada uma:

#### Propriedades Principais

| Nome | Tipo | Valores (Select) |
|------|------|------------------|
| Name | Title | - |
| Type | Select | Ponto Turístico, Restaurante, Hospedagem, Relatório |
| City | Select | Gramado, Canela, Bento Gonçalves, Nova Petrópolis, etc |
| State | Text | - |
| Status | Select | ACTIVE, INACTIVE, PENDING_APPROVAL |
| Owner | Text | - |
| Address | Text | - |
| CreatedAt | Date | - |

#### Propriedades Opcionais (para flexibilidade)

| Nome | Tipo | Valores (Select) |
|------|------|------------------|
| Category | Select | Parque Temático, Natureza, Museu, Cultural, Aventura, Praia |
| Cuisine | Select | Italiana, Brasileira, Japonesa, Francesa, Contemporânea, Churrascaria |
| PriceRange | Select | $, $$, $$$, $$$$ |
| AccommodationType | Select | Hotel, Pousada, Resort, Hostel |
| Rooms | Number | - |
| PricePerNight | Number | - |
| Phone | Phone | - |
| ReportType | Select | CITY_STATS, ENTITY_STATS, APPROVALS |

### 3. Criar Views

1. **View "Todos"** (Table)
   - Mostra todas as colunas
   - Sem filtros

2. **View "Por Tipo"** (Board)
   - Agrupar por: **Type**
   - Mostra: Name, City, Status, Owner

3. **View "Por Cidade"** (Board)
   - Agrupar por: **City**
   - Filtro: Status = ACTIVE

4. **View "Aprovados"** (Table)
   - Filtro: Status = ACTIVE
   - Ordenar: CreatedAt (decrescente)

5. **View "Pendentes"** (Table)
   - Filtro: Status = PENDING_APPROVAL
   - Ordenar: CreatedAt (decrescente)

---

## 🔐 Obter Credenciais do Notion

### 1. Criar Integração

1. Acesse: https://www.notion.so/my-integrations
2. Clique em **"+ New integration"**
3. Preencha:
   - **Name:** Turistar Sul API
   - **Associated workspace:** Selecione seu workspace
   - **Type:** Internal
4. Clique em **"Submit"**
5. **Copie o "Internal Integration Token"** (começa com `secret_...`)

### 2. Compartilhar Database

1. Abra o database "Turistar Sul - Entidades"
2. Clique nos **3 pontos** no canto superior direito
3. Clique em **"Add connections"**
4. Selecione **"Turistar Sul API"**
5. Clique em **"Confirm"**

### 3. Obter Database ID

1. Abra o database no Notion
2. Copie a URL, exemplo:
   ```
   https://www.notion.so/workspace/abc123def456?v=xyz789
   ```
3. O Database ID é: `abc123def456` (parte entre `/` e `?`)

---

## ⚙️ Configurar Backend

Edite o arquivo `backend/.env`:

```env
# Notion Integration
NOTION_TOKEN="secret_SEU_TOKEN_AQUI"
NOTION_DATABASE_ID="abc123def456"
```

---

## ✅ Testar Sincronização

### 1. Aprovar uma entidade

```powershell
# Login como admin
$body = @{
    email = "admin@turistarsul.com"
    password = "Admin@123"
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
$token = $response.access_token

# Listar pendentes
$headers = @{ "Authorization" = "Bearer $token" }
$pending = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/approvals/pending" -Method Get -Headers $headers

# Aprovar primeira solicitação (sincroniza automaticamente)
$requestId = $pending[0].id
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/approvals/$requestId/approve" -Method Patch -Headers $headers
```

### 2. Verificar no Notion

Vá ao database no Notion e veja a nova entidade adicionada! 🎉

### 3. Sincronizar manualmente (se necessário)

```powershell
# Sincronizar ponto turístico
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/notion/sync-tourist-point/{id}" -Method Post -Headers $headers

# Sincronizar restaurante
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/notion/sync-restaurant/{id}" -Method Post -Headers $headers

# Sincronizar hospedagem
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/notion/sync-accommodation/{id}" -Method Post -Headers $headers

# Ver todas as sincronizações
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/notion/syncs" -Method Get -Headers $headers
```

---

## 🎨 Template do Database (JSON)

Se preferir, importe este template no Notion:

```json
{
  "title": [{ "text": { "content": "Turistar Sul - Entidades" } }],
  "properties": {
    "Name": { "title": {} },
    "Type": {
      "select": {
        "options": [
          { "name": "Ponto Turístico", "color": "blue" },
          { "name": "Restaurante", "color": "red" },
          { "name": "Hospedagem", "color": "green" },
          { "name": "Relatório", "color": "purple" }
        ]
      }
    },
    "City": {
      "select": {
        "options": [
          { "name": "Gramado", "color": "blue" },
          { "name": "Canela", "color": "green" },
          { "name": "Bento Gonçalves", "color": "purple" },
          { "name": "Nova Petrópolis", "color": "yellow" }
        ]
      }
    },
    "State": { "rich_text": {} },
    "Status": {
      "select": {
        "options": [
          { "name": "ACTIVE", "color": "green" },
          { "name": "INACTIVE", "color": "red" },
          { "name": "PENDING_APPROVAL", "color": "yellow" }
        ]
      }
    },
    "Owner": { "rich_text": {} },
    "Address": { "rich_text": {} },
    "CreatedAt": { "date": {} },
    "Category": {
      "select": {
        "options": [
          { "name": "Parque Temático", "color": "blue" },
          { "name": "Natureza", "color": "green" },
          { "name": "Museu", "color": "brown" },
          { "name": "Cultural", "color": "purple" },
          { "name": "Aventura", "color": "orange" }
        ]
      }
    },
    "Cuisine": {
      "select": {
        "options": [
          { "name": "Italiana", "color": "red" },
          { "name": "Brasileira", "color": "yellow" },
          { "name": "Japonesa", "color": "pink" },
          { "name": "Francesa", "color": "blue" },
          { "name": "Contemporânea", "color": "purple" }
        ]
      }
    },
    "PriceRange": {
      "select": {
        "options": [
          { "name": "$", "color": "green" },
          { "name": "$$", "color": "yellow" },
          { "name": "$$$", "color": "orange" },
          { "name": "$$$$", "color": "red" }
        ]
      }
    },
    "AccommodationType": {
      "select": {
        "options": [
          { "name": "Hotel", "color": "blue" },
          { "name": "Pousada", "color": "green" },
          { "name": "Resort", "color": "purple" },
          { "name": "Hostel", "color": "yellow" }
        ]
      }
    },
    "Rooms": { "number": {} },
    "PricePerNight": { "number": { "format": "dollar" } },
    "Phone": { "phone_number": {} },
    "ReportType": {
      "select": {
        "options": [
          { "name": "CITY_STATS", "color": "blue" },
          { "name": "ENTITY_STATS", "color": "green" },
          { "name": "APPROVALS", "color": "purple" }
        ]
      }
    }
  }
}
```

---

## 🚀 Comportamento do Sistema

### Sincronização Automática

✅ Quando o **Admin aprova** uma solicitação:
1. Entidade muda para `ACTIVE`
2. Sistema **automaticamente** sincroniza com Notion
3. Nova página é criada no database
4. Registro salvo na tabela `notion_syncs`

### Sincronização Manual

✅ Admin pode sincronizar manualmente:
- Pontos turísticos: `POST /notion/sync-tourist-point/{id}`
- Restaurantes: `POST /notion/sync-restaurant/{id}`
- Hospedagens: `POST /notion/sync-accommodation/{id}`
- Relatórios: `POST /notion/sync-report/{id}`

### Tracking

✅ Todas as sincronizações são registradas:
- `GET /notion/syncs` - Lista todas
- `GET /notion/sync-status?entityType=X&entityId=Y` - Status específico

---

## 🎯 Resultado Final

Após configurar, você terá:

✅ Database no Notion organizado
✅ Sincronização automática em aprovações
✅ Views personalizadas (Tabela, Board)
✅ Histórico de sincronizações
✅ API para sincronizar manualmente

**Notion se torna seu painel visual do sistema!** 📊

---

## ⚠️ Observações Importantes

1. **Notion não é obrigatório** - sistema funciona sem ele
2. Se Notion falhar, **aprovação continua normal**
3. Sincronização é **assíncrona** - não bloqueia o sistema
4. Propriedades opcionais ficam vazias se não existirem
5. Você pode **adicionar mais propriedades** depois

---

## 🆘 Problemas Comuns

### "Notion não configurado"
→ Verifique NOTION_TOKEN e NOTION_DATABASE_ID no .env

### "Database not found"
→ Compartilhe o database com a integração

### "Property not found"
→ Verifique se criou todas as propriedades obrigatórias

### Entidade não aparece no Notion
→ Veja logs do backend para detalhes do erro
→ Teste sincronização manual primeiro

---

**Agora seu sistema está integrado com Notion! 🎉**
