import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Reviewr',
  description: 'How Reviewr collects, uses, and protects your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/" className="text-sm text-[#6b7280] hover:text-[#374151] transition-colors mb-10 inline-block">
          ← Back to Reviewr
        </Link>

        <h1 className="font-serif text-4xl text-[#0a0a0a] mb-3">Privacy Policy</h1>
        <p className="text-sm text-[#9ca3af] mb-12">Last updated: May 2026</p>

        <div className="prose prose-sm max-w-none text-[#374151] space-y-8">

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">1. Who we are</h2>
            <p className="leading-relaxed">
              Reviewr (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an AI-powered review management service that helps business
              owners manage and respond to Google Business Profile reviews. This Privacy Policy explains how we
              collect, use, and protect information about you when you use our service at reviewrai.app.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">2. Information we collect</h2>
            <p className="leading-relaxed mb-3">We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 text-[#4b5563]">
              <li><strong className="text-[#374151]">Account information:</strong> Your name and email address when you sign up.</li>
              <li><strong className="text-[#374151]">Business information:</strong> Your business name, type, description, and phone number that you provide.</li>
              <li><strong className="text-[#374151]">Google Business Profile data:</strong> Review content, reviewer names, ratings, and timestamps — accessed via the Google Business Profile API with your explicit permission.</li>
              <li><strong className="text-[#374151]">Billing information:</strong> Payment is handled securely by Stripe. We store only your Stripe customer ID and subscription status — never your card details.</li>
              <li><strong className="text-[#374151]">Usage data:</strong> Basic analytics about how you interact with the service (e.g., which reviews you approve or discard).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">3. How we use your information</h2>
            <ul className="list-disc list-inside space-y-2 text-[#4b5563]">
              <li>To provide and improve the Reviewr service</li>
              <li>To generate AI-drafted review replies on your behalf</li>
              <li>To send you email notifications about new review drafts</li>
              <li>To process payments and manage your subscription</li>
              <li>To communicate important service updates</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">4. Google data</h2>
            <p className="leading-relaxed">
              We access your Google Business Profile data only with your explicit OAuth permission. We use this data solely
              to read your reviews and post replies that you have approved. We do not sell, share, or use your Google data
              for advertising purposes. You can revoke our access at any time through your Google Account settings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">5. Data sharing</h2>
            <p className="leading-relaxed mb-3">We do not sell your personal data. We share data only with:</p>
            <ul className="list-disc list-inside space-y-2 text-[#4b5563]">
              <li><strong className="text-[#374151]">Supabase:</strong> Our database and authentication provider.</li>
              <li><strong className="text-[#374151]">Stripe:</strong> Our payment processor. Subject to Stripe&apos;s privacy policy.</li>
              <li><strong className="text-[#374151]">Resend:</strong> Our email delivery provider, used to send you review drafts.</li>
              <li><strong className="text-[#374151]">OpenAI / Anthropic:</strong> AI providers used to generate draft replies. Review content is sent to these services for this purpose only.</li>
              <li><strong className="text-[#374151]">n8n:</strong> Our automation workflow tool used to orchestrate review processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">6. Data retention</h2>
            <p className="leading-relaxed">
              We retain your data for as long as your account is active. If you delete your account, we will delete your
              personal data within 30 days, except where we are required to retain it for legal or financial compliance purposes
              (e.g., billing records for up to 7 years).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">7. Cookies</h2>
            <p className="leading-relaxed">
              We use only essential cookies necessary for the service to function (authentication sessions). We do not use
              advertising or tracking cookies. You can disable cookies in your browser, but this may prevent you from signing in.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">8. Your rights (GDPR)</h2>
            <p className="leading-relaxed mb-3">
              If you are in the European Economic Area, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#4b5563]">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
              <li>Object to or restrict our processing of your data</li>
              <li>Data portability</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise any of these rights, email us at <a href="mailto:reviewr.info@gmail.com" className="text-[#16a34a] hover:underline">reviewr.info@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">9. Security</h2>
            <p className="leading-relaxed">
              We take security seriously. All data is encrypted in transit (TLS) and at rest. We use industry-standard
              authentication practices and regularly review our security measures. However, no system is perfectly secure
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">10. Changes to this policy</h2>
            <p className="leading-relaxed">
              We may update this policy from time to time. We will notify you of significant changes by email. Continued
              use of the service after changes take effect constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">11. Contact</h2>
            <p className="leading-relaxed">
              Questions about this policy? Email us at{' '}
              <a href="mailto:reviewr.info@gmail.com" className="text-[#16a34a] hover:underline">
                reviewr.info@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-black/[0.06] flex items-center justify-between text-sm text-[#9ca3af]">
          <Link href="/terms" className="hover:text-[#6b7280] transition-colors">Terms of Use</Link>
          <span>© 2026 Reviewr</span>
        </div>
      </div>
    </div>
  )
}
