# Security Policy

## 🔒 Reportando uma Vulnerabilidade de Segurança

A segurança do Turistar Sul é uma prioridade. Se você descobriu uma vulnerabilidade de segurança, pedimos que **NÃO** abra uma issue pública.

### Como Reportar

Por favor, reporte vulnerabilidades de segurança diretamente para:

- **Email**: security@turistarsul.com (ou seu email)
- **GitHub**: Use a aba "Security" → "Report a vulnerability"

### O que incluir no relatório

Para nos ajudar a entender e resolver o problema rapidamente, inclua:

1. **Descrição** da vulnerabilidade
2. **Passos para reproduzir** o problema
3. **Impacto potencial** da vulnerabilidade
4. **Versões afetadas** (se souber)
5. **Possíveis soluções** (se tiver)

### O que esperar

- **Confirmação**: Você receberá uma confirmação em até 48 horas
- **Análise**: Avaliaremos a vulnerabilidade em até 7 dias
- **Resolução**: Trabalharemos em uma correção o mais rápido possível
- **Divulgação**: Coordenaremos a divulgação pública com você

## 🛡️ Versões Suportadas

| Versão | Suportada          |
| ------ | ------------------ |
| 1.x    | ✅ Sim            |
| < 1.0  | ❌ Não            |

## 🔐 Boas Práticas de Segurança

### Para Desenvolvimento

- Nunca commite credenciais, chaves de API ou secrets
- Use variáveis de ambiente para dados sensíveis
- Mantenha dependências atualizadas
- Execute `npm audit` regularmente

### Para Produção

- Use HTTPS sempre
- Configure CORS adequadamente
- Use senhas fortes e JWT secrets complexos
- Implemente rate limiting
- Mantenha logs de auditoria
- Faça backups regulares

### Configuração Segura

```env
# ❌ NUNCA faça isso
JWT_SECRET=123456
DATABASE_URL=postgres://user:password@localhost:5432/db

# ✅ Use secrets seguros
JWT_SECRET=seu_secret_jwt_muito_complexo_e_aleatorio_aqui
DATABASE_URL=postgres://usuario:senha_forte@host:5432/db
```

## 🚨 Vulnerabilidades Conhecidas

Nenhuma vulnerabilidade conhecida no momento.

## 📜 Política de Divulgação

- Vulnerabilidades críticas são corrigidas em até 7 dias
- Vulnerabilidades altas são corrigidas em até 30 dias
- Vulnerabilidades médias/baixas são corrigidas no próximo release

Após a correção ser implementada e testada:
1. Release com a correção é publicado
2. Vulnerability advisory é publicado no GitHub
3. Usuários são notificados via release notes

## 🙏 Agradecimentos

Agradecemos a todos que reportam vulnerabilidades de forma responsável.

---

**Obrigado por ajudar a manter o Turistar Sul seguro!** 🔒
