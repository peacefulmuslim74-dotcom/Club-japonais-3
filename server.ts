import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateEcomContent } from './server/gemini.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Server-side Gemini AI proxy route
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { task, prompt, context } = req.body;
    if (!task || !prompt) {
      return res.status(400).json({ error: 'Missing task or prompt' });
    }
    const output = await generateEcomContent(task, prompt, context);
    res.json({ success: true, data: JSON.parse(output || '{}') });
  } catch (error: any) {
    console.error('Server Gemini Error:', error);
    res.status(500).json({ error: error?.message || 'Gemini generation failed' });
  }
});

// Serve static assets from dist in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
