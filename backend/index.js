require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { rateLimit } = require('express-rate-limit')
const OpenAI = require('openai')

// Config
const PORT = 3000
const MODEL = 'gpt-3.5-turbo'
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: { error: 'Too many translation requests. Try again later.' },
	standardHeaders: true, 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})

if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in environment')
  process.exit(1)
}

const app = express()
const corsOptions = {
  origin: ['http://localhost:5173'],
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

app.use(cors(corsOptions))
app.use(express.json({
  limit: '1mb'
}))

app.post('/api/translate', limiter, async (req, res) => {
  try {
    const { text, language } = req.body 

    if (typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' })
    }
    if (typeof language !== 'string' || !language.trim()) {
      return res.status(400).json({ error: 'Language is required' })
    }
    if (text.length > 2000) {
      return res.status(413).json({ error: 'Text too long (max 2000 chars)' })
    }

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that translates text to the specified language. Translate concisely always.',
        },
        {
          role: 'user',
          content: `Translate the following text to ${language}: ${text}. Include pronunciation of the text in the response using the English alphabet.`,
        },
      ],
      temperature: 0.1,
      max_tokens: 100,
});

    const translatedText = completion?.choices?.[0]?.message?.content || ''

    if (!translatedText) {
      return res.status(502).json({ error: 'No translation returned' })
    }

    return res.json({ translatedText })
  } catch (err) {
    console.error('Translation error:', err?.message || err)
    return res.status(500).json({ error: 'Translation failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
