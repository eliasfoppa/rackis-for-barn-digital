import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: December 10, 2025
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Introduction
              </h2>
              <p>
                Rackis för Barn values your privacy. This privacy policy explains how we collect, use, and protect your personal data when you interact with our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. What Data We Collect
              </h2>
              <p>
                We may collect personal data such as your name, email address, and any information you provide when contacting us, subscribing to newsletters, or making a donation. We do not collect sensitive data unless explicitly provided by you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. How We Use Your Data
              </h2>
              <p>
                Your data is used to respond to inquiries, send updates and newsletters, process donations, and improve our services. We only use personal data for the purposes you have consented to or as required to comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Data Sharing
              </h2>
              <p>
                We do not sell or rent your personal data. Data may be shared with trusted service providers who help us operate the website or provide services, and only to the extent necessary. We may also disclose information when required by law or to protect our rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Your Rights
              </h2>
              <p>
                Under GDPR, you have the right to access, correct, or request deletion of your personal data. You also have the right to withdraw consent and object to processing. To exercise these rights, contact us using the details below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Contact
              </h2>
              <p>
                For questions about this privacy policy or to exercise your rights, contact us at <a href="mailto:info@rackisforbarn.com" className="text-primary hover:underline">info@rackisforbarn.com</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
