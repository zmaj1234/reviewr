// ─── Shared helpers ────────────────────────────────────────────────────────────

function emailWrapper(content: string, previewText = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  ${previewText ? `<title>${previewText}</title>` : ''}
</head>
<body style="margin:0;padding:0;background:#f0f0f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0f7;padding:40px 16px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(99,102,241,0.10)">
          ${content}
          <!-- FOOTER -->
          <tr>
            <td style="background:#f8f8fd;padding:20px 40px;border-top:1px solid #ede9fe">
              <div style="font-size:12px;color:#9ca3af;text-align:center">
                Sent by <strong style="color:#6366f1">Reviewr</strong> &nbsp;·&nbsp;
                <a href="https://reviewrai.app" style="color:#6366f1;text-decoration:none">reviewrai.app</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function emailHeader(subtitle: string): string {
  return `
  <tr>
    <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:36px 40px">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td valign="middle">
            <span style="font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px">Reviewr</span>
            <div style="font-size:14px;color:rgba(255,255,255,0.75);margin-top:4px">${subtitle}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`
}

// ─── Welcome email ─────────────────────────────────────────────────────────────

export function buildWelcomeEmail(params: {
  name: string | null
  dashboardUrl: string
}): string {
  const { name, dashboardUrl } = params
  const greeting = name ? `Hey ${name.split(' ')[0]}` : 'Hey'

  return emailWrapper(`
  ${emailHeader('Welcome to Reviewr')}
  <tr>
    <td style="padding:36px 40px 0">
      <p style="font-size:20px;font-weight:700;color:#1a1a2e;margin:0 0 16px">${greeting} — you're in. 🎉</p>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px">
        Here's the thing about Google reviews: most business owners either forget to reply, leave it too late,
        or paste the same bland line every time. It shows — and it costs customers.
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 28px">
        Reviewr fixes that. Every time a review lands, we write a reply in your voice and ping you.
        One tap to approve — and it's live on Google. That's it.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f8fd;border-radius:14px;padding:24px">
        <tr>
          <td>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#6366f1;margin-bottom:16px">3 steps to your first reply</div>
            ${[
              ['1', 'Connect your Google Business Profile', 'Takes 30 seconds — just click "Connect with Google"'],
              ['2', 'Wait for a review', 'We check every 15 minutes. New review? We draft a reply instantly.'],
              ['3', 'Approve and you\'re done', 'Click Approve in the email we send you. It posts to Google automatically.'],
            ].map(([num, title, desc]) => `
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px">
              <tr>
                <td width="32" valign="top" style="padding-top:2px">
                  <div style="width:24px;height:24px;background:#6366f1;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#fff">${num}</div>
                </td>
                <td style="padding-left:12px">
                  <div style="font-size:14px;font-weight:700;color:#1a1a2e">${title}</div>
                  <div style="font-size:13px;color:#6b7280;margin-top:2px">${desc}</div>
                </td>
              </tr>
            </table>`).join('')}
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:28px 40px 36px">
      <a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:15px">
        Go to your dashboard →
      </a>
      <p style="font-size:13px;color:#9ca3af;margin:20px 0 0">
        P.S. Your 7-day free trial starts now. No hidden charges, cancel anytime from settings.
      </p>
    </td>
  </tr>
  `, 'Welcome to Reviewr')
}

// ─── Trial reminder email ──────────────────────────────────────────────────────

export function buildTrialReminderEmail(params: {
  name: string | null
  trialEndsAt: string
  subscribeUrl: string
  dashboardUrl: string
}): string {
  const { name, trialEndsAt, subscribeUrl, dashboardUrl } = params
  const greeting = name ? `Hey ${name.split(' ')[0]}` : 'Hey'

  return emailWrapper(`
  ${emailHeader('Your trial is ending soon')}
  <tr>
    <td style="padding:36px 40px 0">
      <p style="font-size:20px;font-weight:700;color:#1a1a2e;margin:0 0 16px">${greeting} — 2 days left on your trial.</p>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px">
        Your Reviewr trial ends on <strong>${trialEndsAt}</strong>. After that, new reviews will land without a reply —
        and unanswered reviews cost the average business 9 customers a month.
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 28px">
        Keep your replies going for €19/month. That's less than the cost of one missed customer.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:20px 24px">
        <tr>
          <td>
            <div style="font-size:13px;font-weight:700;color:#16a34a;margin-bottom:10px">What you keep with a subscription</div>
            ${['AI-drafted replies for every review', 'One-tap approve from your email inbox', 'Reviews replied to within minutes, not days'].map(f => `
            <div style="display:flex;align-items:center;font-size:13px;color:#374151;margin-bottom:8px">
              <span style="color:#16a34a;font-weight:700;margin-right:8px">✓</span> ${f}
            </div>`).join('')}
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:28px 40px 36px">
      <a href="${subscribeUrl}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:15px;box-shadow:0 4px 16px rgba(22,163,74,0.3)">
        Subscribe — €19/month →
      </a>
      <div style="margin-top:12px">
        <a href="${dashboardUrl}" style="font-size:13px;color:#9ca3af;text-decoration:none">Or visit your dashboard</a>
      </div>
      <p style="font-size:13px;color:#9ca3af;margin:20px 0 0;line-height:1.6">
        P.S. If anything wasn't working during your trial, just reply to this email and I'll sort it.
      </p>
    </td>
  </tr>
  `, 'Your Reviewr trial ends in 2 days')
}

// ─── Team invite email ─────────────────────────────────────────────────────────

export function buildTeamInviteEmail(params: {
  ownerName: string
  ownerEmail: string
  businessName: string
  signupUrl: string
}): string {
  const { ownerName, businessName, signupUrl } = params

  return emailWrapper(`
  ${emailHeader('You\'ve been invited')}
  <tr>
    <td style="padding:36px 40px 0">
      <p style="font-size:20px;font-weight:700;color:#1a1a2e;margin:0 0 16px">
        ${ownerName} added you to their Reviewr team.
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px">
        <strong>${ownerName}</strong> manages reviews for <strong>${businessName}</strong> using Reviewr —
        an AI tool that drafts replies to Google reviews and lets the owner approve them with one tap.
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 28px">
        They've given you access as a team member, so you can help review, edit, and approve reply drafts
        on their behalf. No Google account access needed on your end — just the Reviewr dashboard.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f8fd;border-radius:14px;padding:20px 24px">
        <tr>
          <td>
            <div style="font-size:13px;font-weight:700;color:#6366f1;margin-bottom:12px">As a team member you can</div>
            ${['View all incoming reviews and AI-drafted replies', 'Edit reply drafts before they go live', 'Approve or discard replies on the owner\'s behalf'].map(f => `
            <div style="font-size:13px;color:#374151;margin-bottom:8px">
              <span style="color:#6366f1;font-weight:700;margin-right:8px">→</span> ${f}
            </div>`).join('')}
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:28px 40px 36px">
      <a href="${signupUrl}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:15px">
        Accept invite &amp; sign up →
      </a>
      <p style="font-size:13px;color:#9ca3af;margin:20px 0 0;line-height:1.6">
        Already have an account? Just sign in and you'll see ${ownerName}'s reviews automatically.
      </p>
    </td>
  </tr>
  `, `${ownerName} invited you to Reviewr`)
}

// ─── Subscription confirmation email ──────────────────────────────────────────

export function buildSubscriptionEmail(params: {
  name: string | null
  plan: 'solo' | 'growth'
  dashboardUrl: string
  billingUrl: string
}): string {
  const { name, plan, dashboardUrl, billingUrl } = params
  const greeting = name ? `Hey ${name.split(' ')[0]}` : 'Hey'
  const isSolo = plan === 'solo'

  const features = isSolo
    ? ['1 Google Business Profile location', 'Unlimited AI-drafted replies', 'One-tap approve from email', 'Basic analytics']
    : ['Up to 5 locations in one dashboard', 'Unlimited AI-drafted replies', 'One-tap approve from email', '3 team seats with manager access', 'Advanced analytics — trends, charts & sentiment']

  return emailWrapper(`
  ${emailHeader(`You're on the ${isSolo ? 'Solo' : 'Growth'} plan`)}
  <tr>
    <td style="padding:36px 40px 0">
      <p style="font-size:20px;font-weight:700;color:#1a1a2e;margin:0 0 16px">${greeting} — payment confirmed. 🎉</p>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 28px">
        You're now on the <strong>${isSolo ? 'Solo' : 'Growth'} plan</strong> at
        <strong>${isSolo ? '€19' : '€49'}/month</strong>. Every review that lands on your
        Google Business Profile will be drafted and waiting for your approval — automatically.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:20px 24px">
        <tr>
          <td>
            <div style="font-size:13px;font-weight:700;color:#16a34a;margin-bottom:12px">What&apos;s included in your plan</div>
            ${features.map(f => `
            <div style="font-size:13px;color:#374151;margin-bottom:8px">
              <span style="color:#16a34a;font-weight:700;margin-right:8px">✓</span> ${f}
            </div>`).join('')}
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:28px 40px 36px">
      <a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:15px">
        Go to dashboard →
      </a>
      <p style="font-size:13px;color:#9ca3af;margin:20px 0 0;line-height:1.6">
        Need to manage your subscription? <a href="${billingUrl}" style="color:#6366f1;text-decoration:none;font-weight:600">Visit billing settings</a>.
        Cancel anytime — no questions asked.
      </p>
    </td>
  </tr>
  `, `You're on the ${isSolo ? 'Solo' : 'Growth'} plan — welcome!`)
}

// ─── Review notification ────────────────────────────────────────────────────────

function starsEmoji(rating: number): string {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
}

function flagsSection(flags: string[]): string {
  if (!flags || flags.length === 0) return ''
  const labels: Record<string, string> = {
    angry_customer: '😠 Angry customer',
    mentions_staff_by_name: '👤 Mentions staff by name',
    requests_refund: '💰 Requesting a refund',
    fake_review_suspected: '🚨 Possible fake review',
  }
  const items = flags.map(f => labels[f] || f).join(' &nbsp;·&nbsp; ')
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px">
      <tr>
        <td style="background:#fef3c7;border:1px solid #fcd34d;border-radius:10px;padding:14px 18px">
          <div style="font-size:13px;font-weight:700;color:#92400e;margin-bottom:4px">⚠️ Heads up</div>
          <div style="font-size:13px;color:#92400e">${items}</div>
        </td>
      </tr>
    </table>`
}

export function buildReviewEmail(params: {
  businessName: string
  reviewerName: string
  rating: number
  reviewText: string
  reviewTime: string | null
  draftReply: string
  flags: string[]
  approveUrl: string
  editUrl: string
  discardUrl: string
  dashboardUrl: string
}): string {
  const {
    businessName, reviewerName, rating, reviewText, reviewTime,
    draftReply, flags, approveUrl, editUrl, discardUrl, dashboardUrl
  } = params

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Review — Reviewr</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0f7;padding:40px 16px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(99,102,241,0.12)">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:36px 40px">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="middle" style="padding-right:10px">
                          <img src="data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2334D87A'/%3E%3Cstop offset='100%25' stop-color='%230EA85A'/%3E%3C/linearGradient%3E%3ClinearGradient id='h' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ffffff' stop-opacity='0.35'/%3E%3Cstop offset='50%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M 80 0 C 35 0 0 35 0 80 C 0 125 35 160 80 160 C 125 160 160 125 160 80 C 160 35 125 0 80 0 Z' fill='url(%23g)'/%3E%3Cpath d='M 80 0 C 35 0 0 35 0 80 L 160 80 C 160 35 125 0 80 0 Z' fill='url(%23h)'/%3E%3Cg transform='translate(80 80)'%3E%3Cpath d='M 0 -34 C 4 -14 14 -4 34 0 C 14 4 4 14 0 34 C -4 14 -14 4 -34 0 C -14 -4 -4 -14 0 -34 Z' fill='%23ffffff'/%3E%3Cpath d='M 24 -22 C 25 -16 28 -13 34 -12 C 28 -11 25 -8 24 -2 C 23 -8 20 -11 14 -12 C 20 -13 23 -16 24 -22 Z' fill='%23ffffff' opacity='0.85'/%3E%3C/g%3E%3C/svg%3E" width="30" height="30" alt="" style="display:block" />
                        </td>
                        <td valign="middle">
                          <span style="font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px">Reviewr</span>
                        </td>
                      </tr>
                    </table>
                    <div style="font-size:14px;color:rgba(255,255,255,0.75);margin-top:6px">A new review is waiting for your reply</div>
                  </td>
                  <td align="right" valign="top">
                    <div style="background:rgba(255,255,255,0.18);border-radius:10px;padding:10px 18px;display:inline-block">
                      <div style="font-size:22px;line-height:1">${starsEmoji(rating)}</div>
                      <div style="font-size:12px;color:rgba(255,255,255,0.85);text-align:center;margin-top:4px;font-weight:600">${rating} / 5</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BUSINESS PILL -->
          <tr>
            <td style="padding:24px 40px 0">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#f0f0f7;border-radius:20px;padding:6px 14px;font-size:12px;font-weight:700;color:#6366f1;letter-spacing:0.5px;text-transform:uppercase">
                    ${businessName}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- REVIEW CARD -->
          <tr>
            <td style="padding:16px 40px 0">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#f8f8fd;border-left:4px solid #6366f1;border-radius:0 14px 14px 0;padding:22px 26px">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <div style="font-weight:800;color:#1a1a2e;font-size:16px">${reviewerName}</div>
                          <div style="color:#9ca3af;font-size:13px;margin-top:2px">${formatDate(reviewTime)}</div>
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top:14px;color:#374151;font-size:15px;line-height:1.7;font-style:italic">
                      &ldquo;${reviewText || '(No text — rating only)'}&rdquo;
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DRAFT REPLY -->
          <tr>
            <td style="padding:28px 40px 0">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#6366f1;font-weight:800;margin-bottom:12px">✨ System draft reply</div>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#fafafa;border:2px dashed #c7d2fe;border-radius:14px;padding:22px 26px;color:#374151;font-size:15px;line-height:1.7">
                    ${draftReply}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FLAGS -->
          <tr>
            <td style="padding:0 40px">
              ${flagsSection(flags)}
            </td>
          </tr>

          <!-- CTA LABEL -->
          <tr>
            <td style="padding:28px 40px 16px">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;font-weight:700;text-align:center">What would you like to do?</div>
            </td>
          </tr>

          <!-- BUTTONS -->
          <tr>
            <td style="padding:0 40px 40px">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- APPROVE -->
                  <td width="33%" style="padding-right:8px">
                    <a href="${approveUrl}" style="display:block;background:linear-gradient(135deg,#10b981,#059669);color:#ffffff;text-decoration:none;text-align:center;padding:16px 8px;border-radius:12px;font-weight:800;font-size:14px;letter-spacing:0.3px">
                      ✓&nbsp; Approve &amp; Post
                    </a>
                  </td>
                  <!-- EDIT -->
                  <td width="33%" style="padding:0 4px">
                    <a href="${editUrl}" style="display:block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;text-align:center;padding:16px 8px;border-radius:12px;font-weight:800;font-size:14px;letter-spacing:0.3px">
                      ✏&nbsp; Edit Reply
                    </a>
                  </td>
                  <!-- DISCARD -->
                  <td width="33%" style="padding-left:8px">
                    <a href="${discardUrl}" style="display:block;background:#ef4444;color:#ffffff;text-decoration:none;text-align:center;padding:16px 8px;border-radius:12px;font-weight:800;font-size:14px;letter-spacing:0.3px;">
                      ✕&nbsp; Discard
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f8f8fd;padding:20px 40px;border-top:1px solid #ede9fe">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-size:12px;color:#9ca3af">Sent by <strong style="color:#6366f1">Reviewr</strong> for ${businessName}</div>
                    <div style="font-size:11px;color:#c4b5fd;margin-top:2px">Approve &amp; Discard buttons work with one click — no login needed.</div>
                  </td>
                  <td align="right">
                    <a href="${dashboardUrl}" style="font-size:13px;color:#6366f1;text-decoration:none;font-weight:700">Open Dashboard →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
