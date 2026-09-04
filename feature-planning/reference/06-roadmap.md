# Roadmap

Roadmap não é lista de features com data. É a **ordem das apostas** e o resultado que cada
uma persegue. Se o documento pode ser substituído por um cronograma no Gantt sem perder
informação, ele não é um roadmap — é uma promessa de prazo.

Duas regras que valem sempre:

1. **Resultado é a unidade de planejamento, não feature.** Todo item traz a métrica que ele
   move. Item sem métrica é backlog, não roadmap.
2. **Detalhe cai com a confiança.** O que está longe é tema, não especificação. Detalhar um
   item de 6 meses é desperdício e vira compromisso acidental.

## Qual formato usar

| Situação | Formato |
|---|---|
| Produto em evolução, prioridades mudam, time pequeno | **Now / Next / Later** (padrão) |
| Precisa defender por que cada item existe (diretoria, investidor) | **Outcome-based por resultado** |
| Prazo externo real: contrato, regulação, sazonalidade, evento | **Timeline** — só para esses itens |
| Ninguém sabe de onde veio a lista de features | volte ao **opportunity solution tree** (`04-priorizacao.md`) |

Combinar Now/Next/Later com resultados é o caso normal: horizonte dá a ordem, o resultado
dá o porquê. Timeline só sobrevive onde a data é imposta de fora — e aí é uma restrição,
não um planejamento.

## Now / Next / Later

Os três horizontes são de **confiança**, não de calendário.

| Horizonte | O que é | Nível de detalhe |
|---|---|---|
| **Now** | Em execução ou próximo a entrar. Problema entendido, solução escolhida. | Resultado + métrica com alvo + responsável + riscos. Tem PRD/RFC. |
| **Next** | Problema aceito, solução ainda em hipótese. | Resultado + hipótese + dependências + o que precisa ser validado. |
| **Later** | Tema/direção. Pode não acontecer. | Uma linha. Sem estimativa, sem solução. |

Higiene:
- **Now cabe na capacidade real do ciclo.** Se tudo é Now, nada é Now.
- **Nada sobe de Later para Now sem passar por Next.** Se subiu, houve pressão, não evidência
  — registre isso.
- **Later é onde ideias morrem sem briga.** Aceitar em Later custa nada; prometer, custa.
- Cada horizonte com no máximo ~3–5 temas. Roadmap com 30 linhas ninguém lê nem usa para dizer não.

```markdown
# Roadmap — <produto>
Atualizado: <data> · Próxima revisão: <data> · Responsável:

## Resultados deste ciclo
- <resultado 1>: métrica <X> de <baseline> para <alvo>. [suposição] se o baseline não for medido.

## Now  — em execução
| Item | Resultado que move | Métrica / alvo | Dono | Risco principal | Doc |
|---|---|---|---|---|---|

## Next — provável, ainda em validação
| Item | Resultado | Hipótese a validar | Depende de |
|---|---|---|---|

## Later — direções, sem compromisso
- <tema> — por que está no radar, em uma linha.

## Fora do roadmap (declarado)
- <coisa pedida que não vamos fazer> — motivo.

## Mudanças desde a última revisão
- <o que entrou, saiu ou desceu de horizonte, e por quê>
```

## Outcome-based

Mesma coisa, invertida: agrupa por resultado em vez de horizonte. Use quando a pergunta do
leitor é "por que estamos fazendo isso?" e não "quando sai?".

```
Resultado: reduzir churn do plano X de 6% para 4% até o fim do ciclo
├── Oportunidade: usuário não percebe valor na 1ª semana   → Now:  onboarding guiado
├── Oportunidade: falha de pagamento derruba a conta       → Next: retry + aviso
└── Oportunidade: não sabe que o dado existe               → Later: relatório semanal
```

Se um item não pendura em nenhum resultado, ele não entra no roadmap — ou o conjunto de
resultados está incompleto (diga isso), ou o item é manutenção/dívida (trate em capacidade
reservada, não no roadmap).

## Datas

Só coloque data quando ela vem de fora (contrato, lei, evento, integração de terceiro) — e
marque como **restrição externa**, com a fonte. Data interna vira compromisso público na
primeira vez que alguém tira print do slide. Se o interlocutor exige data, dê faixa com o
nível de confiança e o que a estreitaria.

## Capacidade

Roadmap que assume 100% do time em features está errado antes de começar. Declare a divisão
do ciclo — algo como entrega / manutenção e dívida / discovery e imprevisto — com os números
reais do time. Sem isso, tudo atrasa e ninguém sabe explicar por quê.

## Revisão

Revise os horizontes mensalmente e os resultados a cada ciclo/trimestre. Mas evidência nova
e forte (cliente grande churnou, concorrente lançou, número não se moveu) reordena na hora —
esperar a data da revisão é ritual, não método. Toda revisão fecha com a seção
"Mudanças desde a última revisão" preenchida: roadmap sem histórico de mudança parece
estável quando na verdade está sendo reescrito em silêncio.

## Entrega do modo roadmap

Um `roadmap-<produto>.md` com o template acima. Toda métrica não medida marcada
`[suposição]` com a pergunta que a validaria. Itens Now devem apontar para o PRD/RFC
correspondente; se não existe, o item não é Now ainda.

## Auditoria de roadmap

1. Item sem métrica de resultado (é feature, não resultado).
2. Now maior que a capacidade do ciclo.
3. Data interna apresentada como compromisso.
4. Later detalhado demais (esforço gasto onde a confiança é baixa).
5. Nenhum item declarado fora — roadmap que só cresce não priorizou.
6. Sem seção de mudanças / sem data da próxima revisão.
7. Item que não pendura em nenhum resultado declarado.
8. 100% da capacidade em feature nova, sem dívida nem discovery.
