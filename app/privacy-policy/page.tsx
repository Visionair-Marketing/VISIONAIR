import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Visionair",
  description: "How Visionair collects, uses, and protects your information.",
};

const EFFECTIVE_DATE = "July 25, 2026";
const CONTACT_EMAIL = "hello@visionair.agency";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24 sm:px-8 lg:px-10">
        <h1 className="text-2xl font-medium text-foreground sm:text-3xl">Privacy Policy</h1>
        <p className="mt-3 text-xs text-muted">Effective date: {EFFECTIVE_DATE}</p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-medium [&_h2]:text-foreground [&_p]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Visionair (&quot;Visionair,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides
              web design and digital marketing services. This Privacy Policy explains what
              information we collect through visionair.agency (the &quot;Site&quot;), how we use it, and
              the choices you have. By using the Site, you agree to the practices described here.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul>
              <li>
                <strong className="text-foreground">Information you provide directly.</strong> When
                you submit our contact form, we collect your name, email address, company name
                (optional), and any project details you share.
              </li>
              <li>
                <strong className="text-foreground">Information collected automatically.</strong>{" "}
                When you visit the Site, we may automatically collect technical data such as IP
                address, browser type, device type, pages viewed, and referring URLs, typically
                through server logs and analytics tools.
              </li>
              <li>
                <strong className="text-foreground">Cookies and similar technologies.</strong> We
                may use cookies or comparable technologies to operate the Site and understand how
                it is used. You can control cookies through your browser settings.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to inquiries and provide quotes or proposals</li>
              <li>Deliver, maintain, and improve the Site and our services</li>
              <li>Communicate with you about your project or our services</li>
              <li>Monitor and analyze usage trends and Site performance</li>
              <li>Detect, prevent, and address fraud, abuse, or security issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. How We Share Your Information</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul>
              <li>
                <strong className="text-foreground">Service providers</strong> who help us operate
                the Site or deliver our services (for example, hosting, email delivery, and
                analytics providers), bound by confidentiality and data-protection obligations
              </li>
              <li>
                <strong className="text-foreground">Legal and safety authorities</strong> when
                required by law, regulation, legal process, or governmental request, or to protect
                the rights, property, or safety of Visionair, our clients, or others
              </li>
              <li>
                <strong className="text-foreground">Successors</strong> in connection with a
                merger, acquisition, financing, or sale of business assets, subject to standard
                confidentiality terms
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Data Retention</h2>
            <p>
              We retain personal information only as long as necessary to fulfill the purposes
              described in this policy, including responding to your inquiry, maintaining business
              records, and complying with legal obligations. When no longer needed, we delete or
              anonymize the information.
            </p>
          </section>

          <section>
            <h2>6. Data Security</h2>
            <p>
              We use reasonable administrative, technical, and physical safeguards designed to
              protect your information from unauthorized access, disclosure, alteration, or
              destruction. No method of transmission or storage is completely secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>7. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have the right to access, correct, delete, or
              restrict the use of your personal information, or to object to certain processing.
              To exercise these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>
              . We will respond within the timeframe required by applicable law.
            </p>
          </section>

          <section>
            <h2>8. Children&apos;s Privacy</h2>
            <p>
              The Site is not directed to individuals under the age of 16, and we do not knowingly
              collect personal information from children. If you believe a child has provided us
              with personal information, please contact us so we can delete it.
            </p>
          </section>

          <section>
            <h2>9. International Users</h2>
            <p>
              If you access the Site from outside the country in which our servers or service
              providers are located, your information may be transferred to, stored, and processed
              in a different jurisdiction with data-protection laws that may differ from those in
              your country.
            </p>
          </section>

          <section>
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with a revised effective date. Continued use of the Site after changes are
              posted constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, contact us at{" "}
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
