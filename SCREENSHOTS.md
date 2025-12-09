# 📸 Screenshots & Demo

> **Nota**: Este arquivo contém exemplos visuais da aplicação Turistar Sul.

## 🎥 Demo Online

<!-- Adicione o link quando disponível -->
🔗 [Ver Demo ao Vivo](https://turistarsul-demo.example.com) *(em breve)*

## 📱 Interface do Usuário

### Dashboard Administrativo

<!-- Adicione screenshot aqui -->
*Dashboard com estatísticas e métricas em tempo real*

```
Funcionalidades:
- Visão geral de entidades pendentes
- Estatísticas de aprovações
- Gráficos de crescimento
- Métricas por cidade
```

### Sistema de Aprovação

<!-- Adicione screenshot aqui -->
*Interface de aprovação de novos cadastros*

```
Recursos:
- Visualização detalhada das solicitações
- Aprovação/Rejeição em um clique
- Sincronização automática com Notion
- Histórico de ações
```

### Lista de Pontos Turísticos

<!-- Adicione screenshot aqui -->
*Visualização de pontos turísticos cadastrados*

```
Características:
- Grid responsivo
- Filtros avançados
- Busca em tempo real
- Paginação eficiente
```

### Formulário de Cadastro

<!-- Adicione screenshot aqui -->
*Formulário intuitivo para novos cadastros*

```
Validações:
- Campos obrigatórios
- Validação de email
- Feedback instantâneo
- Upload de imagens (em desenvolvimento)
```

### Integração Notion

<!-- Adicione screenshot aqui -->
*Sincronização automática de dados com Notion*

```
Sincronização:
- Backup automático
- Relatórios detalhados
- Exportação de métricas
- Atualização em tempo real
```

### API Documentation (Swagger)

<!-- Adicione screenshot aqui -->
*Documentação interativa da API*

```
Recursos:
- Todos os endpoints documentados
- Teste direto na interface
- Exemplos de request/response
- Autenticação integrada
```

## 🎨 Temas e Responsividade

### Desktop
- Layout otimizado para telas grandes
- Navegação fluida
- Componentes organizados

### Tablet
- Interface adaptativa
- Menus responsivos
- Grid flexível

### Mobile
- Menu hambúrguer
- Cards otimizados
- Touch-friendly

## 🔄 Fluxo de Uso

1. **Registro/Login** → Usuário cria conta ou faz login
2. **Dashboard** → Visualiza painel de controle conforme role
3. **Cadastro** → Cria nova entidade (ponto turístico, restaurante, etc)
4. **Aprovação** → Admin revisa e aprova/rejeita
5. **Sincronização** → Dados aprovados vão para Notion automaticamente
6. **Relatórios** → Visualização de métricas e analytics

## 📊 Exemplos de Dados

### Ponto Turístico
```json
{
  "name": "Praia do Rosa",
  "description": "Uma das mais belas praias do sul do Brasil",
  "city": "Imbituba",
  "state": "SC",
  "category": "Praia",
  "status": "approved"
}
```

### Restaurante
```json
{
  "name": "Restaurante do Mar",
  "description": "Especializado em frutos do mar frescos",
  "city": "Florianópolis",
  "cuisine": "Frutos do Mar",
  "status": "pending"
}
```

## 🎬 Vídeos Tutorial

<!-- Adicione links para vídeos quando disponível -->

- [ ] Como fazer o primeiro login
- [ ] Como cadastrar um ponto turístico
- [ ] Como aprovar solicitações (Admin)
- [ ] Como configurar integração Notion
- [ ] Como visualizar relatórios

## 💡 Dicas de UX/UI

- Interface limpa e moderna com Tailwind CSS
- Componentes reutilizáveis com shadcn/ui
- Feedback visual em todas as ações
- Loading states em requisições
- Mensagens de erro amigáveis
- Confirmações em ações críticas

---

**Para adicionar screenshots**: 
1. Tire prints da aplicação
2. Salve em `docs/images/`
3. Adicione referências neste arquivo usando `![Alt Text](docs/images/filename.png)`
