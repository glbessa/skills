# Variante React + Fastify

Use esta variante quando o projeto já tiver React, TypeScript, TanStack Query, Fastify e Zod. Ela também espera `@fastify/rate-limit`; instale-o somente se o backend ainda não tiver rate limit equivalente.

## Arquivos prontos

Copie de `assets/stacks/react-fastify/` para os diretórios equivalentes do projeto:

| Template | Destino sugerido | Adaptação necessária |
| --- | --- | --- |
| `web/src/componentes/Reportar.tsx` | componente global do frontend | imports de UI, toast e cliente HTTP |
| `web/src/reporte.ts` | helper do frontend | apenas vocabulário do produto, se necessário |
| `api/src/rotas/reportes.ts` | rotas do backend | imports, repositório, sessão e consulta de contexto |
| `api/src/rotas/reportes.test.ts` | testes da rota | runner/imports do projeto |
| `api/src/env.example.ts` | schema de ambiente existente | incorporar a propriedade; não copiar como módulo isolado |

Não sobrescreva helpers compartilhados. Faça os imports dos templates apontarem para `post`, `ErroApi`, dialog, campos, botão, erro e toast já existentes.

## Ligação mínima

1. Registre `rotasReportes` junto às demais rotas autenticadas do Fastify.
2. Garanta que o tratamento global converta validação Zod em `400`, rate limit em `429`, configuração ausente em `503` e falha do GitHub em `502`.
3. Acrescente `GITHUB_TOKEN_ISSUES` ao schema de ambiente como opcional, para a ausência desativar apenas esta rota.
4. Renderize `<Reportar>` uma vez no layout autenticado e abra-o por uma ação global visível no desktop e no menu mobile.
5. Ajuste os títulos Markdown de `corpoIssue` para permanecerem idênticos aos Issue Forms empacotados na skill.

O template usa HTML nativo para validação no frontend e Zod como autoridade no backend. Não adicione React Hook Form apenas para este formulário curto.

## Checks

Além do teste unitário incluído, acrescente ao teste de integração já usado pelo projeto os casos de sessão ausente, token ausente, payload e labels enviados ao `fetch`, erro do GitHub e sexta tentativa bloqueada pelo rate limit. No E2E existente, intercepte `/reportes`; não crie issue real.

Execute typecheck/build de frontend e backend, o teste da rota e o smoke mobile disponível. Procure `ADAPTAR` nos arquivos copiados antes de concluir: nenhum marcador deve permanecer no código do projeto alvo.
