# 🗺️ Guia de Navegação - Turistar Sul

## 📖 Por Onde Começar?

```
┌─────────────────────────────────────────────────────────────┐
│  VOCÊ ESTÁ AQUI → C:\Users\joao.gehlen\Desktop\projeto novo │
└─────────────────────────────────────────────────────────────┘
```

### 🎯 Primeira Vez?

**1. Leia primeiro:** `SUMMARY.md`
   - Visão geral completa do projeto
   - O que foi criado
   - Tecnologias usadas

**2. Depois:** `QUICK_START.md`
   - Como instalar
   - Como rodar
   - Primeiros passos

**3. Para usar:** `API_DOCS.md`
   - Todos os endpoints
   - Exemplos de uso
   - Códigos de resposta

---

## 📚 Índice de Documentação

| Arquivo | Quando Usar | Tempo de Leitura |
|---------|-------------|------------------|
| **SUMMARY.md** | Visão geral do projeto | 3 min |
| **QUICK_START.md** | Instalar e rodar | 5 min |
| **API_DOCS.md** | Usar a API | 10 min |
| **TESTING_GUIDE.md** | Testar endpoints | 10 min |
| **PROJECT_STRUCTURE.md** | Entender arquitetura | 5 min |
| **README.md** | Documentação completa | 8 min |

---

## 🚀 Fluxos Rápidos

### → Quero instalar e testar AGORA

```powershell
# 1. Abra PowerShell nesta pasta
cd "C:\Users\joao.gehlen\Desktop\projeto novo"

# 2. Execute o script de setup
.\setup.ps1

# 3. Rode o backend (Terminal 1)
cd backend
npm run start:dev

# 4. Rode o frontend (Terminal 2)
cd frontend
npm run dev

# 5. Acesse
# Frontend: http://localhost:3001
# Swagger:  http://localhost:3000/api
```

### → Quero entender a arquitetura

Leia nesta ordem:
1. `PROJECT_STRUCTURE.md` - Estrutura de pastas
2. `backend/prisma/schema.prisma` - Modelo de dados
3. `backend/src/app.module.ts` - Módulos disponíveis

### → Quero usar a API

Leia:
1. `API_DOCS.md` - Lista de endpoints
2. `TESTING_GUIDE.md` - Exemplos de teste
3. Acesse: http://localhost:3000/api (Swagger UI)

### → Quero adicionar uma funcionalidade

Consulte:
1. `PROJECT_STRUCTURE.md` - Onde colocar código
2. Veja exemplo: `backend/src/tourist-points/` (módulo completo)
3. Siga a mesma estrutura para novos módulos

---

## 🔍 Encontrar Algo Específico

### "Como faço login?"
→ `API_DOCS.md` - Seção Autenticação
→ `TESTING_GUIDE.md` - Cenário 1

### "Como aprovar um cadastro?"
→ `API_DOCS.md` - Seção Aprovações
→ `TESTING_GUIDE.md` - Cenário 4

### "Como funciona o sistema de roles?"
→ `SUMMARY.md` - Seção Permissões
→ `backend/src/common/guards/roles.guard.ts`

### "Como adicionar um campo novo?"
→ `backend/prisma/schema.prisma` - Editar model
→ Rodar: `npx prisma db push`

### "Como integrar com Notion?"
→ `QUICK_START.md` - Seção "Configuração do Notion"
→ `backend/src/notion/notion.service.ts`

### "Onde estão as credenciais?"
→ `SUMMARY.md` - Seção Credenciais
→ `backend/prisma/seed.ts` - Dados criados

---

## 📁 Arquivos Importantes

### Configuração
- `backend/.env` - Variáveis backend
- `frontend/.env.local` - Variáveis frontend
- `docker-compose.yml` - Config Docker

### Banco de Dados
- `backend/prisma/schema.prisma` - Schema
- `backend/prisma/seed.ts` - Dados iniciais

### Código Principal
- `backend/src/main.ts` - Entry point backend
- `backend/src/app.module.ts` - Módulos
- `frontend/src/app/page.tsx` - Home frontend

### Scripts
- `setup.ps1` - Instalação automática
- `backend/package.json` - Scripts backend
- `frontend/package.json` - Scripts frontend

