import { Resend } from 'resend'
import { buildReviewEmail } from './email-template'
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

  await resend.emails.send({
    from: 'Reviewr <notifications@reviewr-lemon.vercel.app>',
    to: toEmail,
    subject: `${starLabel} New review from ${reviewerName} — action needed`,
    html,
  })
}
