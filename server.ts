import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Music Generation Endpoint via Lyria
app.post('/api/generate-music', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trong hệ thống Secrets.',
      });
    }

    const { prompt, model = 'lyria-3-clip-preview' } = req.body;
    const ai = new GoogleGenAI({ apiKey });

    // Use generateContentStream for Lyria music models
    const stream = await ai.models.generateContentStream({
      model: model, // 'lyria-3-clip-preview' (30s) or 'lyria-3-pro-preview' (full track)
      contents: prompt || 'Generate a 30-second mystical orchestral fantasy adventure background track for exploring an ancient math land.',
    });

    let audioBase64 = '';
    let mimeType = 'audio/wav';
    let lyrics = '';

    for await (const chunk of stream) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;
      for (const part of parts) {
        if (part.inlineData?.data) {
          if (!audioBase64 && part.inlineData.mimeType) {
            mimeType = part.inlineData.mimeType;
          }
          audioBase64 += part.inlineData.data;
        }
        if (part.text && !lyrics) {
          lyrics = part.text;
        }
      }
    }

    if (!audioBase64) {
      return res.status(502).json({
        error: 'Không nhận được dữ liệu âm thanh từ mô hình tạo nhạc Lyria.',
      });
    }

    res.json({
      audioBase64,
      mimeType,
      lyrics,
    });
  } catch (error: any) {
    console.error('Error generating music:', error);
    res.status(500).json({
      error: error.message || 'Lỗi khi tạo nhạc nền bằng Lyria.',
    });
  }
});

// Start Express + Vite dev server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
