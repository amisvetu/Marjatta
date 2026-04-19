# Tekoälyavustaja verkossa

Suomenkielinen verkkosovellus, joka tallentaa keskusteluhistorian selaimeen.

## Asennus

1. Kopioi `.env.example` tiedostoksi `.env`.
2. Lisää OpenAI API -avain `.env`-tiedostoon:

```env
OPENAI_API_KEY=your-openai-api-key
```

3. Asenna riippuvuudet:

```bash
npm install
```

4. Käynnistä sovellus:

```bash
npm run dev
```

## Käyttö

- Avaa kehityksessä `http://localhost:5173`
- Kirjoita viesti suomeksi
- Keskusteluhistoria säilyy selaimen muistissa myös sivun latauksen jälkeen

## Tuotantokäyttö

1. Rakenna frontend:

```bash
npm run build
```

2. Käynnistä palvelin (paikallinen testi):

```bash
npm start
```

3. Avaa `http://localhost:3000`

## Vercel

- Lisää Verceliin ympäristömuuttuja `OPENAI_API_KEY`.
- Vercel käyttää `vercel.json`-konfiguraatiota rakennukseen ja API-pyyntöihin.
- `api/chat.js` toimii Vercelin serverless-funktiona.

## Huomioita

- Sovellus käyttää `/api/chat`-päätettä OpenAI-vastauksille.
- API-avain on tallennettava paikallisesti `.env`-tiedostoon paikallista kehitystä varten.
