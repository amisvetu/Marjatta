import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

app.use(cors());
app.use(express.json());
app.use(express.static(distPath));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Viesti puuttuu' });
    }

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Olet ystävällinen ja avulias suomenkielinen tekoälyavustaja. Vastaa aina selkeästi suomeksi ja säilytä keskustelun sävy kohteliaana.',
        },
        { role: 'user', content: message },
      ],
      max_tokens: 600,
    });

    res.json({ reply: response.choices?.[0]?.message?.content ?? 'Ei vastausta tekoälyltä' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Tekoälyn vastausta ei voitu hakea' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Tekoälyavustajan palvelin käynnissä osoitteessa http://localhost:${port}`);
});
