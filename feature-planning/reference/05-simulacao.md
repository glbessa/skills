# Simulação de cenários de negócio

Objetivo: testar a decisão em papel antes de gastar semanas. Toda simulação aqui é
**explicitamente hipotética** — nunca apresente saída de modelo como dado de mercado.
Cada número tem origem: `[medido]`, `[estimado por X]` ou `[suposição]`.

## 1. Modelo de unit economics

Monte a menor planilha mental que decide:

```
Receita por usuário/mês   = preço × taxa de conversão
Custo variável por usuário = infra + LLM + provedores + suporte
Margem de contribuição     = receita − custo variável
CAC                        = custo de aquisição
Payback (meses)            = CAC / margem de contribuição
LTV                        = margem × meses de retenção esperados
```

Para feature com LLM, o custo variável precisa de: tokens de entrada × tokens de saída ×
preço por milhão × chamadas por usuário por mês, mais retentativas e avaliações. É o item que
mais quebra margem em escala — calcule para o usuário mediano **e** para o percentil 95.

Saída: tabela com três colunas — **pessimista / base / otimista** — e a única variável que
mais move o resultado (faça sensibilidade nela: ±50%).

## 2. Cenários "e se"

Três a cinco, sempre incluindo:
- **Sucesso demais** — 10× do volume esperado. O que quebra primeiro: custo, banco, suporte,
  fila, limite de taxa de um provedor?
- **Adoção fraca** — 10% do esperado. Em quanto tempo se percebe, e qual o critério de matar?
- **Concorrente copia em 3 meses** — o que ainda nos sustenta?
- **Provedor muda** — preço dobra, API descontinua, conta suspensa. Qual o plano B?
- **O caso feio** — usuário mal-intencionado, dado sensível vazando, uso abusivo do custo.

Cada cenário: gatilho observável → efeito → decisão preparada.

## 3. Pre-mortem

"Estamos 6 meses no futuro e isto fracassou. O que aconteceu?" Liste 5–10 causas, ordene por
probabilidade × dano, e para as três primeiras defina o **sinal antecipado** que apareceria
antes do fracasso e o que fazer ao vê-lo. É o exercício com melhor relação custo/benefício
deste arquivo.

## 4. Red team da decisão

Ataque a própria proposta de ângulos fixos, sem suavizar:
- **Premissa** — qual número, se estiver errado por 2×, derruba tudo?
- **Alternativa mais barata** — algo manual, planilha, ou uma dependência existente resolve
  80% por 5% do custo?
- **Custo de oportunidade** — o que o time não vai fazer por causa disto?
- **Manutenção** — quem cuida disto daqui a um ano; quanto custa por mês estar de pé?
- **Distribuição** — mesmo funcionando, como o usuário descobre? Feature que ninguém acha
  tem valor zero.
- **Reversibilidade** — se der errado, dá para desligar? Dados migrados são desmigráveis?

Devolva os achados como lista ordenada por gravidade, com a versão mais forte de cada crítica.
Não termine com "mas no geral é uma boa ideia" — o usuário decide isso.

## 5. Simulação de comportamento de usuário (opcional, com aviso)

Para explorar reação a preço, posicionamento ou fluxo, é possível encenar personas e percorrer
o cenário. Vale como **gerador de hipóteses e de perguntas para entrevista**, nunca como
evidência. Sempre rotule: `Simulação — não é dado de usuário real.` Se a decisão depende disso,
a recomendação correta é falar com 5 clientes.

## Critério de decisão

Feche toda simulação com:
- **Vamos / não vamos / vamos com escopo reduzido**, e a razão em uma frase.
- **O que precisamos saber antes de commitar** e o teste mais barato para descobrir.
- **Critério de morte** — o número e a data em que desligamos isto se não funcionar.
