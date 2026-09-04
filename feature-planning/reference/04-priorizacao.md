# Priorização

Framework não decide — ele torna a discussão explícita e comparável. Escolha pela pergunta
que você está respondendo, não por moda.

| Pergunta | Framework |
|---|---|
| Qual destas apostas comparáveis rende mais por esforço? | **RICE** |
| Preciso decidir hoje, com pouca informação | **ICE** |
| O que cabe nesta release / neste prazo? | **MoSCoW** |
| Estou entregando básico demais ou encanto demais? | **Kano** |
| Onde o cliente está mal atendido? | **Opportunity scoring** |
| Ordem de fila com custo de atraso (times grandes) | **WSJF** |
| Estou perseguindo solução sem entender a necessidade? | **Opportunity solution tree** |

Usar 2–3 frameworks para situações diferentes é normal e melhor que forçar um só.

## RICE
`(Reach × Impact × Confidence) / Effort`

- **Reach** — quantas pessoas/eventos por período (mês, trimestre). Número real, do produto.
- **Impact** — 3 massivo · 2 alto · 1 médio · 0,5 baixo · 0,25 mínimo.
- **Confidence** — 100% (dado) · 80% (evidência parcial) · 50% (palpite informado).
  Abaixo de 50%: não pontue, faça um spike.
- **Effort** — pessoa-mês ou pessoa-semana, incluindo design, QA e migração.

Regra de higiene: número inventado com confiança alta é o modo de falha do RICE. Se Reach é
suposição, Confidence não pode ser 100%.

## ICE
`Impact × Confidence × Ease`, 1–10 cada. Rápido e subjetivo. Bom para fila de experimentos,
ruim para defender orçamento.

## MoSCoW
**Must** (release falha sem isso) · **Should** (importante, dói mas dá para adiar) ·
**Could** (se sobrar) · **Won't** (declarado fora, agora).
Serve para negociar escopo com stakeholder, não para ordenar backlog.
Sanidade: se mais de ~60% do esforço é "Must", ninguém priorizou nada.

## Kano
Classifica por efeito na satisfação: **Básico** (esperado; ausência irrita, presença não
encanta) · **Performance** (satisfação proporcional) · **Atrativo** (encanta, não é esperado)
· **Indiferente** · **Reverso** (piora para parte dos usuários).
Uso: garanta 100% dos Básicos antes de gastar em Atrativos; um Atrativo vira Básico com o
tempo (o concorrente copia).

## WSJF
`Custo do atraso / Tamanho do trabalho`, com custo do atraso = valor de negócio + urgência
temporal + redução de risco. Útil quando o timing importa (regulação, sazonalidade, contrato).

## Opportunity scoring
Pergunte ao usuário, por resultado desejado: **importância** (1–10) e **satisfação atual**
(1–10). `Oportunidade = Importância + max(Importância − Satisfação, 0)`.
Alto = importante e mal atendido. Encontra lacunas em vez de ranquear ideias já existentes.

## Opportunity solution tree
Quando a lista de features já veio pronta e ninguém sabe de onde veio:
```
Resultado (uma métrica)
└── Oportunidades (necessidades/dores de cliente, ditas por ele)
    └── Soluções (3+ por oportunidade, para comparar)
        └── Testes de suposição (o experimento mais barato)
```
Faça isso *antes* de pontuar RICE. Pontuar uma lista de soluções ruins só produz a melhor
solução ruim.

## Restrições que sobrepõem qualquer pontuação

Marque explicitamente e trate fora do ranking:
- obrigação legal / contratual / prazo externo;
- correção de segurança ou perda de dados;
- desbloqueio: item de score baixo que habilita três de score alto;
- dívida que está freando a entrega (meça o quanto, não use "é feio").

## Entrega do modo priorização

Tabela ordenada com as colunas do framework, o score, e **uma linha de justificativa por
item**. Depois: corte na capacidade real do ciclo e diga o que ficou de fora. Toda entrada
com número suposto marcada `[suposição]`.

Ordenado o backlog, o passo seguinte é comunicar a ordem: `06-roadmap.md`.
