# ⚽ 7a0 Almanaque — Overalls dos Mundiais

Cola de referência para o jogo **[7a0 — Sete a Zero](https://7a0.com.br)**: consulte os overalls completos de todos os elencos disponíveis no modo Clássico, por seleção e edição da Copa.

**[🔴 Ver o almanaque →](https://seu-usuario.github.io/world-cup-overalls)**

---

## O que é isso?

[7a0](https://7a0.com.br) é um simulador de draft de futebol criado por um dev brasileiro, viral antes da Copa 2026. Você sorteia seleções históricas de Mundiais e monta um time dos sonhos escolhendo um jogador por rodada — cada jogador tem um **overall** que aparece no modo Clássico e fica oculto no modo Memory.

Este repositório é um **almanaque de referência** com todos os overalls catalogados diretamente do jogo. Útil para:

- Consultar overalls durante um draft sem precisar ter jogado aquela seleção antes
- Estudar plantéis antes de tentar o modo Memory
- Planejar estratégia de coringas sabendo quais seleções têm média baixa
- Contribuir com dados de elencos que ainda faltam

---

## Como os dados foram coletados

Os overalls são propriedade do jogo 7a0. Eles foram extraídos jogando no **modo Clássico** com um bookmarklet/script de console que lê o DOM a cada 600ms e cataloga automaticamente cada elenco sorteado:

```
Seleção sorteada → script lê .rr-sel, .rr-copa e todas as .pool-row
→ captura nome, posição e overall de cada jogador
→ exporta CSV com colunas: Seleção, Copa, Jogador, Posição, Overall
```

O script fica em [`catalogador.js`](catalogador.js) — cole no console do navegador enquanto joga em modo Clássico e ele cataloga cada elenco novo que aparecer, sem duplicatas. Ao final, clique em **Exportar CSV**.

> **Nota:** os dados refletem o estado do jogo na data de coleta. O 7a0 pode ajustar overalls a qualquer momento.

---

## Cobertura atual

| | |
|---|---|
| **Seleções** | 51 países |
| **Elencos catalogados** | 219 de ~X disponíveis no jogo |
| **Jogadores** | 4.913 registros |
| **Copas** | 1950 · 1954 · 1958 · 1962 · 1966 · 1970 · 1974 · 1978 · 1982 · 1986 · 1990 · 1994 · 1998 · 2002 · 2006 · 2010 · 2014 · 2018 · 2022 · 2026 |

A cobertura é parcial — o jogo tem mais elencos do que os catalogados até agora. Contribuições são bem-vindas.

---

## Usar o almanaque

Abra `index.html` com dois cliques. Sem servidor, sem instalação, funciona offline.

```bash
git clone https://github.com/seu-usuario/world-cup-overalls.git
# abrir index.html no navegador
```

Ou acesse direto pelo GitHub Pages: `https://seu-usuario.github.io/world-cup-overalls`

---

## Contribuir com dados

Se você sortear um elenco que não está no almanaque, pode contribuir:

**1. Cole o catalogador no console** enquanto joga no modo Clássico:

```
catalogador.js  ← cole o conteúdo deste arquivo no console do 7a0.com.br
```

**2. Jogue** até aparecerem elencos novos. O painel mostra o que foi catalogado.

**3. Clique em Exportar CSV** e abra um Pull Request com o arquivo.

**4. Ou rode o script de atualização** para incorporar ao almanaque:

```bash
python update_data.py seu_arquivo.csv
```

---

## Estrutura do projeto

```
world-cup-overalls/
├── index.html          # Almanaque (HTML + CSS + JS, arquivo único)
├── catalogador.js      # Script de coleta — cole no console do 7a0
├── update_data.py      # Incorpora novos CSVs ao almanaque
├── data/
│   └── overalls.json   # Base de dados completa em JSON
└── README.md
```

---

## Planos futuros

- [ ] **Extensão de navegador** — o catalogador rodando nativamente, sem precisar colar no console, com persistência entre sessões e sync automático com a base
- [ ] Cobertura de 100% dos elencos do jogo
- [ ] Alertas de tier S durante o draft (overlay no próprio 7a0)
- [ ] Filtro por overall mínimo e por posição no almanaque

---

## Tier list rápida (modo Clássico)

| Tier | Overall | Exemplos |
|------|---------|---------|
| **S** | 95–99 | Pelé 70, Messi 22, Maradona 86, Cruyff 74, Neuer 14, Zidane 06 |
| **A** | 90–94 | Xavi 10, Iniesta 10, Zico 82, Matthäus 90, Ronaldinho 06 |
| **B** | 80–89 | Titulares de seleções quartos-de-final |
| **C** | <80 | Use coringa se possível |

> No modo Memory: Pelé, Maradona, Messi e Cruyff nunca são escolha errada.

---

## Aviso

Este projeto é um recurso de fãs, sem afiliação com o 7a0. Os overalls são de propriedade do jogo — visite e jogue em **[7a0.com.br](https://7a0.com.br)**.

MIT License
