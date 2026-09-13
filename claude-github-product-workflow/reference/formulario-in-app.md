# Formulário in-app de reporte

Implemente o caminho mais curto que mantém o token fora do navegador:

```text
usuário autenticado → modal no app → endpoint do próprio backend → API de Issues do GitHub
```

Não chame a API do GitHub diretamente do frontend e não exponha token em variável pública, bundle, HTML ou resposta da API.

## 1. Descoberta

Antes de editar, localize e reuse:

- modal/dialog, campos, botões, toast e cliente HTTP existentes;
- autenticação e contexto de usuário/organização no backend;
- validação, tratamento de erro e rate limit já instalados;
- registro de rotas, configuração de ambiente e padrão de testes;
- menu global ou central de ajuda acessível em desktop e celular.

Não adicione biblioteca se os recursos atuais cobrem o fluxo.

Para React + TypeScript + TanStack Query + Fastify + Zod, use os templates prontos descritos em [stack-react-fastify.md](stack-react-fastify.md).

## 2. Contrato

Aceite dois tipos:

- `problema`: título, descrição, passos para reproduzir e esperado versus obtido;
- `sugestao`: título e descrição da dor; proposta, aceite e fora de escopo podem ficar sem resposta.

Limites mínimos recomendados: título entre 5 e 120 caracteres; textos entre 10 e 4000; URL e user-agent até 500. Use a validação do projeto no backend como autoridade. O frontend deve espelhar limites para feedback imediato, nunca substituir a validação do servidor.

Retorne somente o necessário ao cliente:

```json
{ "numero": 123, "url": "https://github.com/owner/repo/issues/123" }
```

## 3. Frontend

- Ofereça uma ação global “Reportar problema” ou equivalente, alcançável no desktop e no menu mobile.
- Abra um dialog acessível com label real em cada campo, foco inicial, fechamento por teclado conforme o componente do projeto e sem rolagem horizontal no celular.
- Comece em `problema`. Ao trocar para `sugestao`, esconda passos e resultado esperado e mude o rótulo da descrição para a dor a resolver.
- Envie origem + caminho da tela e `navigator.userAgent` como pistas, deixando claro que são dados não confiáveis. Remova query e hash da URL para não vazar tokens ou parâmetros sensíveis na issue.
- Informe antes do envio qual contexto de conta o servidor acrescentará e peça para não inserir senha, token ou dado de cliente.
- Durante o envio, desabilite o submit e mostre estado “Enviando…”. Em sucesso, mostre o número da issue, limpe e feche o formulário. Em erro, mantenha os dados e dê mensagem acionável.
- Diferencie ao menos: indisponível/configuração ausente, excesso de envios (`429`) e falha temporária do GitHub. Não mostre resposta crua do provedor.

Use a solução de forms já instalada. Se não houver nenhuma e o formulário for pequeno, elementos HTML nativos com validação espelhada bastam; não introduza uma stack de forms só para esta tela.

## 4. Backend

Crie um endpoint autenticado, por exemplo `POST /reportes`:

1. valide e normalize o payload;
2. derive usuário, organização/tenant, e-mail e data no servidor — nunca aceite esse contexto do cliente;
3. aplique rate limit por conta ou sessão autenticada, não apenas por IP compartilhado;
4. monte o corpo Markdown com os mesmos títulos e ordem dos Issue Forms em `assets/.github/ISSUE_TEMPLATE/`;
5. faça `POST https://api.github.com/repos/{owner}/{repo}/issues` com `title`, `body` e labels;
6. aplique `triagem:pendente` e `bug` ou `enhancement`;
7. transforme erro do GitHub em falha controlada (`502` é adequado) e configuração ausente em indisponibilidade (`503`); registre status técnico no servidor sem vazar credenciais ao cliente.

O repositório alvo e o user-agent da integração devem ser configuração server-side. Se o projeto atende múltiplas instalações, valide o destino contra uma allowlist; nunca aceite `owner/repo` arbitrário no payload.

Mantenha o serviço disponível quando o token faltar: somente o endpoint de reporte deve responder indisponível.

## 5. Corpo da issue e segurança

O corpo deve convergir com o Issue Form para que a triagem processe reportes manuais e in-app do mesmo jeito. Exemplo para bug:

```markdown
### O que aconteceu

...

### Como reproduzir

...

### Esperado x obtido

...

### Onde

...

### Ambiente

Tela: ...
Navegador: ...

---

### Contexto (preenchido pelo sistema)

Organização: ...
Usuário: ...
Enviado em: ...
```

- Preserve texto do usuário como conteúdo; não o interprete nem execute no backend.
- O workflow de triagem deve continuar tratando todo esse conteúdo como dado não confiável.
- Colete o mínimo contexto necessário. Só envie identificadores pessoais ao GitHub se o repositório for privado, a equipe precisar deles para investigar e a interface avisar o usuário.
- Não aceite anexos na primeira versão. Adicione upload privado e links expirados somente quando evidências em texto forem insuficientes.

## 6. Credencial

Use uma credencial exclusiva para abrir issues, diferente de `CLAUDE_CODE_OAUTH_TOKEN`. Prefira fine-grained PAT limitado ao repositório alvo, com apenas **Issues: Read and write**, guardado no secret manager de produção e exposto somente ao backend.

O agente pode adicionar a variável ao schema e ao arquivo `*.example`, mas nunca ler `.env`, imprimir o valor ou inventá-lo. Para configurar produção, siga o mecanismo de secrets já estabelecido pelo projeto e peça o valor ao usuário no ponto necessário.

## 7. Verificação mínima

Deixe checks que falhem se o contrato quebrar:

- unitário: validação condicional de bug versus sugestão e formatação das seções Markdown;
- integração do backend com `fetch` mockado: autenticação, payload/labels, token ausente, erro do GitHub e rate limit;
- browser/E2E: abre no desktop e mobile, alterna o tipo, envia, mostra número da issue, fecha em sucesso e não causa overflow horizontal.

Não abra issue real nos testes. Só faça smoke real contra o GitHub quando o usuário autorizar, pois ele dispara a triagem e consome cota.
