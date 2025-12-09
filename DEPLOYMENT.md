# 🚀 Guia de Deploy

Este guia contém instruções para fazer deploy do Turistar Sul em diferentes plataformas.

## 📋 Índice

- [Preparação](#-preparação)
- [Deploy com Railway](#-deploy-com-railway)
- [Deploy com Vercel + Railway](#-deploy-com-vercel--railway)
- [Deploy com Docker (VPS)](#-deploy-com-docker-vps)
- [Deploy com AWS](#-deploy-com-aws)
- [Configurações de Produção](#-configurações-de-produção)

## 🎯 Preparação

### 1. Checklist Pré-Deploy

- [ ] Código testado e funcionando localmente
- [ ] Todas as variáveis de ambiente documentadas
- [ ] Migrations do banco de dados preparadas
- [ ] Secrets seguros gerados (JWT_SECRET, etc)
- [ ] CORS configurado para domínio de produção
- [ ] SSL/HTTPS configurado

### 2. Gerar Secrets Seguros

```powershell
# JWT Secret (Windows PowerShell)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})

# Ou use um gerador online
# https://randomkeygen.com/
```

## 🚂 Deploy com Railway

Railway é perfeito para projetos full-stack. Deploy fácil e gratuito (até $5/mês de crédito).

### Backend

1. **Criar conta**: https://railway.app
2. **Novo Projeto** → "Deploy from GitHub"
3. **Selecionar** repositório
4. **Configurar** serviço:

```yaml
# railway.json (backend)
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npx prisma generate && npm run build"
  },
  "deploy": {
    "startCommand": "npm run start:prod",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100
  }
}
```

5. **Adicionar PostgreSQL**:
   - Add Service → Database → PostgreSQL
   - Railway gerará `DATABASE_URL` automaticamente

6. **Configurar variáveis**:
```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=seu-secret-super-seguro-aqui
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://seu-frontend.vercel.app

# Notion (opcional)
NOTION_TOKEN=secret_...
NOTION_DATABASE_ID=...
```

7. **Run Migrations**:
   - Na aba do serviço → Shell
   ```bash
   npx prisma db push
   npm run db:seed
   ```

8. **Domínio customizado** (opcional):
   - Settings → Domains → Add Custom Domain

### Frontend

1. **Novo Service** no mesmo projeto
2. **Configurar**:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

3. **Variáveis**:
```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app
```

## ▲ Deploy com Vercel + Railway

Vercel é ideal para Next.js. Use Railway apenas para backend + DB.

### Backend + Database (Railway)

Siga as instruções acima para backend.

### Frontend (Vercel)

1. **Criar conta**: https://vercel.com
2. **Import Project** → GitHub
3. **Configure**:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Environment Variables**:
```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app
```

5. **Deploy** → Vercel faz automático!

6. **Domínio customizado**:
   - Settings → Domains → Add

## 🐳 Deploy com Docker (VPS)

Para VPS (DigitalOcean, AWS EC2, Linode, etc).

### 1. Preparar VPS

```bash
# Conectar via SSH
ssh root@seu-servidor.com

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt-get install docker-compose-plugin

# Instalar Git
apt-get install git
```

### 2. Clonar Repositório

```bash
cd /opt
git clone https://github.com/joaogehlen/Turistar-Sul.git
cd Turistar-Sul
```

### 3. Configurar Environment

```bash
# Backend
cp backend/.env.example backend/.env
nano backend/.env

# Frontend
cp frontend/.env.example frontend/.env.local
nano frontend/.env.local
```

### 4. Docker Compose para Produção

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: turistarsul
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: turistarsul
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://turistarsul:${DB_PASSWORD}@db:5432/turistarsul
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    depends_on:
      - db
    restart: always

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      NEXT_PUBLIC_API_URL: https://api.seudominio.com
    depends_on:
      - backend
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend
      - frontend
    restart: always

volumes:
  postgres_data:
```

### 5. Configurar Nginx

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:3000;
    }

    upstream frontend {
        server frontend:3001;
    }

    # Redirecionar HTTP para HTTPS
    server {
        listen 80;
        server_name seudominio.com;
        return 301 https://$server_name$request_uri;
    }

    # Frontend
    server {
        listen 443 ssl http2;
        server_name seudominio.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    # Backend API
    server {
        listen 443 ssl http2;
        server_name api.seudominio.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        location / {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### 6. SSL com Let's Encrypt

```bash
# Instalar Certbot
apt-get install certbot python3-certbot-nginx

# Gerar certificados
certbot --nginx -d seudominio.com -d api.seudominio.com

# Auto-renovação (já configurado)
certbot renew --dry-run
```

### 7. Deploy

```bash
# Build e iniciar
docker-compose -f docker-compose.prod.yml up -d --build

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Executar migrations
docker-compose -f docker-compose.prod.yml exec backend npx prisma db push
docker-compose -f docker-compose.prod.yml exec backend npm run db:seed
```

### 8. Automatizar Deploys

```bash
# deploy.sh
#!/bin/bash
cd /opt/Turistar-Sul
git pull origin master
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy
```

## ☁️ Deploy com AWS

### Arquitetura Sugerida

```
Route 53 (DNS)
    ↓
CloudFront (CDN) → S3 (Frontend estático)
    ↓
API Gateway
    ↓
ECS/Fargate (Backend containers)
    ↓
RDS PostgreSQL
```

### 1. Frontend (S3 + CloudFront)

```bash
# Build estático
cd frontend
npm run build
npm run export

# Upload para S3
aws s3 sync out/ s3://seu-bucket-frontend --delete

# Invalidar cache CloudFront
aws cloudfront create-invalidation --distribution-id XXX --paths "/*"
```

### 2. Backend (ECS Fargate)

1. **ECR** - Push da imagem:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin xxx.dkr.ecr.us-east-1.amazonaws.com

docker build -t turistarsul-backend ./backend
docker tag turistarsul-backend:latest xxx.dkr.ecr.us-east-1.amazonaws.com/turistarsul-backend:latest
docker push xxx.dkr.ecr.us-east-1.amazonaws.com/turistarsul-backend:latest
```

2. **RDS** - Criar PostgreSQL
3. **ECS** - Criar Task Definition
4. **ALB** - Load Balancer
5. **Auto Scaling** - Configurar

## ⚙️ Configurações de Produção

### Backend

```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(','),
    credentials: true,
  });
  
  // Security headers
  app.use(helmet());
  
  // Rate limiting
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  
  // Compression
  app.use(compression());
  
  // Global prefix
  app.setGlobalPrefix('api/v1');
  
  await app.listen(process.env.PORT || 3000);
}
```

### Variáveis Críticas

```env
# Produção
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=secret-super-seguro-com-64-caracteres-aleatorios
CORS_ORIGIN=https://seudominio.com

# Optional mas recomendado
LOG_LEVEL=info
API_RATE_LIMIT=100
SENTRY_DSN=...
```

## 📊 Monitoramento

### Health Check Endpoint

```typescript
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
```

### Logs

```typescript
// logger.service.ts
import { Logger } from '@nestjs/common';
import * as winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

## 🔒 Segurança em Produção

- [ ] JWT_SECRET complexo e único
- [ ] HTTPS/SSL configurado
- [ ] CORS restrito a domínios específicos
- [ ] Rate limiting ativo
- [ ] Helmet.js configurado
- [ ] Variáveis sensíveis em secrets manager
- [ ] Database backups automáticos
- [ ] Logs de auditoria ativos
- [ ] Firewall configurado
- [ ] Atualizações de segurança automáticas

## 📈 Otimizações

- [ ] CDN para assets estáticos
- [ ] Database connection pooling
- [ ] Redis para cache
- [ ] Compressão Gzip/Brotli
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Code splitting

## 🆘 Troubleshooting

### Logs não aparecem
```bash
docker-compose logs -f backend
```

### Migrations não rodam
```bash
docker-compose exec backend npx prisma db push --force-reset
```

### Porta em uso
```bash
lsof -ti:3000 | xargs kill -9
```

---

**🎉 Deploy completo! Seu Turistar Sul está no ar!**
