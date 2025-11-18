# Quiz Egzaminacyjny - Żeglarz Jachtowy & SRC

Aplikacja do nauki pytań egzaminacyjnych dla:

- **Żeglarz Jachtowy** - znaki i przepisy nawigacyjne (150 pytań)
- **SRC Egzamin** - system GMDSS i regulaminy (318 pytań: 146 GMDSS + 172 Regulamin)

## Funkcje

- 🎲 Tryb losowy - pytania w losowej kolejności
- 📝 Tryb sekwencyjny - pytania po kolei
- 🔍 Wyszukiwanie konkretnego pytania według sekcji i numeru
- 🎯 Automatyczne przejście do następnego pytania po poprawnej odpowiedzi
- 📊 Licznik postępu (aktualne pytanie / łącznie pytań)

## Jak uruchomić

### Lokalnie

1. Sklonuj repozytorium
2. Zainstaluj zależności: `npm i`
3. Uruchom dev server: `npm run dev`
4. Otwórz w przeglądarce (domyślnie <http://localhost:5173>)

### Docker

1. Sklonuj repozytorium
2. Uruchom: `docker-compose up -d`
3. Otwórz w przeglądarce: <http://localhost:8555>

## Struktura pytań

- `src/questions.json` - pytania dla Żeglarza Jachtowego
- `src/src_questions.json` - pytania dla egzaminu SRC (dwie sekcje: gmdss i regulamnin)

## Technologie

- Vue.js 3
- Vue Router 4
- Vite
- Font Awesome
