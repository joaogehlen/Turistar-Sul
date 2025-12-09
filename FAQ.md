# ❓ Perguntas Frequentes (FAQ)

## 📋 Índice

- [Geral](#-geral)
- [Instalação](#-instalação)
- [Autenticação](#-autenticação)
- [Funcionalidades](#-funcionalidades)
- [Integração Notion](#-integração-notion)
- [Troubleshooting](#-troubleshooting)

## 🌟 Geral

### O que é o Turistar Sul?

O Turistar Sul é uma plataforma completa de gestão turística que permite cadastrar, gerenciar e aprovar pontos turísticos, restaurantes e hospedagens. O sistema conta com diferentes níveis de acesso (roles), sistema de aprovação e integração automática com Notion.

### Quem pode usar o sistema?

O sistema possui diferentes níveis de acesso:
- **Admin**: Gerencia todo o sistema e faz aprovações
- **Pontos Turísticos**: Cadastra e gerencia pontos turísticos
- **Restaurantes**: Cadastra e gerencia restaurantes
- **Hospedagens**: Cadastra e gerencia hospedagens
- **Prefeitura**: Visualiza relatórios da cidade

### O sistema é gratuito?

Sim, o código é open source sob licença MIT. Você pode usar, modificar e distribuir livremente.

### Posso usar para fins comerciais?

Sim! A licença MIT permite uso comercial.

## 🚀 Instalação

### Quais são os requisitos mínimos?

- **Node.js** 18+ 
- **PostgreSQL** 15+ (ou Docker)
- **npm** ou **yarn**
- **Git**

### Docker é obrigatório?

Não, mas é recomendado para facilitar a instalação. Você pode instalar manualmente seguindo as instruções no README.

### Como faço para instalar localmente?

Veja o [guia de instalação completo](README.md#-instalação) no README.

### Erro ao instalar dependências, o que fazer?

```bash
# Limpe o cache do npm
npm cache clean --force

# Delete node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstale
npm install
```

## 🔐 Autenticação

### Como faço o primeiro login?

Após rodar o seed do banco de dados:
- **Email**: admin@turistarsul.com
- **Senha**: Admin@123

### Esqueci minha senha, como recuperar?

Atualmente a funcionalidade de recuperação de senha está em desenvolvimento. Entre em contato com o administrador do sistema.

### O token JWT expira?

Sim, por padrão expira em 7 dias. Você pode configurar no arquivo `.env` com a variável `JWT_EXPIRES_IN`.

### Como alterar o tempo de expiração do token?

No arquivo `backend/.env`:
```env
JWT_EXPIRES_IN="30d"  # Para 30 dias
JWT_EXPIRES_IN="24h"  # Para 24 horas
```

## ⚙️ Funcionalidades

### Como cadastro um novo ponto turístico?

1. Faça login no sistema
2. Acesse o menu "Pontos Turísticos"
3. Clique em "Novo Cadastro"
4. Preencha os dados
5. Aguarde aprovação do admin

### Por que meu cadastro está pendente?

Todos os cadastros passam por aprovação do administrador para garantir qualidade e veracidade das informações.

### Quanto tempo leva para aprovar?

Depende da disponibilidade do admin. Normalmente 24-48 horas.

### Posso editar depois de aprovado?

Sim! Mas a edição também passará por nova aprovação.

### Posso deletar meu cadastro?

Sim, você pode deletar seus próprios cadastros a qualquer momento.

### Como filtro por cidade?

Na listagem, use os filtros disponíveis no topo da página ou adicione query parameters na URL:
```
/tourist-points?city=Florianópolis
```

## 🔔 Integração Notion

### A integração Notion é obrigatória?

Não! O sistema funciona perfeitamente sem Notion. A integração é opcional para backup e relatórios externos.

### Como configuro o Notion?

Siga o guia completo em [NOTION_SETUP.md](NOTION_SETUP.md).

### Quando os dados são sincronizados?

Automaticamente quando:
- Um cadastro é aprovado
- Um relatório é gerado
- Manualmente via API

### Posso usar outro sistema além do Notion?

Atualmente apenas Notion é suportado, mas contribuições para outras integrações são bem-vindas!

## 🔧 Troubleshooting

### Erro: "Port 3000 already in use"

Outro processo está usando a porta 3000:

**Windows:**
```powershell
# Encontre o processo
netstat -ano | findstr :3000

# Mate o processo (substitua PID)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Encontre e mate o processo
lsof -ti:3000 | xargs kill -9
```

Ou altere a porta no `.env`:
```env
PORT=3001
```

### Erro: "Cannot connect to database"

Verifique se:
1. PostgreSQL está rodando
2. Credenciais no `.env` estão corretas
3. Database existe

```bash
# Teste a conexão
psql -U turistarsul -h localhost -d turistarsul
```

### Erro: "Prisma Client not generated"

Execute:
```bash
cd backend
npx prisma generate
```

### Frontend não consegue conectar na API

Verifique se:
1. Backend está rodando (`http://localhost:3000`)
2. URL no `frontend/.env.local` está correta:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
3. CORS está configurado corretamente no backend

### Erro 401 Unauthorized

Seu token expirou ou é inválido. Faça login novamente.

### Erro 403 Forbidden

Você não tem permissão para acessar este recurso. Verifique seu role.

### Docker não inicia

```bash
# Rebuild sem cache
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Como ver logs do Docker?

```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend
```

### Como resetar o banco de dados?

```bash
cd backend

# Limpa o banco
npx prisma db push --force-reset

# Roda seed novamente
npm run db:seed
```

## 📊 Performance

### O sistema suporta quantos usuários simultâneos?

Depende da infraestrutura. Em um servidor básico (2GB RAM), recomendamos até 100 usuários simultâneos.

### Como melhorar a performance?

- Use cache (Redis)
- Configure CDN para assets
- Otimize queries do banco
- Use pagination em todas as listas
- Implemente lazy loading

### Posso usar MongoDB ao invés de PostgreSQL?

Não atualmente. O Prisma schema está configurado para PostgreSQL. Contribuições para suporte a MongoDB são bem-vindas!

## 🚀 Deploy

### Como faço deploy em produção?

Veja nosso guia de deploy (em desenvolvimento) ou use plataformas como:
- **Backend**: Railway, Render, Heroku, AWS
- **Frontend**: Vercel, Netlify
- **Database**: Supabase, Railway, AWS RDS

### Preciso de servidor próprio?

Não necessariamente. Você pode usar serviços cloud gratuitos/baratos.

### Como configuro variáveis de ambiente em produção?

Cada plataforma tem sua forma:
- **Vercel**: Project Settings → Environment Variables
- **Railway**: Variables Tab
- **Heroku**: Config Vars

## 🤝 Contribuição

### Como posso contribuir?

Veja nosso [guia de contribuição](CONTRIBUTING.md).

### Encontrei um bug, o que fazer?

Abra uma [issue no GitHub](https://github.com/joaogehlen/Turistar-Sul/issues) com:
- Descrição do problema
- Passos para reproduzir
- Screenshots (se aplicável)

### Tenho uma ideia de funcionalidade

Ótimo! Abra uma [feature request](https://github.com/joaogehlen/Turistar-Sul/issues/new?template=feature_request.md).

## 📧 Suporte

### Não encontrei resposta aqui

- Abra uma [issue](https://github.com/joaogehlen/Turistar-Sul/issues)
- Consulte a [documentação completa](README.md)
- Entre em contato: [seu-email@example.com]

---

**Não encontrou sua pergunta? Abra uma issue!** 🙋‍♂️
