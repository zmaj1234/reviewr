import crypto from 'crypto'

const SECRET = () => process.env.N8N_WEBHOOK_SECRET!

// Token expires in 7 days
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000

export function generateActionToken(reviewId: string, action: string): string {
  const exp = (Date.now() + EXPIRY_MS).toString()
  const payload = `${reviewId}:${action}:${exp}`
  const sig = crypto.createHmac('sha256', SECRET()).update(payload).digest('hex')
  return Buffer.from(`${payload}:${sig}`).toString('base64url')
}

export function verifyActionToken(token: string): { reviewId: string; action: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const parts = decoded.split(':')
    if (parts.length !== 4) return null
    const [reviewId, action, exp, sig] = parts
    if (Date.now() > parseInt(exp)) return null
    const payload = `${reviewId}:${action}:${exp}`
    const expected = crypto.createHmac('sha256', SECRET()).update(payload).digest('hex')
    if (sig !== expected) return null
    return { reviewId, action }
  } catch {
    return null
  }
}
