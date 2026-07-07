import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = buildMeta({
  title: "Terms & Conditions",
  description: "Read the RoomMate Nepal Terms and Conditions before using our platform.",
});

const LAST_UPDATED = "January 1, 2025";

export default function TermsPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Terms &amp; Conditions</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="space-y-8">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using {APP_NAME} (&ldquo;the Platform&rdquo;), you agree to
              be bound by these Terms and Conditions. If you do not agree,
              please do not use the Platform.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be at least 18 years old and legally capable of
              entering contracts under Nepali law to use the Platform. By
              registering, you confirm that you meet these requirements.
            </p>
          </Section>

          <Section title="3. User Accounts">
            <ul className="list-disc list-inside space-y-1 text-foreground/80">
              <li>You are responsible for maintaining the security of your account.</li>
              <li>You must provide accurate and complete registration information.</li>
              <li>You may not share your account credentials with others.</li>
              <li>You are responsible for all activity under your account.</li>
            </ul>
          </Section>

          <Section title="4. Listing Rules">
            <p>When posting listings, you must:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-foreground/80">
              <li>Only list properties you have legal authority to rent</li>
              <li>Provide accurate descriptions, prices, and photos</li>
              <li>Not post duplicate, fraudulent, or misleading listings</li>
              <li>Comply with all applicable Nepali rental laws</li>
              <li>Not discriminate based on religion, ethnicity, gender, or caste</li>
            </ul>
          </Section>

          <Section title="5. Prohibited Conduct">
            <p>Users may not:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-foreground/80">
              <li>Post false, misleading, or fraudulent content</li>
              <li>Harass, threaten, or abuse other users</li>
              <li>Attempt to circumvent the platform for direct payments to avoid fees</li>
              <li>Scrape, harvest, or systematically collect platform data</li>
              <li>Use the platform for any unlawful purpose</li>
            </ul>
          </Section>

          <Section title="6. Payment and Subscriptions">
            <p>
              Paid plans are billed monthly or annually as selected.
              Subscriptions renew automatically unless cancelled before the
              renewal date. Refunds are issued at our discretion. Payment
              processing is handled by third-party providers (Khalti, eSewa)
              subject to their own terms.
            </p>
          </Section>

          <Section title="7. AI Matching Disclaimer">
            <p>
              AI compatibility scores are provided as guidance only. {APP_NAME}
              makes no guarantee that matched users will be compatible in
              practice. You are solely responsible for your decision to enter
              into any rental or cohabitation arrangement.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              All platform content, design, and technology are the exclusive
              property of {APP_NAME}. Users retain ownership of content they
              post but grant us a non-exclusive licence to use it on the
              Platform.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, {APP_NAME} shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of the Platform. Our total
              liability shall not exceed the amount you paid us in the last 12
              months.
            </p>
          </Section>

          <Section title="10. Termination">
            <p>
              We reserve the right to suspend or terminate your account for
              violations of these Terms, at our discretion, with or without
              notice. You may delete your account at any time from Profile
              Settings.
            </p>
          </Section>

          <Section title="11. Governing Law">
            <p>
              These Terms are governed by the laws of Nepal. Any disputes shall
              be subject to the exclusive jurisdiction of the courts of
              Kathmandu.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:legal@roommatenepal.com" className="text-primary hover:underline">
                legal@roommatenepal.com
              </a>
              .
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
      <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
