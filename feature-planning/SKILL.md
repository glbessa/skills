---
name: feature-planning
description: >-
  Planejamento de produto e de funcionalidades com IA, antes de escrever código. Use para
  escrever PRD, one-pager, PR/FAQ (working backwards), RFC / design doc técnico, quebrar uma
  funcionalidade em fatias verticais entregáveis, escrever critérios de aceite (EARS e
  Gherkin), priorizar backlog (RICE, ICE, MoSCoW, Kano, WSJF, opportunity scoring), montar um roadmap
  (Now/Next/Later, outcome-based), montar
  cenários de uso e edge cases, e simular cenários de negócio (unit economics, pre-mortem,
  red team da decisão). Também para revisar/auditar um documento de planejamento existente.
  Triggers: "PRD", "one-pager", "PR/FAQ", "working backwards", "RFC", "design doc",
  "documento técnico", "especificação", "spec", "quebrar a feature", "dividir em tarefas",
  "fatiar história", "user story", "critério de aceite", "acceptance criteria", "priorizar
  backlog", "o que construir primeiro", "RICE", "roadmap", "now next later", "roadmap
  trimestral", "o que vem depois", "planejar o trimestre", "cenários de uso", "casos de uso",
  "edge cases", "simular cenário de negócio", "vale a pena construir", "pre-mortem",
  "planejar funcionalidade", "escopo do MVP", "revisar meu PRD".
---

# Planejamento de funcionalidades

Transformar uma ideia vaga ("quero fazer X") em documentos que um humano aprova e um agente
consegue implementar sem inventar. Este skill cobre a fase **antes do código**.

## Escolha do modo

Não rode tudo. Escolha pelo que falta:

| Situação | Modo | Referência |
|---|---|---|
| Ideia crua, não se sabe se vale a pena | **Discovery** → one-pager ou PR/FAQ | `reference/01-produto.md` |
| Decidido construir, falta o "o quê / por quê" | **PRD** | `reference/01-produto.md` |
| Falta o "como" técnico, há trade-off real | **RFC** | `reference/02-rfc.md` |
| Documento pronto, falta virar trabalho | **Quebra + critérios de aceite** | `reference/03-quebra.md` |
| Muitas coisas para fazer, pouca capacidade | **Priorização** | `reference/04-priorizacao.md` |
| Já priorizado, falta ordem no tempo e o porquê de cada aposta | **Roadmap** | `reference/06-roadmap.md` |
| Dúvida sobre impacto/risco de negócio | **Simulação** | `reference/05-simulacao.md` |
| Já existe um doc e quer crítica | **Auditoria** (seção abaixo) | a referência do tipo do doc |

Fluxo completo típico: `one-pager → PRD → RFC (só se houver decisão técnica não óbvia) →
quebra em fatias → critérios de aceite → priorização → roadmap`.

Priorização ordena itens comparáveis; roadmap comunica a ordem, o resultado que cada aposta
persegue e o que ficou de fora. Um não substitui o outro.

## Regras que valem em todos os modos

1. **Problema antes de solução.** Se o primeiro parágrafo não responde "por que isso existe",
   o documento está errado. Feature sem problema declarado é candidata a não ser construída.
2. **O documento mais barato que resolve.** One-pager de 1 página > PRD de 4 páginas >
   PRD + RFC. Escolha o menor degrau que sustenta a decisão. Preview rápido geralmente
   precisa só de: objetivo, usuário, critério de sucesso, modos de falha.
3. **Não-escopo é obrigatório.** Toda seção de escopo lista o que **não** entra. Sem isso o
   agente (e o dev) preenchem o vazio com invenção.
4. **PRD não contém implementação; RFC não contém justificativa de produto.** Se estiver
   escrevendo schema de banco no PRD, mova para o RFC.
5. **Marque o que é suposição.** Todo número não medido vai com `[suposição]` e a pergunta
   que o validaria. Nunca invente métrica, volume de usuários, receita ou benchmark.
6. **Pergunte antes de assumir o que só o usuário sabe:** quem é o usuário, qual a métrica
   que importa, qual o prazo, o que já existe no produto. No máximo 3–5 perguntas, em bloco,
   com sua melhor hipótese ao lado de cada uma para o usuário só corrigir.
7. **Escreva em pt-BR**, termos técnicos e identificadores no original.
8. **Leia o código antes de planejar sobre ele.** Se o projeto existe, confirme o que já está
   construído em vez de propor algo que já tem. Reaproveite o que existe.

## Saída

Um arquivo Markdown por documento, em `docs/` ou `planning/` do projeto (confirme o caminho
se não houver convenção). Nome: `prd-<slug>.md`, `rfc-<slug>.md`, `plano-<slug>.md`, `roadmap-<produto>.md`.
Documento longo que o usuário vai compartilhar com o time → ofereça publicar como Artifact.

Documentos versionados como código: cabeçalho com `status: rascunho | em revisão | aprovado |
implementado`, autor, data e link para o doc pai (PRD → RFC → tarefas).

## Modo auditoria

Ao revisar um doc existente, devolva uma lista ordenada por severidade, uma linha por achado:
`seção: problema. correção.` Procure, nesta ordem:

1. Problema ausente, vago ou que é na verdade uma solução disfarçada.
2. Métrica de sucesso ausente, ou não mensurável com o que existe hoje.
3. Escopo sem não-escopo; escopo que não cabe no prazo declarado.
4. Números sem fonte apresentados como fato.
5. Alternativas não consideradas (RFC sem 2 alternativas rejeitadas = não houve análise).
6. Critérios de aceite não testáveis ("deve ser rápido", "boa UX").
7. Modos de falha e caminho de erro ausentes.
8. Detalhe de implementação demais para um PRD / justificativa de produto demais num RFC.

Roadmap tem sua própria lista de achados em `reference/06-roadmap.md`.

Não reescreva o documento inteiro sem pedido — aponte e ofereça corrigir.
