# Reviewr

AI-powered Google Business Profile review management. Connect your GBP, get AI-drafted replies to every review, approve in one tap. Nothing ever posts without your explicit approval.

## What this is

Reviewr is a SaaS web app built with Next.js 14 (App Router), Supabase, and the Anthropic API. Business owners connect their Google Business Profile, and when a new review comes in via n8n automation, Claude generates a tailored draft reply. The owner reviews it on the dashboard or via WhatsApp/email notification, then approves, edits, or discards it.

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account
- A [Google Cloud](https://console.cloud.google.com) project with the Google Business Profile API enabled
- An [Anthropic](https://console.anthropic.com) API key
- A [Twilio](https://twilio.com) account (for WhatsApp notifications)
- A [Resend](https://resend.com) account (for email notifications)
- An [n8n](https://n8n.io) instance (for automation workflow)

## Setup

### 1. Clone and install

```bash
git clone https://github.com/your-username/reviewr.git
cd reviewr
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the contents of `supabase/schema.sql`
4. Copy your project URL and anon key from Project Settings → API

### 3. Set up Google Cloud

1. Create a project at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable the **Google Business Profile API** and **Google My Business API**
3. Go to APIs & Services → Credentials → Create OAuth 2.0 Client ID
4. Application type: **Web application**
5. Add authorized redirect URI: `{YOUR_APP_URL}/api/auth/google/callback`
   - For local dev: `http://localhost:3000/api/auth/google/callback`
6. Copy the Client ID and Client Secret

### 4. Configure environment variables

Copy `.env.local` and fill in all values:

```bash
cp .env.local .env.local
```

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API |
| `GOOGLE_OAUTH_CLIENT_ID` | Google Cloud → Credentials |
| `GOOGLE_OAUTH_CLIENT_SECRET` | Google Cloud → Credentials |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) |
| `TWILIO_ACCOUNT_SID` | Twilio Console |
| `TWILIO_AUTH_TOKEN` | Twilio Console |
| `TWILIO_WHATSAPP_FROM` | Your Twilio WhatsApp number |
| `RESEND_API_KEY` | [resend.com](https://resend.com) |
| `NEXT_PUBLIC_APP_URL` | Your app URL (`http://localhost:3000` for local) |
| `N8N_WEBHOOK_URL` | Your n8n webhook URL |
| `N8N_WEBHOOK_SECRET` | A secret string you choose — add it to n8n too |

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push your repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env.local` in the Vercel dashboard
4. Update `NEXT_PUBLIC_APP_URL` to your Vercel deployment URL
5. Update your Google OAuth redirect URI to `{VERCEL_URL}/api/auth/google/callback`
6. Deploy!

## n8n Workflow Setup

The n8n workflow is responsible for:
1. Polling your Google Business Profile for new reviews (every 15 min recommended)
2. Sending the review to Claude for draft generation
3. POSTing the result to Reviewr's webhook endpoint
4. (Optionally) Sending WhatsApp/email notifications to the owner
5. Posting approved replies back to Google

### Webhook endpoint

Your n8n workflow should POST to:
```
{NEXT_PUBLIC_APP_URL}/api/webhook/n8n
```

With the header:
```
x-webhook-secret: {N8N_WEBHOOK_SECRET}
```

And body:
```json
{
  "business_id": "uuid-from-supabase",
  "review_id": "google-review-id",
  "rating": 5,
  "review_text": "Great experience!",
  "reviewer_name": "Maria S.",
  "review_time": "2026-05-10T12:00:00Z",
  "language": "en",
  "sentiment": "positive",
  "draft_reply": "Thank you so much, Maria!...",
  "flags": []
}
```

When an owner approves a review, Reviewr calls your `N8N_WEBHOOK_URL` with:
```json
{
  "action": "approve",
  "review_id": "reviewr-review-uuid",
  "final_reply": "The approved reply text",
  "business_id": "uuid"
}
```

Your n8n workflow should then post this reply to the Google Business Profile API.

## Architecture

```
app/
├── (marketing)/     # Public landing page
├── (auth)/          # Login & signup pages
├── (app)/           # Protected dashboard, connect, settings
│   ├── dashboard/   # Main review management UI
│   ├── connect/     # GBP onboarding wizard
│   └── settings/    # Account & business settings
└── api/
    ├── auth/google/           # Initiate GBP OAuth
    ├── auth/google/callback/  # Handle OAuth callback
    ├── reviews/[id]/action/   # Approve/edit/discard actions
    └── webhook/n8n/           # Receive drafts from n8n
```

## License

MIT
