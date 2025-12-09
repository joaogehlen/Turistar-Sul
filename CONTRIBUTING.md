# Contribuindo para Turistar Sul

Obrigado por considerar contribuir com o Turistar Sul! 🎉

## 📋 Código de Conduta

Este projeto adere a um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e acolhedor.

## 🤔 Como Posso Contribuir?

### Reportando Bugs 🐛

Antes de criar um bug report, verifique se o problema já não foi reportado. Quando criar um bug report:

- Use um título claro e descritivo
- Descreva os passos exatos para reproduzir o problema
- Descreva o comportamento que você observou e o que esperava
- Inclua screenshots se possível
- Inclua informações do seu ambiente (OS, versão do Node, etc)

### Sugerindo Melhorias ✨

Se você tem uma ideia para melhorar o projeto:

- Use um título claro e descritivo
- Forneça uma descrição detalhada da funcionalidade sugerida
- Explique por que essa funcionalidade seria útil
- Liste alguns exemplos de como deveria funcionar

### Pull Requests 🔀

#### Processo

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature/fix
   ```bash
   git checkout -b feature/minha-feature
   ```
4. **Faça suas alterações** seguindo os padrões do projeto
5. **Commit** suas mudanças com mensagens descritivas
   ```bash
   git commit -m "feat: adiciona nova funcionalidade X"
   ```
6. **Push** para sua branch
   ```bash
   git push origin feature/minha-feature
   ```
7. **Abra um Pull Request** na branch `master`

#### Padrões de Commit

Seguimos a convenção [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` apenas documentação
- `style:` formatação, falta de ponto e vírgula, etc
- `refactor:` refatoração de código
- `test:` adicionando testes
- `chore:` atualização de tarefas de build, configs, etc

Exemplos:
```
feat: adiciona endpoint de busca avançada
fix: corrige validação de email no registro
docs: atualiza guia de instalação
```

## 🎨 Padrões de Código

### Backend (NestJS)

- Use TypeScript
- Siga os princípios SOLID
- Use decorators do NestJS apropriadamente
- Valide todos os inputs com class-validator
- Documente endpoints com Swagger decorators
- Mantenha controllers magros e services robustos

Exemplo:
```typescript
@ApiOperation({ summary: 'Criar novo ponto turístico' })
@ApiResponse({ status: 201, description: 'Ponto turístico criado' })
@Post()
async create(@Body() dto: CreateTouristPointDto) {
  return this.service.create(dto);
}
```

### Frontend (Next.js)

- Use TypeScript
- Componentes funcionais com hooks
- Use Tailwind para estilização
- Mantenha componentes pequenos e reutilizáveis
- Use Server Components quando possível (Next.js 14)

Exemplo:
```typescript
export default function Card({ title, description }: CardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
```

### Banco de Dados (Prisma)

- Nomeie modelos no singular (User, TouristPoint)
- Use camelCase para campos
- Sempre adicione índices para campos de busca
- Documente relações complexas

## 🧪 Testes

- Escreva testes para novas funcionalidades
- Mantenha cobertura de testes acima de 80%
- Execute `npm test` antes de fazer commit

### Backend
```bash
cd backend
npm run test
npm run test:e2e
```

### Frontend
```bash
cd frontend
npm test
```

## 📚 Documentação

- Documente funções e classes complexas
- Atualize o README se adicionar novas funcionalidades
- Mantenha a documentação da API atualizada
- Adicione exemplos quando apropriado

## 🔍 Code Review

Todos os PRs passam por code review. Esteja preparado para:

- Responder a comentários e perguntas
- Fazer ajustes solicitados
- Discutir abordagens alternativas
- Aprender e ensinar

## 📞 Dúvidas?

Se você tiver qualquer dúvida:

- Abra uma issue com a label `question`
- Entre em contato via [email]
- Consulte a [documentação](README.md)

## 🎉 Reconhecimento

Contribuidores serão adicionados à lista de colaboradores do projeto!

---

**Obrigado por contribuir! Cada contribuição, por menor que seja, é muito valiosa! 🙏**
