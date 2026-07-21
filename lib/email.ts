import { Resend } from 'resend'
import { buildReviewEmail, buildWelcomeEmail, buildTrialReminderEmail, buildTeamInviteEmail, buildSubscriptionEmail } from './email-template'
import { generateActionToken } from './email-tokens'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendReviewNotification(params: {
  toEmail: string
  businessName: string
  reviewId: string
  reviewerName: string
  rating: number
  reviewText: string
  reviewTime: string | null
  draftReply: string
  flags: string[]
}) {
  const {
    toEmail, businessName, reviewId,
    reviewerName, rating, reviewText, reviewTime, draftReply, flags
  } = params

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const approveToken = generateActionToken(reviewId, 'approve')
  const discardToken = generateActionToken(reviewId, 'discard')

  const approveUrl = `${appUrl}/api/reviews/${reviewId}/quick-action?token=${approveToken}&action=approve`
  const discardUrl = `${appUrl}/api/reviews/${reviewId}/quick-action?token=${discardToken}&action=discard`
  const editUrl    = `${appUrl}/dashboard?review=${reviewId}`
  const dashboardUrl = `${appUrl}/dashboard`

  const html = buildReviewEmail({
    businessName,
    reviewerName,
    rating,
    reviewText,
    reviewTime,
    draftReply,
    flags,
    approveUrl,
    editUrl,
    discardUrl,
    dashboardUrl,
  })

  const starLabel = '⭐'.repeat(rating)

  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

  await resend.emails.send({
    from: `Reviewr <${fromAddress}>`,
    to: toEmail,
    subject: `${starLabel} New review from ${reviewerName} — action needed`,
    html,
  })
}

// ─── Welcome email ─────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(params: {
  toEmail: string
  name: string | null
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://reviewrai.app'
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
  const html = buildWelcomeEmail({ name: params.name, dashboardUrl: `${appUrl}/dashboard` })

  await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: `Reviewr <${from}>`,
    to: params.toEmail,
    subject: `You're in — here's what happens next`,
    html,
  })
}

// ─── Trial reminder email ──────────────────────────────────────────────────────

export async function sendTrialReminderEmail(params: {
  toEmail: string
  name: string | null
  trialEndsAt: Date
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://reviewrai.app'
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
  const formatted = params.trialEndsAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const html = buildTrialReminderEmail({
    name: params.name,
    trialEndsAt: formatted,
    subscribeUrl: `${appUrl}/api/stripe/checkout?plan=solo`,
    dashboardUrl: `${appUrl}/dashboard`,
  })

  await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: `Reviewr <${from}>`,
    to: params.toEmail,
    subject: `2 days left on your trial — don't let reviews go unanswered`,
    html,
  })
}

// ─── Team invite email ─────────────────────────────────────────────────────────

export async function sendTeamInviteEmail(params: {
  toEmail: string
  ownerName: string
  ownerEmail: string
  businessName: string
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://reviewrai.app'
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

  const html = buildTeamInviteEmail({
    ownerName: params.ownerName,
    ownerEmail: params.ownerEmail,
    businessName: params.businessName,
    signupUrl: `${appUrl}/signup`,
  })

  await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: `Reviewr <${from}>`,
    to: params.toEmail,
    subject: `${params.ownerName} added you to their Reviewr team`,
    html,
  })
}

// ─── Subscription confirmation email ──────────────────────────────────────────

export async function sendSubscriptionConfirmationEmail(params: {
  toEmail: string
  name: string | null
  plan: 'solo' | 'growth'
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://reviewrai.app'
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

  const html = buildSubscriptionEmail({
    name: params.name,
    plan: params.plan,
    dashboardUrl: `${appUrl}/dashboard`,
    billingUrl: `${appUrl}/settings`,
  })

  await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: `Reviewr <${from}>`,
    to: params.toEmail,
    subject: `You're on the ${params.plan === 'growth' ? 'Growth' : 'Solo'} plan — welcome!`,
    html,
  })
}
