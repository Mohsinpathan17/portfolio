// Mohsin Pathan — Portfolio Backend
// Serves the static frontend and exposes a small REST API for the contact form.

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]');

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// --- very small in-memory rate limiter (per IP, 5 requests / 10 min) ---
const hits = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const record = hits.get(ip) || { count: 0, start: now };
  if (now - record.start > windowMs) {
    record.count = 0;
    record.start = now;
  }
  record.count += 1;
  hits.set(ip, record);
  if (record.count > 5) {
    return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' });
  }
  next();
}

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// --- API routes ---
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'mohsin-portfolio-backend', time: new Date().toISOString() });
});

app.post('/api/contact', rateLimit, (req, res) => {
  const { name, email, message, company } = req.body || {};

  // honeypot field — bots fill hidden fields, humans don't
  if (company) {
    return res.status(200).json({ ok: true }); // silently accept, do nothing
  }

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are all required.' });
  }
  if (name.length > 120 || message.length > 5000) {
    return res.status(400).json({ ok: false, error: 'Input too long.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
    existing.push(entry);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error('Failed to persist message:', err);
    return res.status(500).json({ ok: false, error: 'Server error. Please try again shortly.' });
  }

  // NOTE: to actually deliver these to your inbox, wire in an email
  // provider here (Nodemailer + SMTP, Resend, SendGrid, etc.) using
  // environment variables for credentials. Left out by default so this
  // runs with zero configuration.

  res.status(201).json({ ok: true, message: 'Thanks — your message has been received.' });
});

// simple admin-style read endpoint, protected by a token env var
app.get('/api/messages', (req, res) => {
  const token = req.query.token;
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: 'Unauthorized.' });
  }
  const existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
  res.json({ ok: true, count: existing.length, messages: existing });
});

// fallback to index.html for any other route (single-page site)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
