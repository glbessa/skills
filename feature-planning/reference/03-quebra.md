# Quebra em fatias, cenários e critérios de aceite

## Fatia vertical, nunca horizontal

Cada fatia atravessa todas as camadas (UI → lógica → persistência) e entrega algo utilizável.
Quebrar por camada ("story do backend", "story do frontend") falha em *independente* e em
*valioso* — nada é entregável até a última peça.

Teste da fatia: *se só ela for para produção, alguém consegue fazer algo que não conseguia?*
Se a resposta for não, não é uma fatia — é uma tarefa dentro de uma fatia.

## Nove padrões de divisão

Aplique o primeiro que couber:

1. **Passos do fluxo** — construa o caminho ponta a ponta mais simples primeiro; passos
   intermediários viram fatias seguintes.
2. **Operações (CRUD)** — "gerenciar X" vira criar / listar / editar / excluir.
3. **Variação de regra de negócio** — cada regra de complexidade parecida vira uma fatia.
4. **Variação de dados** — comece com o modelo de dado mais simples; tipos/segmentos extras
   depois.
5. **Forma de entrada** — UI mínima que funciona primeiro; interação sofisticada depois.
6. **Esforço principal** — quando quase todo o trabalho está numa peça, faça-a primeiro e
   deixe as dependentes explícitas.
7. **Simples/complexo** — extraia o caso central; variações e exceções viram itens separados.
8. **Adiar performance** — "fazer funcionar" e "fazer rápido" são duas fatias.
9. **Spike** — quando a incerteza impede quebrar, uma investigação com tempo fixo (timebox)
   e uma pergunta a responder.

**Heurística de escolha:** prefira a divisão que (a) permite jogar fora ou despriorizar uma
das partes — geralmente revela funcionalidade de baixo valor; e (b) gera fatias de tamanho
parecido, que dá liberdade de priorizar.

## INVEST

Cada fatia: **I**ndependente · **N**egociável · **V**aliosa · **E**stimável ·
**S**mall (cabe em poucos dias) · **T**estável. Duas ou mais letras falhando → quebre de novo
ou junte de volta.

## Formato do item

```markdown
### <verbo + objeto> (fatia N de M)
**Para** <usuário> **que** <situação>, **quando** <ação>, **então** <resultado>.
Depende de: · Estimativa: · Flag:
Critérios de aceite: (abaixo)
Fora desta fatia:
```

## Critérios de aceite

Duas notações, usos diferentes — combine na mesma feature.

### EARS — para regras de sistema
Sintaxe restrita, cada requisito com zero-ou-mais pré-condições, zero-ou-um gatilho, um nome
de sistema e uma ou mais respostas. Cinco padrões:

| Padrão | Forma |
|---|---|
| Ubíquo | `O <sistema> deve <resposta>.` |
| Dirigido a evento | `Quando <gatilho>, o <sistema> deve <resposta>.` |
| Dirigido a estado | `Enquanto <estado>, o <sistema> deve <resposta>.` |
| Opcional | `Onde <recurso presente>, o <sistema> deve <resposta>.` |
| Indesejado | `Se <condição indesejada>, então o <sistema> deve <resposta>.` |

Combinado: `Enquanto <estado>, quando <gatilho>, o <sistema> deve <resposta>.`

Exemplo: `Se o pagamento for recusado pelo provedor, então o sistema deve manter o pedido em
"aguardando pagamento" e enviar uma notificação ao comprador em até 1 minuto.`

EARS é a melhor entrada para um agente de código: sem ambiguidade e diretamente testável.

### Gherkin — para comportamento e jornada
```gherkin
Cenário: <nome do que está sendo verificado>
  Dado <contexto inicial>
  Quando <ação do usuário>
  Então <resultado observável>
```
Descreve comportamento, nunca implementação. Um cenário por comportamento; se tem mais de
uma ação "Quando", são dois cenários.

### Checklist — para campos, validações, permissões
Lista simples de condições verificáveis. Não force Gherkin em regra de validação de formulário.

## Cenários de uso: a lista mínima

Para cada fatia, escreva pelo menos:
- **Caminho feliz** — o uso pretendido, uma vez.
- **Primeiro uso** — estado vazio, sem dados, sem histórico.
- **Erro do usuário** — entrada inválida, ação repetida, cancelamento no meio.
- **Erro do sistema** — rede caiu, dependência fora, timeout, resposta parcial.
- **Permissão** — quem não pode ver/fazer, e o que vê no lugar.
- **Escala** — 0 itens, 1 item, 10 mil itens.
- **Concorrência** — duas pessoas (ou duas abas) na mesma coisa ao mesmo tempo.
- **Saída/reversão** — desfazer, excluir, exportar, cancelar assinatura.

Feature com LLM acrescenta: modelo indisponível, saída fora do formato, saída ofensiva ou
errada, usuário discorda do resultado, custo estourando o orçamento.
