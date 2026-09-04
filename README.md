# skills

Agent Skills para o [Claude Code](https://claude.com/claude-code) e outros agentes compatíveis.

Cada skill é uma pasta autocontida com um `SKILL.md` (frontmatter `name` + `description` e as
instruções) e, quando precisa de material extra, uma pasta `reference/` que o agente lê sob
demanda.

## Skills

| Skill | O que faz |
|---|---|
| [`feature-planning`](feature-planning/) | Planejamento de produto antes do código: PRD, one-pager, PR/FAQ, RFC, quebra em fatias verticais, critérios de aceite (EARS/Gherkin), priorização (RICE, ICE, MoSCoW, Kano, WSJF), roadmap (Now/Next/Later, outcome-based) e simulação de cenários de negócio. |

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
