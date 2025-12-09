# 🏗️ Arquitetura e Tecnologias

Este documento descreve a arquitetura técnica e as escolhas tecnológicas do Turistar Sul.

## 📐 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENTE                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   Web Browser    │         │  Mobile (futuro) │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
└───────────┼──────────────────────────┼────────────────────┘
            │                            │
            └──────────┬─────────────────┘
                       │ HTTPS
            ┌──────────▼─────────────┐
            │                        │
            │   Frontend (Next.js)   │
            │   - SSR/SSG/CSR        │
            │   - Tailwind CSS       │
            │   - TypeScript         │
            │                        │
            └──────────┬─────────────┘
                       │ REST API
            ┌──────────▼─────────────┐
            │                        │
            │   Backend (NestJS)     │
            │   - Controllers        │
            │   - Services           │
            │   - Guards/Middleware  │
            │   - JWT Auth           │
            │                        │
            └──┬───────┬─────────┬───┘
               │       │         │
       ┌───────▼───┐  │  ┌──────▼──────┐
       │ PostgreSQL │  │  │   Notion    │
       │   (Prisma) │  │  │     API     │
       └────────────┘  │  └─────────────┘
                       │
                  ┌────▼────┐
                  │  File   │
                  │ Storage │
                  └─────────┘
```

## 🎯 Padrões Arquiteturais

### Backend - Clean Architecture

```
┌────────────────────────────────────────────────┐
│              Presentation Layer                │
│  (Controllers, DTOs, Decorators, Guards)       │
└─────────────────┬──────────────────────────────┘
                  │
┌─────────────────▼──────────────────────────────┐
│              Business Logic Layer              │
│  (Services, Use Cases, Validation)             │
└─────────────────┬──────────────────────────────┘
                  │
┌─────────────────▼──────────────────────────────┐
│              Data Access Layer                 │
│  (Prisma, Repositories, External APIs)         │
└────────────────────────────────────────────────┘
```

### Princípios Aplicados

- **SOLID**: Todos os serviços seguem princípios SOLID
- **Dependency Injection**: Fornecido nativamente pelo NestJS
- **Single Responsibility**: Cada módulo tem uma responsabilidade única
- **Open/Closed**: Extensível sem modificar código existente
- **Interface Segregation**: DTOs específicos por operação

## 🛠️ Stack Tecnológica Detalhada

### Backend

#### NestJS Framework
- **Versão**: 10.3+
- **Por quê?**: 
  - Arquitetura modular e escalável
  - TypeScript nativo
  - Decorators para código limpo
  - Dependency Injection embutido
  - Excelente para APIs empresariais

#### Prisma ORM
- **Versão**: 5.0+
- **Por quê?**:
  - Type-safe queries
  - Auto-completion inteligente
  - Migrations declarativas
  - Schema visual claro
  - Melhor performance que ORMs tradicionais

```typescript
// Exemplo de query type-safe
const users = await prisma.user.findMany({
  where: { role: 'ADMIN' },
  include: { touristPoints: true }
});
```

#### Passport JWT
- **Versão**: 10.0+
- **Por quê?**:
  - Padrão de mercado
  - Stateless authentication
  - Fácil integração com NestJS
  - Suporte a refresh tokens

#### Swagger/OpenAPI
- **Versão**: 7.1+
- **Por quê?**:
  - Documentação automática
  - Interface interativa para testes
  - Geração de client SDKs
  - Padrão da indústria

### Frontend

#### Next.js 14
- **Features usadas**:
  - **App Router**: Roteamento baseado em arquivos
  - **Server Components**: Melhor performance
  - **Server Actions**: Mutações simplificadas
  - **Route Handlers**: API routes
  - **Streaming**: Carregamento progressivo

```typescript
// Server Component exemplo
async function TouristPointsList() {
  const points = await fetchTouristPoints();
  return <div>{/* render */}</div>;
}
```

#### Tailwind CSS
- **Versão**: 3.x
- **Por quê?**:
  - Utility-first approach
  - Build pequeno (tree-shaking)
  - Customização fácil
  - Design system consistente

#### shadcn/ui
- **Por quê?**:
  - Componentes acessíveis (Radix UI)
  - Copia e cola (não biblioteca)
  - Totalmente customizável
  - Dark mode pronto

#### Zustand
- **Por quê?**:
  - Mais simples que Redux
  - TypeScript perfeito
  - Sem boilerplate
  - Performance excelente

```typescript
// Store exemplo
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null })
}));
```

### Database

#### PostgreSQL
- **Versão**: 15+
- **Por quê?**:
  - ACID compliant
  - Relações complexas
  - JSON support (flexibilidade)
  - Performance excelente
  - Open source maduro

#### Schema Design

```sql
-- Exemplo de tabela otimizada
CREATE TABLE tourist_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  status approval_status DEFAULT 'PENDING',
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Índices para performance
  INDEX idx_city (city),
  INDEX idx_status (status),
  INDEX idx_user_city (user_id, city)
);
```

### DevOps & Infrastructure

#### Docker
- **Serviços**:
  - Backend (Node 18 Alpine)
  - Frontend (Node 18 Alpine)
  - PostgreSQL 15
  - Nginx (produção)

#### Docker Compose
```yaml
services:
  backend:
    build: ./backend
    ports: ["3000:3000"]
    depends_on: [db]
  
  frontend:
    build: ./frontend
    ports: ["3001:3001"]
    depends_on: [backend]
  
  db:
    image: postgres:15
    volumes: [postgres-data:/var/lib/postgresql/data]
