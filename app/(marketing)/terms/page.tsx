import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — Reviewr',
  description: 'The terms governing your use of the Reviewr service.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/" className="text-sm text-[#6b7280] hover:text-[#374151] transition-colors mb-10 inline-block">
          ← Back to Reviewr
        </Link>

        <h1 className="font-serif text-4xl text-[#0a0a0a] mb-3">Terms of Use</h1>
        <p className="text-sm text-[#9ca3af] mb-12">Last updated: May 2026</p>

        <div className="prose prose-sm max-w-none text-[#374151] space-y-8">

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">1. Acceptance of terms</h2>
            <p className="leading-relaxed">
              By creating an account or using Reviewr (&ldquo;the Service&rdquo;), you agree to these Terms of Use.
              If you do not agree, do not use the Service. We may update these terms from time to time;
              continued use constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">2. Description of service</h2>
            <p className="leading-relaxed">
              Reviewr is an AI-powered tool that connects to your Google Business Profile, monitors incoming
              reviews, generates draft replies using artificial intelligence, and posts replies only after you
              explicitly approve them. The Service is provided &ldquo;as is&rdquo; and we may modify or discontinue
              features with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">3. Eligibility</h2>
            <p className="leading-relaxed">
              You must be at least 18 years old and have legal authority to enter into contracts to use the Service.
              By using Reviewr you represent that you meet these requirements. The Service is intended for business
              use, not personal consumer use.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">4. Your account</h2>
            <p className="leading-relaxed">
              You are responsible for maintaining the security of your account and all activity that occurs under it.
              You must not share your login credentials. Notify us immediately at{' '}
              <a href="mailto:reviewr.info@gmail.com" className="text-[#16a34a] hover:underline">reviewr.info@gmail.com</a>{' '}
              if you suspect unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">5. Acceptable use</h2>
            <p className="leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-[#4b5563]">
              <li>Use the Service to post false, misleading, or defamatory replies to reviews</li>
              <li>Use the Service in violation of Google&apos;s Terms of Service or Business Profile policies</li>
              <li>Attempt to reverse-engineer, scrape, or otherwise extract data from the Service</li>
              <li>Use the Service for any unlawful purpose</li>
              <li>Resell or sublicense access to the Service without written permission</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">6. AI-generated content</h2>
            <p className="leading-relaxed">
              Reviewr uses AI to generate draft replies to your reviews. You are solely responsible for reviewing
              and approving all replies before they are posted. By approving a reply, you take full responsibility
              for its content. We do not guarantee that AI-generated content is accurate, appropriate, or compliant
              with applicable regulations. You should always review drafts carefully before approving.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">7. Google API compliance</h2>
            <p className="leading-relaxed">
              Reviewr&apos;s use of Google APIs is subject to Google&apos;s{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-[#16a34a] hover:underline">
                Terms of Service
              </a>. By connecting your Google Business Profile, you grant us permission to access your data
              as described in our Privacy Policy. You can revoke this access at any time.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">8. Subscription and billing</h2>
            <p className="leading-relaxed">
              Reviewr is offered on a subscription basis. Plans are billed monthly. A 7-day free trial is available
              for new accounts. After the trial period, your card will be charged automatically. You may cancel your
              subscription at any time through the billing portal in your account settings — cancellation takes effect
              at the end of the current billing period. No refunds are issued for partial months. We reserve the right
              to change pricing with 30 days&apos; notice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">9. Intellectual property</h2>
            <p className="leading-relaxed">
              Reviewr and all associated software, design, and content are our intellectual property. You retain
              ownership of your business data and the content of approved replies. By using the Service, you grant
              us a limited licence to process your data for the sole purpose of providing the Service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">10. Limitation of liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by law, Reviewr shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of the Service, including but not limited to
              loss of business, revenue, or reputation. Our total liability to you shall not exceed the amount you
              paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">11. Termination</h2>
            <p className="leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these terms, with or without notice.
              You may delete your account at any time by contacting us. Upon termination, your access to the Service
              will cease and we will delete your data in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">12. Governing law</h2>
            <p className="leading-relaxed">
              These terms are governed by the laws of the European Union and the jurisdiction in which Reviewr
              is incorporated. Any disputes will be subject to the exclusive jurisdiction of the competent courts.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0a0a0a] mb-3">13. Contact</h2>
            <p className="leading-relaxed">
              Questions about these terms? Email us at{' '}
              <a href="mailto:reviewr.info@gmail.com" className="text-[#16a34a] hover:underline">
                reviewr.info@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-black/[0.06] flex items-center justify-between text-sm text-[#9ca3af]">
          <Link href="/privacy" className="hover:text-[#6b7280] transition-colors">Privacy Policy</Link>
          <span>© 2026 Reviewr</span>
        </div>
      </div>
    </div>
  )
}
