"""
update_data.py
==============
Adiciona novos elencos ao projeto world-cup-overalls.

Uso:
    python update_data.py novo_elenco.csv

O CSV deve ter as colunas: Jogador, Seleção, Copa, Posição, Overall

Após rodar, substitua o conteúdo do objeto DATA em index.html
pelo conteúdo gerado em data/overalls.json.
"""

import json
import sys
import re
import pandas as pd
from pathlib import Path

DATA_PATH = Path(__file__).parent / "data" / "overalls.json"
HTML_PATH = Path(__file__).parent / "index.html"


def load_data():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_data(data):
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ data/overalls.json atualizado.")


def update_html(data):
    """Injeta o JSON atualizado diretamente no index.html."""
    html = HTML_PATH.read_text(encoding="utf-8")
    new_js = "const DATA = " + json.dumps(data, ensure_ascii=False)
    html_new = re.sub(r"const DATA = \{.*?\};", new_js + ";", html, flags=re.DOTALL)
    if html_new == html:
        print("⚠️  Não foi possível localizar 'const DATA' no index.html. Atualize manualmente.")
    else:
        HTML_PATH.write_text(html_new, encoding="utf-8")
        print("✅ index.html atualizado.")


def add_csv(csv_path, data):
    df = pd.read_csv(csv_path)
    required = {"Jogador", "Seleção", "Copa", "Posição", "Overall"}
    missing = required - set(df.columns)
    if missing:
        print(f"❌ Colunas faltando no CSV: {missing}")
        sys.exit(1)

    added_combos = set()
    skipped = 0

    for _, row in df.iterrows():
        country = str(row["Seleção"]).strip()
        year = str(int(row["Copa"]))
        player = {
            "nome":    str(row["Jogador"]).strip(),
            "posicao": str(row["Posição"]).strip(),
            "overall": int(row["Overall"]),
        }

        if country not in data:
            data[country] = {}
        if year not in data[country]:
            data[country][year] = []
            added_combos.add(f"{country} {year}")

        # Evita duplicatas pelo nome
        if any(p["nome"] == player["nome"] for p in data[country][year]):
            skipped += 1
            continue

        data[country][year].append(player)

    total_squads = sum(len(y) for y in data.values())
    total_players = sum(len(p) for y in data.values() for p in y.values())

    print(f"\n📋 Novos elencos adicionados: {len(added_combos)}")
    for c in sorted(added_combos):
        print(f"   + {c}")
    if skipped:
        print(f"⏭️  {skipped} jogadores ignorados (já existiam).")
    print(f"\n📊 Totais: {len(data)} países · {total_squads} elencos · {total_players} jogadores")

    return data


def main():
    if len(sys.argv) < 2:
        print("Uso: python update_data.py <arquivo.csv>")
        sys.exit(1)

    csv_path = Path(sys.argv[1])
    if not csv_path.exists():
        print(f"❌ Arquivo não encontrado: {csv_path}")
        sys.exit(1)

    data = load_data()
    data = add_csv(csv_path, data)
    save_data(data)
    update_html(data)


if __name__ == "__main__":
    main()