---

## 🎓 Roteiros de Aprendizado

### Para Iniciantes

```
Dia 1: Instalação e teste básico
├─ Leia: SUMMARY.md
├─ Execute: setup.ps1
├─ Teste: Login no Swagger
└─ Explore: Prisma Studio

Dia 2: Entenda a API
├─ Leia: API_DOCS.md
├─ Teste: TESTING_GUIDE.md
└─ Explore: Endpoints no Swagger

Dia 3: Entenda o código
├─ Leia: PROJECT_STRUCTURE.md
├─ Explore: backend/src/
└─ Veja: Como um módulo funciona
```

### Para Desenvolvedores

```
Checkpoint 1: Setup ✅
├─ Instalação
├─ Backend rodando
├─ Frontend rodando
└─ Swagger acessível

Checkpoint 2: Conhecimento ✅
├─ Entendeu autenticação
├─ Entendeu roles
├─ Entendeu aprovações
└─ Testou endpoints

Checkpoint 3: Desenvolvimento ✅
├─ Criou um novo endpoint
├─ Adicionou um campo
├─ Fez um relatório
└─ Pronto para expandir!
```

---

## 🛠️ Comandos Úteis

### Backend
```powershell
cd backend

# Desenvolvimento
npm run start:dev        # Rodar com watch mode
npm run build           # Build para produção
npm run start:prod      # Rodar produção

# Banco de dados
npx prisma studio       # Interface visual
npx prisma db push      # Aplicar mudanças
npx prisma db seed      # Popular dados
npx prisma generate     # Gerar Prisma Client

# Qualidade
npm run lint            # Verificar código
npm run format          # Formatar código
```

### Frontend
```powershell
cd frontend

npm run dev             # Rodar desenvolvimento
npm run build           # Build produção
npm run start           # Rodar build
npm run lint            # Verificar código
```

### Docker
```powershell
docker-compose up -d              # Subir tudo
docker-compose up -d postgres     # Só banco
docker-compose down               # Derrubar tudo
docker-compose logs -f backend    # Ver logs
```

---

## 🎯 Metas de Aprendizado

- [ ] Consigo rodar o projeto
- [ ] Entendo a estrutura de pastas
- [ ] Sei fazer login na API
- [ ] Sei criar um ponto turístico
- [ ] Sei aprovar uma solicitação
- [ ] Sei gerar relatórios
- [ ] Entendo o fluxo de aprovação
- [ ] Consigo adicionar um campo novo
- [ ] Consigo criar um endpoint novo
- [ ] Estou pronto para desenvolver!

---

## 🆘 Problemas Comuns

### "setup.ps1 não executa"
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\setup.ps1
```

### "Porta 3000 em uso"
```powershell
# Backend em outra porta
cd backend
$env:PORT=3005; npm run start:dev
```

### "Prisma não conecta"
```powershell
# Verifique PostgreSQL rodando
# Ou use Docker:
docker-compose up -d postgres
```

### "npm install falha"
```powershell
# Limpe cache
npm cache clean --force
Remove-Item node_modules -Recurse -Force
npm install
```

---

## 📞 Precisa de Ajuda?

1. ✅ Verifique os arquivos de documentação
2. ✅ Veja exemplos em `TESTING_GUIDE.md`
3. ✅ Consulte código de módulos existentes
4. ✅ Use Swagger para testar endpoints
5. ✅ Veja logs do backend no terminal

---

## 🎉 Próximos Passos Recomendados

```
Curto Prazo (Hoje/Amanhã):
├─ ✅ Instalar e rodar
├─ ✅ Testar todos os endpoints
├─ ✅ Entender a estrutura
└─ ✅ Fazer primeiro teste de criação

Médio Prazo (Esta Semana):
├─ 📱 Criar páginas do frontend
├─ 🎨 Melhorar UI
├─ 📊 Dashboard completo
└─ 🖼️ Sistema de upload de imagens

Longo Prazo (Este Mês):
├─ ⭐ Sistema de favoritos
├─ 💬 Avaliações e comentários
├─ 🗺️ Mapa interativo
└─ 📱 Versão mobile
```

---

**Boa sorte! Você tem um projeto completo e profissional para começar! 🚀**
