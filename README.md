# Fırat Student Assistant

> A local, open-source AI assistant for Fırat University students in Elazığ, powered by **Gemma 4** and running entirely on your own machine.

<!-- TODO: add a screenshot or GIF here: ![Demo](docs/demo.png) -->

## The problem

New university students get lost in long regulation PDFs, don't know how to write to a professor, can't find the right student club, and have to figure out city transport on their own. Answers exist, but they are scattered and boring to dig through.

## What it does

| Feature | Description | Status |
|---|---|---|
| Regulation Q&A | Ask a question in Turkish. The answer cites the exact regulation article (number + quote). If nothing relevant is found, it says "I don't know, ask this office: ..." | <!-- ✅ / 🚧 --> |
| Professor matching + email | Describe your idea, get the top 3 matching academics with reasons, then a polite email draft | |
| Club recommendation | Matches your interests to student clubs | |
| Cafeteria menu | Today's menu from `/menu/today` (no LLM needed) | |
| Transport | Dormitory → stop routes (line, transfer, minutes) explained in natural language | |
| City events | Hand-curated events filtered by interest | |

## Why Gemma 4 (and why an open model)

Gemma 4 runs locally through [Ollama](https://ollama.com). It is used for:

- **Regulation answers:** it only answers from the retrieved articles and cites them.
- **Email drafts:** polite, formal Turkish emails to professors.
- **Transport explanations:** turns a route table row into a natural sentence.

Why open instead of a closed API:

- **Privacy:** student profile data never leaves the computer.
- **Zero cost:** no API bills, works offline.
- **Regulation-grounded:** the model is constrained to retrieved articles, which reduces hallucination. The article it relied on is always shown in the UI.

## How it works

1. Regulations are split article by article (`MADDE N`) into `data/yonetmelik.json`.
2. Articles are embedded and stored in a vector index.
3. A question is embedded, the closest articles are retrieved, and Gemma 4 answers using only those articles.
4. If the similarity is below a threshold, the assistant refuses to guess.

<!-- TODO (A): confirm the embedding model, vector store and threshold used -->

## Installation

Requirements: Python 3.10+, [Ollama](https://ollama.com).

```bash
git clone https://github.com/<USERNAME>/<REPO>.git
cd <REPO>

# 1. Get the model (check the exact tag at ollama.com/library)
ollama pull <gemma-4-tag>

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the backend
uvicorn <module>:app --reload
```

<!-- TODO (A/B): replace the placeholders with the real commands, and add how to open the frontend -->

### Rebuilding the regulation data (optional)

```bash
python scripts/yonetmelik_hazirla.py
```

Add or change regulations in the `KAYNAKLAR` list inside the script.

## Data

All data is hand-prepared from public sources and lives in `data/`:

| File | Content |
|---|---|
| `yonetmelik.json` | Regulation articles (regulation, article no, text, source URL) |
| `hocalar.json` | Academics (public university pages only) |
| `kulupler.json` | Student clubs |
| `menu.json` | Cafeteria menu |
| `ulasim.json` | Dormitory × stop transport table |
| `etkinlikler.json` | City events |

**Disclaimer:** Answers are based on the official regulation text but do not replace an official decision. Always confirm important matters with the relevant university office.

## Built with GitHub Copilot

<!-- TODO: be specific, this matters for the Copilot prize. Examples: -->
- Generated the regex script that splits regulations into articles
- Scaffolded the FastAPI endpoints
- Helped debug <describe a real moment>

## Team

| Name | Role | GitHub |
|---|---|---|
| <A name> | AI / Backend | @<username> |
| <B name> | Frontend | @<username> |
| <C name> | Data + Writing | @<username> |

## License

[MIT](LICENSE)

---

## Kısaca (Türkçe)

Fırat Üniversitesi öğrencileri için yerel çalışan, açık kaynaklı bir yapay zeka asistanı. Yönetmelik sorularını madde numarası ve alıntıyla cevaplar, hoca eşleştirir, kulüp önerir, yemekhane menüsünü ve yurttan durağa ulaşım bilgisini gösterir. Gemma 4 modeli Ollama ile bilgisayarında çalışır; verilerin dışarı çıkmaz.
