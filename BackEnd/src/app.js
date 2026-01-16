const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');

const app = express();

// ✅ CORS CONFIG (Vercel → Render)
app.use(cors({
  origin: "https://ai-code-reviewer-mern-stack.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ Increase payload limit (important for AI requests)
app.use(express.json({ limit: "10mb" }));

// ✅ Health check route (prevents Render sleep issue)
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// ✅ Routes
app.use('/ai', aiRoutes);

module.exports = app;
