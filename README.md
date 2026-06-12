# ⚽ 7a0 — Cola de Overalls

Cola de referência para o modo **Memory** do **[7a0 — Sete a Zero](https://7a0.com.br)**: no modo Memory os overalls ficam ocultos e você precisa confiar na memória. Este almanaque permite consultar os overalls de todos os elencos catalogados antes ou durante o draft.

**[🔴 Acessar →](https://seu-usuario.github.io/world-cup-overalls)**

---

## O que é o 7a0?

[7a0](https://7a0.com.br) é um simulador de draft de futebol criado por um dev brasileiro, viral na preparação para a Copa 2026. Você sorteia seleções históricas e monta um time dos sonhos escolhendo um jogador por rodada.

- **Modo Clássico** — overalls visíveis, decisão baseada em dados
- **Modo Memory** — overalls ocultos, você precisa saber quem era bom

Este repositório é a cola para o modo Memory.

---

## Como os dados foram coletados

Os overalls foram extraídos jogando no **modo Clássico** com um script de console que lê o DOM a cada 600ms e cataloga cada elenco sorteado automaticamente:

```
Seleção sorteada → script lê .rr-sel, .rr-copa e todas as .pool-row
→ captura nome, posição e overall de cada jogador
→ exporta CSV: Seleção, Copa, Jogador, Posição, Overall
```

O script está em [`catalogador.js`](catalogador.js) — cole no console do navegador enquanto joga no modo Clássico.

> Os overalls são propriedade do 7a0 e podem mudar com atualizações do jogo.

---

## Cobertura atual

| | |
|---|---|
| **Seleções** | 50 países |
| **Elencos catalogados** | 219 |
| **Jogadores** | 4.913 registros |
| **Copas** | 1950 · 1954 · 1958 · 1962 · 1966 · 1970 · 1974 · 1978 · 1982 · 1986 · 1990 · 1994 · 1998 · 2002 · 2006 · 2010 · 2014 · 2018 · 2022 · 2026 |

---

## Usar a cola

Abra `index.html` com dois cliques — sem servidor, sem instalação, funciona offline.

```bash
git clone https://github.com/seu-usuario/world-cup-overalls.git
# abrir index.html no navegador
```

Ou acesse pelo GitHub Pages: `https://seu-usuario.github.io/world-cup-overalls`

---

## Contribuir com dados

Se você sortear um elenco que não está na cola, pode contribuir:

1. Cole [`catalogador.js`](catalogador.js) no console do 7a0 e jogue no modo Clássico
2. Clique em **Exportar CSV** ao final
3. Abra um Pull Request com o arquivo — ou rode localmente:

```bash
python update_data.py seu_arquivo.csv
```

---

## Estrutura do projeto

```
world-cup-overalls/
├── index.html          # Cola (HTML + CSS + JS, arquivo único, offline)
├── catalogador.js      # Script de coleta — cole no console do 7a0
├── update_data.py      # Incorpora novos CSVs à base
├── data/
│   └── overalls.json   # Base de dados em JSON
└── README.md
```

---

## Planos futuros

- [ ] **Extensão de navegador** — catalogador nativo, sem colar no console, com sync automático
- [ ] Cobertura completa de todos os elencos do jogo
- [ ] Overlay de consulta diretamente no 7a0 durante o draft

---

## Aviso

Projeto de fãs, sem afiliação com o 7a0. Visite e jogue em **[7a0.com.br](https://7a0.com.br)**.

MIT License
