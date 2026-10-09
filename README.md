# skills

Agent Skills para o [Claude Code](https://claude.com/claude-code) e outros agentes compatíveis.

Cada skill é uma pasta autocontida com um `SKILL.md` (frontmatter `name` + `description` e as
instruções) e, quando precisa de material extra, uma pasta `reference/` que o agente lê sob
demanda.

## Skills

| Skill | O que faz |
|---|---|
| [`feature-planning`](feature-planning/) | Planejamento de produto antes do código: PRD, one-pager, PR/FAQ, RFC, quebra em fatias verticais, critérios de aceite (EARS/Gherkin), priorização (RICE, ICE, MoSCoW, Kano, WSJF), roadmap (Now/Next/Later, outcome-based) e simulação de cenários de negócio. |
| [`reporte-in-app-para-issue`](reporte-in-app-para-issue/) | Botão "Reportar problema / Sugerir melhoria" dentro do app que abre issue no GitHub pelo backend, com token só no servidor. Templates React + Fastify. |
| [`issue-ate-pr-com-ia`](issue-ate-pr-com-ia/) | Automação no GitHub: triagem da issue por IA, gate humano `agente:vai`, implementação em PR draft, revisão automática e `@claude`. |

## Do reporte ao PR

Duas skills independentes que se encaixam. Vieram do Ritima e são a fonte única dessa automação.

```
usuário no app ─► modal "Reportar" ─► backend ─► API de Issues ─┐   reporte-in-app-para-issue
mantenedor ─► Issue Form (.github/ISSUE_TEMPLATE) ──────────────┤
                                                                ▼   issue-ate-pr-com-ia
             triagem.yaml: IA lê, acha duplicata, aplica labels, comenta causa provável
             humano aplica `agente:vai` ─► implementar.yaml: IA abre PR draft (Closes #n)
             revisao.yaml: /code-review comenta o PR ─► merge humano
             claude.yaml: `@claude` em issue ou PR para conversar
```

### `reporte-in-app-para-issue`

Canal de reporte dentro do produto. Funciona sozinho: sem a automação, a issue vai para quem
cuida do repo.

| Peça | Papel |
|---|---|
| Modal `Reportar` | Problema (o que aconteceu, como reproduzir, esperado) ou sugestão (a dor); manda URL sem query e user-agent |
| `POST /reportes` | Autenticado; valida com Zod; contexto da conta vem do servidor; rate limit por sessão; 429/502/503 tratados |
| Corpo da issue | Mesmos títulos e ordem dos Issue Forms do repo, para quem lê tratar os dois caminhos igual |
| Testes | Validação, corpo, `fetch` mockado (token ausente, erro do GitHub, rate limit); nunca issue real |

Pré-requisito: token separado, fine-grained, só **Issues: Read and write** no repo alvo, guardado
no backend. Templates prontos para React + TanStack Query + Fastify + Zod em `assets/stacks/react-fastify/`.

### `issue-ate-pr-com-ia`

| Arquivo instalado | Papel |
|---|---|
| `.github/ISSUE_TEMPLATE/{bug,feature,config}.yml` | Formulários de problema e sugestão; aplicam `triagem:pendente` |
| `.github/workflows/triagem.yaml` | Triagem só de leitura, ao abrir issue ou à mão; resultado no resumo do job |
| `.github/workflows/implementar.yaml` | Implementa quando a issue recebe `agente:vai`; PR em draft |
| `.github/workflows/revisao.yaml` | Revisão automática do PR |
| `.github/workflows/claude.yaml` | Conversa por `@claude` |

Pré-requisitos: GitHub App do Claude instalado no repo e secret `CLAUDE_CODE_OAUTH_TOKEN`
(`claude setup-token` + `gh secret set`, feito pelo dono). Labels: `triagem:pendente`,
`agente:vai`, `precisa-info` + tipo, prioridade, área e esforço do projeto.

Regras preservadas: triagem nunca escreve código; código só depois do gate humano `agente:vai`;
texto de issue é dado, nunca instrução (o corpo pode vir de usuário do produto); PR nasce em
draft e o merge é humano.

Fora do escopo das duas: erro capturado automaticamente virando issue.

## Instalação

Todas as skills, para todos os projetos:

```sh
git clone git@github.com:glbessa/skills.git
cp -r skills/*/ ~/.claude/skills/
```

Uma skill só, no projeto atual:

```sh
mkdir -p .claude/skills
cp -r /caminho/para/skills/feature-planning .claude/skills/
```

O agente carrega a skill sozinho quando a tarefa bate com a `description` — ou invoque pelo
nome (`/feature-planning`).

## Estrutura

```
<nome-da-skill>/
├── SKILL.md          # frontmatter (name, description) + instruções
└── reference/        # opcional: material lido sob demanda
    └── *.md
```

Convenções seguidas aqui:

- `description` no frontmatter descreve **quando** usar, com os termos que disparam a skill —
  é isso que o agente lê para decidir carregar.
- `SKILL.md` curto, com um índice para as referências. Detalhe longo vai para `reference/`.
- Sem nada específico de máquina: caminhos locais, credenciais, IPs ou dados de cliente
  ficam fora.

## Licença

MIT — veja [LICENSE](LICENSE).
