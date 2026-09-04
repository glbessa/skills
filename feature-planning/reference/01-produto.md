# Documentos de produto: one-pager, PRD, PR/FAQ

## Qual usar

- **One-pager** — ideia pequena/rápida, time pequeno, decisão reversível. 1 página.
- **PRD** — feature que envolve mais de uma pessoa ou mais de uma semana. 2–4 páginas.
  PRD de 10 páginas não é lido; se está ficando grande, o escopo é que está grande.
- **PR/FAQ (working backwards)** — produto ou aposta nova, direção ainda em disputa. Escreve-se
  o anúncio de lançamento *antes* de construir; se o texto não empolga um cliente, a ideia é
  refeita ou morta antes de qualquer código.

## One-pager

```markdown
# <nome da feature>
Status: rascunho · Autor: · Data:

**Problema** — quem sofre o quê, hoje, e como sabemos disso.
**Proposta** — 3–5 linhas do que vamos fazer.
**Usuário** — para quem, e quem explicitamente não é o alvo.
**Sucesso** — a métrica única que sobe, e o número esperado.
**Modos de falha** — o que pode dar errado e como perceberíamos.
**Não faremos agora** — lista.
```

## PRD

Cinco seções são obrigatórias — Problema, Solução, Escopo, Abordagem técnica (alto nível),
Métricas de sucesso. O resto é opcional e só entra se mudar uma decisão.

```markdown
# PRD — <feature>
Status: · Autor: · Data: · RFC relacionado:

## 1. Problema
Qual dor, de quem, com que frequência, e a evidência (ticket, entrevista, número).
Custo de não fazer nada.

## 2. Usuários e contexto
Persona / segmento. Onde a feature aparece na jornada atual. O que a pessoa faz hoje
para contornar o problema.

## 3. Solução proposta
O comportamento do produto, em prosa e/ou fluxo. Sem schema, sem nome de biblioteca.
Estados: vazio, carregando, erro, sucesso, sem permissão.

## 4. Escopo
### Entra (v1)
### Não entra (e por quê / quando reconsiderar)

## 5. Requisitos
Lista numerada, cada um testável. Use EARS (ver 03-quebra.md) para regras de sistema.
Marque cada um: Must / Should / Could.

## 6. Abordagem técnica (alto nível)
Um parágrafo. Sistemas tocados, integrações, se precisa de RFC próprio.

## 7. Métricas de sucesso
Métrica primária + valor alvo + prazo de avaliação. Contra-métrica (o que não pode piorar).
Como será instrumentado — se não dá para medir hoje, instrumentar faz parte do escopo.

## 8. Riscos, suposições e questões em aberto
Cada suposição com o teste mais barato que a validaria. Questões abertas com dono e prazo.

## 9. Rollout
Flag? Beta com quem? Critério de rollback. Migração de dados existentes.
```

### Seções extras para feature com IA/LLM
Quando a feature usa modelo generativo, acrescente:
- **Critério de qualidade** — como se avalia uma saída boa; conjunto de avaliação (evals).
- **Alucinação e limites** — o que o modelo não pode afirmar; o que é verificado por código.
- **Fallback** — comportamento quando o modelo falha, demora ou recusa.
- **Sinais de confiança** — o que o usuário vê para saber que é IA e como corrigir.
- **Custo por interação** — tokens × preço × volume esperado (ver 05-simulacao.md).

## PR/FAQ

```markdown
# <Título do anúncio> — <subtítulo com o benefício para o cliente>
Data futura de lançamento:

## Press release (1 página, sem jargão)
- Parágrafo de abertura: o que foi lançado e para quem, em 2 frases.
- O problema, como o cliente o vive.
- A solução e por que só agora foi possível.
- Citação de um responsável (por que isso importa).
- Como começar a usar (2 frases).
- Citação de um cliente hipotético descrevendo o antes e o depois.

## FAQ do cliente
5–10 perguntas que o cliente realmente faria (preço, migração, privacidade, limites).

## FAQ interna
As perguntas difíceis: tamanho do mercado, canibalização, unit economics, por que nós,
o que fazemos se o concorrente copiar em 3 meses, o que quebra se der muito certo.
```

Teste do PR/FAQ: leia só o press release para alguém de fora. Se a reação for "e daí?",
a ideia ainda não está pronta.

## Erros comuns

- Detalhar implementação demais (vai para o RFC).
- Não ter métrica de sucesso → impossível saber se funcionou.
- Escrever a feature sem definir o problema.
- Escopo que não diz o que fica de fora.
- Usar o PRD como registro de decisões da reunião em vez de documento de decisão.
