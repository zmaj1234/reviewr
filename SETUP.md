# Reviewr — Full Setup Guide

---

## 1. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values as you complete each step below.

```bash
cp .env.local.example .env.local
```

---

## 2. Supabase

1. Go to [supabase.com](https://supabase.com) → **New project**
2. **SQL Editor** → paste and run the entire contents of `supabase/schema.sql`
3. **Authentication → URL Configuration** → add your app URL as a redirect:
   - `http://localhost:3000/auth/callback` (local)
   - `https://your-app.vercel.app/auth/callback` (production)
4. **Settings → API** → copy and add to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

---

## 3. Google OAuth + GBP APIs

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → **New project**
2. **APIs & Services → Library** → enable all three:
   - **My Business Account Management API**
   - **My Business Business Information API**
   - **My Business Reviews API**
3. **APIs & Services → Credentials → Create credentials → OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/google/callback`
     - `https://your-app.vercel.app/api/auth/google/callback`
4. Copy **Client ID** and **Client Secret** to `.env.local`:
   - `GOOGLE_OAUTH_CLIENT_ID`
   - `GOOGLE_OAUTH_CLIENT_SECRET`

---

## 4. n8n Workflows

You need a running n8n instance (self-hosted or [n8n.cloud](https://n8n.cloud)).

### Before importing

Generate a webhook secret and add it to `.env.local`:
```bash
# Run this in your terminal to generate a secret:
openssl rand -hex 32
```
Set the output as `N8N_WEBHOOK_SECRET` in both `.env.local` AND as an n8n environment variable.

In n8n, go to **Settings → Environment Variables** and add:
| Variable | Value |
|---|---|
| `SUPABASE_URL` | your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | your Supabase service role key |
| `APP_URL` | your app URL (e.g. `http://localhost:3000`) |
| `N8N_WEBHOOK_SECRET` | the secret you just generated |
| `ANTHROPIC_API_KEY` | your Anthropic API key |

### Import Workflow A — Review Poller

1. In n8n: **Workflows → Import from file** → select `n8n-workflow-a-review-poller.json`
2. Open the workflow and review each node — no credentials to set (all use env vars)
3. **Activate** the workflow (toggle in top-right)
4. The cron will run every 15 minutes automatically

### Import Workflow B — Reply Poster

1. In n8n: **Workflows → Import from file** → select `n8n-workflow-b-reply-poster.json`
2. Open the workflow → click the **Reply Poster Webhook** node
3. Copy the **Production URL** shown in the node (looks like `https://your-n8n.com/webhook/reply-poster`)
4. Paste it into `.env.local` as `N8N_WEBHOOK_URL`
5. **Activate** the workflow

---

## 5. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and go through the onboarding to connect a Google Business Profile.

---

## 6. Deploy to Vercel

```bash
npx vercel
```

After the first deploy, go to the **Vercel dashboard → your project → Settings → Environment Variables** and add all variables from `.env.local`. Then:

```bash
npx vercel --prod
```

Update `NEXT_PUBLIC_APP_URL` to your production Vercel URL, and remember to:
- Add the production callback URL to Google OAuth
- Add the production redirect URL to Supabase Auth settings
- Update `APP_URL` in n8n environment variables to point to production

---

## Files Added by This Setup

| File | Purpose |
|---|---|
| `app/api/reviews/[id]/action/route.ts` | **Patched** — now appends posted replies to `businesses.past_responses` (max 20) |
| `n8n-workflow-a-review-poller.json` | Import into n8n — polls GBP every 15 min, generates drafts with Claude |
| `n8n-workflow-b-reply-poster.json` | Import into n8n — posts approved replies to GBP |
| `.env.local.example` | Template for all required environment variables |
