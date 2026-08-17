# Portfolio Backend — Mohsin Pathan

A small Express server that serves the portfolio site (`/public/index.html`) and powers the contact form with a real API.

## What it does
- Serves the static site from `public/`
- `POST /api/contact` — validates and stores contact-form submissions in `data/messages.json`, with basic spam protection (honeypot field + rate limiting)
- `GET /api/messages?token=YOUR_TOKEN` — lets you read submitted messages (protected by an `ADMIN_TOKEN` env var)
- `GET /api/health` — health check

## Run it locally
```bash
npm install
npm start
```
Then open **http://localhost:3000**

## Read your messages
```bash
ADMIN_TOKEN=pick-a-secret npm start
# then visit:
# http://localhost:3000/api/messages?token=pick-a-secret
```

## Deploy it (pick one)
- **Render / Railway**: connect this folder as a repo, set build command `npm install`, start command `npm start`. Add an `ADMIN_TOKEN` environment variable.
- **Vercel**: deploy as a Node.js project (Express apps work with the `@vercel/node` runtime, or wrap `server.js` as a serverless function).
- Once deployed, your live URL serves both the site and the API — no separate frontend hosting needed.

## Wiring up real email delivery (optional)
Right now submissions are saved to a JSON file, not emailed. To get them in your inbox, add an email provider (Nodemailer + SMTP, Resend, or SendGrid) inside the `/api/contact` handler in `server.js`, using environment variables for credentials — never hardcode secrets.

## Notes
- `data/messages.json` is created automatically on first run.
- The rate limiter is in-memory (5 requests / 10 min per IP) — fine for a personal portfolio, not built for high traffic.
