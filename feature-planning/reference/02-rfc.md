# RFC / design doc técnico

Escreva um RFC quando existe **decisão técnica não óbvia**: mais de um caminho plausível,
mudança difícil de reverter, impacto em outros times, ou custo/risco alto. Feature com
caminho único e óbvio não precisa de RFC — vá direto para a quebra.

Objetivo do RFC não é documentar, é **obter revisão antes de gastar semanas na direção errada**.

## Template

```markdown
# RFC-<n>: <título>
Status: rascunho | em revisão | aceito | rejeitado | substituído por RFC-<n>
Autor: · Revisores: · Data: · PRD relacionado:

## Resumo
1–2 parágrafos. O que se propõe, sem entrar em "por quê" nem "como". Quem lê só isso já
entende a intenção.

## Contexto / Background
2 parágrafos a 1 página. Como o sistema funciona hoje, o que mudou, por que agora.
Suficiente para alguém novo no projeto entender sem perguntar.

## Problema
O que exatamente está quebrado ou faltando, com o sintoma observável e, quando houver,
número (latência, custo, taxa de erro, horas de trabalho manual).

## Objetivos e não-objetivos
Lista. Não-objetivos evitam a metade das discussões de revisão.

## Proposta
O desenho. Diagrama quando o fluxo tem mais de 3 saltos. Cubra:
- modelo de dados / mudanças de schema e migração
- APIs e contratos (assinatura, erros, compatibilidade)
- fluxo de dados e pontos de falha
- concorrência, idempotência, limites de taxa
- segurança: autenticação, autorização, dados sensíveis, superfície nova
- observabilidade: o que logar, qual métrica e qual alerta
- performance esperada e o gargalo conhecido

## Alternativas consideradas
Pelo menos duas, cada uma com o motivo da rejeição em uma frase. Inclua sempre
"não fazer nada" e "usar solução pronta / dependência existente".

## Impacto
Sistemas e times afetados. Compatibilidade retroativa. Custo de infraestrutura.
Trabalho de migração. O que fica mais difícil depois desta decisão.

## Plano de implementação
Fases entregáveis, com o que dá para colocar em produção em cada uma. Feature flag.
Plano de rollback. Critério de "pronto".

## Riscos e questões em aberto

## FAQ
Perguntas que os revisores farão, respondidas antes.

## Apêndice
Diagramas longos, benchmarks, dados brutos.
```

## Regras

- **Duas alternativas rejeitadas, no mínimo.** Só considerar a própria proposta significa
  que a análise não aconteceu.
- Reversibilidade define profundidade: decisão fácil de desfazer merece meia página;
  formato de dados persistidos ou contrato público merece o documento inteiro.
- Nomeie o custo de manutenção, não só o de construção.
- Ao propor uma dependência nova, justifique contra: stdlib, recurso nativo da plataforma,
  dependência que o projeto já tem.
- Numere os RFCs e mantenha os rejeitados no repositório — o valor está em não reabrir a
  discussão daqui a um ano.

## Modo de falha frequente

RFC escrito depois de o código estar pronto. Vira teatro de revisão. Se aconteceu, seja
explícito: `Status: aceito (documentação retroativa da implementação em <PR>)`.
