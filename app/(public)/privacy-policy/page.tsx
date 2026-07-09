import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = buildMeta({
  title: "Privacy Policy",
  description: `Read the RoomMate Nepal privacy policy to understand how we collect, use, and protect your personal data.`,
});

const LAST_UPDATED = "January 1, 2025";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 lg:py-20 page-enter">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-8">
          <Section title="1. Introduction">
            <p>
              {APP_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our platform.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following types of information:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-foreground/80">
              <li>Personal identification (name, email, phone number)</li>
              <li>Profile information (lifestyle preferences, bio, photos)</li>
              <li>Government ID documents for verification</li>
              <li>Listing details and location data</li>
              <li>Messages between users (stored encrypted)</li>
              <li>Payment and subscription information</li>
              <li>Usage data and device information</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the collected information to:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-foreground/80">
              <li>Provide and improve our platform services</li>
              <li>Power our AI matching engine</li>
              <li>Verify user identities and listings</li>
              <li>Send notifications and communications you request</li>
              <li>Process payments and manage subscriptions</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="4. Information Sharing">
            <p>
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-foreground/80">
              <li>Other users (limited profile data for matching purposes)</li>
              <li>Service providers who assist our operations</li>
              <li>Payment processors (Khalti, eSewa)</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement industry-standard security measures including
              encryption at rest and in transit, HttpOnly secure cookies for
              sessions, and regular security audits. No method of transmission
              over the Internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>You have the right to:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-foreground/80">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, email us at{" "}
              <a href="mailto:privacy@roommatenepal.com" className="text-primary hover:underline">
                privacy@roommatenepal.com
              </a>
              .
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              We use cookies to maintain your session state, remember
              preferences, and analyse usage patterns. You can control cookie
              settings in your browser, but disabling certain cookies may
              affect platform functionality.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Our platform is not directed to individuals under 18 years of
              age. We do not knowingly collect personal information from
              minors. If you believe we have collected such data, please
              contact us immediately.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. We will notify
              you of significant changes via email or a prominent notice on our
              platform at least 7 days before the changes take effect.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              For privacy-related questions, contact our Data Protection
              Officer at{" "}
              <a href="mailto:privacy@roommatenepal.com" className="text-primary hover:underline">
                privacy@roommatenepal.com
              </a>{" "}
              or by post at: {APP_NAME}, Thamel, Kathmandu, Nepal.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-muted-foreground space-y-2">{children}</div>
    </div>
  );
}