```

#### GitHub Actions
- **Workflows**:
  - Testes automatizados
  - Lint e formatação
  - Build de containers
  - Security audit
  - Deploy (configurável)

## 🔐 Segurança

### Autenticação & Autorização

```typescript
// JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  
  async validate(payload: JwtPayload) {
    return { userId: payload.sub, role: payload.role };
  }
}

// Role Guard
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### Validação de Dados

```typescript
// DTO com validação
export class CreateTouristPointDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;
  
  @IsEmail()
  email: string;
  
  @IsEnum(Category)
  category: Category;
}
```

### Proteções Implementadas

- ✅ SQL Injection (Prisma parametrized queries)
- ✅ XSS (sanitização de inputs)
- ✅ CSRF (tokens)
- ✅ Rate Limiting
- ✅ CORS configurado
- ✅ Helmet.js (headers de segurança)
- ✅ Password hashing (bcrypt)

## 📊 Performance

### Otimizações Backend

```typescript
// Paginação eficiente
async findAll(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  return await this.prisma.touristPoint.findMany({
    take: limit,
    skip,
    select: {
      id: true,
      name: true,
      city: true,
      // Apenas campos necessários
    }
  });
}

// Query com índices
await this.prisma.touristPoint.findMany({
  where: {
    city: 'Florianópolis', // indexed
    status: 'APPROVED',     // indexed
  }
});
```

### Otimizações Frontend

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automático via Next.js
- **Lazy Loading**: Components on demand
- **Memoization**: React.memo, useMemo, useCallback
- **Streaming**: React Suspense

## 🔄 Integrações Externas

### Notion API

```typescript
@Injectable()
export class NotionService {
  private notion: Client;
  
  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_TOKEN
    });
  }
  
  async syncTouristPoint(data: TouristPoint) {
    return await this.notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: data.name } }] },
        City: { rich_text: [{ text: { content: data.city } }] },
        // ...
      }
    });
  }
}
```

## 🧪 Testes

### Estratégia de Testes

```
┌─────────────────────────────────────┐
│         E2E Tests (10%)            │ ← Postman/Cypress
├─────────────────────────────────────┤
│     Integration Tests (30%)        │ ← Jest + Supertest
├─────────────────────────────────────┤
│       Unit Tests (60%)             │ ← Jest
└─────────────────────────────────────┘
```

### Exemplo de Teste

```typescript
describe('TouristPointsController', () => {
  let controller: TouristPointsController;
  let service: TouristPointsService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TouristPointsController],
      providers: [
        {
          provide: TouristPointsService,
          useValue: { findAll: jest.fn() }
        }
      ],
    }).compile();
    
    controller = module.get(TouristPointsController);
    service = module.get(TouristPointsService);
  });
  
  it('should return an array of tourist points', async () => {
    const result = [{ id: '1', name: 'Test' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    
    expect(await controller.findAll()).toBe(result);
  });
});
```

## 🚀 Escalabilidade

### Horizontal Scaling

```
     Load Balancer
          │
    ┌─────┼─────┐
    │     │     │
  App1  App2  App3  ← Múltiplas instâncias
    │     │     │
    └─────┼─────┘
          │
     PostgreSQL
   (Primary + Replicas)
```

### Melhorias Futuras

- [ ] Cache layer (Redis)
- [ ] Message Queue (RabbitMQ/SQS)
- [ ] CDN para assets
- [ ] Database read replicas
- [ ] API Gateway
- [ ] Microservices (se necessário)

## 📈 Monitoramento

### Métricas Recomendadas

- **APM**: New Relic, DataDog
- **Logs**: Winston + ELK Stack
- **Uptime**: Pingdom, UptimeRobot
- **Errors**: Sentry
- **Analytics**: Google Analytics, Mixpanel

## 🔗 Referências

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
