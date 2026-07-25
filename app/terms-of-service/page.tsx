import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Visionair",
  description: "The terms that govern use of the Visionair website and services.",
};

const EFFECTIVE_DATE = "July 25, 2026";
const CONTACT_EMAIL = "hello@visionair.agency";

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24 sm:px-8 lg:px-10">
        <h1 className="text-2xl font-medium text-foreground sm:text-3xl">Terms of Service</h1>
        <p className="mt-3 text-xs text-muted">Effective date: {EFFECTIVE_DATE}</p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-medium [&_h2]:text-foreground [&_p]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of
              visionair.agency (the &quot;Site&quot;) and the services offered by Visionair
              (&quot;Visionair,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing the
              Site or engaging our services, you agree to be bound by these Terms. If you do not
              agree, do not use the Site or our services.
            </p>
          </section>

          <section>
            <h2>2. Use of the Site</h2>
            <p>
              You may use the Site only for lawful purposes and in accordance with these Terms.
              You agree not to:
            </p>
            <ul>
              <li>Use the Site in any way that violates applicable law or regulation</li>
              <li>Attempt to gain unauthorized access to the Site, its systems, or related networks</li>
              <li>Interfere with or disrupt the Site&apos;s operation or servers</li>
              <li>Copy, scrape, or reproduce Site content without our prior written consent</li>
              <li>Submit false, misleading, or fraudulent information through the Site</li>
            </ul>
          </section>

          <section>
            <h2>3. Services and Proposals</h2>
            <p>
              Descriptions of our services on the Site are provided for general informational
              purposes and do not constitute an offer or guarantee of specific results. Any
              services we provide, including scope, deliverables, timelines, and fees, are
              governed by a separate written proposal, statement of work, or agreement signed by
              both parties. In the event of a conflict between these Terms and a signed agreement,
              the signed agreement controls.
            </p>
          </section>

          <section>
            <h2>4. Intellectual Property</h2>
            <p>
              Unless otherwise agreed in writing, all content on the Site, including text,
              graphics, logos, and design elements, is owned by Visionair or its licensors and is
              protected by intellectual property laws. You may not reproduce, distribute, modify,
              or create derivative works from Site content without our prior written permission.
              Ownership of deliverables produced under a client engagement is governed by the
              applicable signed agreement.
            </p>
          </section>

          <section>
            <h2>5. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites or services that are not owned or
              controlled by Visionair. We are not responsible for the content, privacy practices,
              or terms of any third-party sites. Accessing them is at your own risk.
            </p>
          </section>

          <section>
            <h2>6. Disclaimers</h2>
            <p>
              The Site and its content are provided &quot;as is&quot; and &quot;as available&quot;
              without warranties of any kind, whether express or implied, including implied
              warranties of merchantability, fitness for a particular purpose, and
              non-infringement. We do not warrant that the Site will be uninterrupted, secure, or
              error-free.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Visionair will not be liable for any
              indirect, incidental, special, consequential, or punitive damages, or any loss of
              profits, revenue, data, or goodwill, arising from or related to your use of the
              Site, even if we have been advised of the possibility of such damages. Our total
              liability arising from these Terms or use of the Site will not exceed the amount you
              paid us, if any, in the twelve months preceding the claim.
            </p>
          </section>

          <section>
            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify and hold Visionair harmless from any claims, damages,
              liabilities, and expenses (including reasonable legal fees) arising out of your use
              of the Site or your violation of these Terms.
            </p>
          </section>

          <section>
            <h2>9. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction in which Visionair is
              established, without regard to conflict-of-law principles. Any disputes arising
              under these Terms will be subject to the exclusive jurisdiction of the courts located
              in that jurisdiction.
            </p>
          </section>

          <section>
            <h2>10. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Changes will be posted on this page
              with a revised effective date. Continued use of the Site after changes are posted
              constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>
              If you have questions about these Terms, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
