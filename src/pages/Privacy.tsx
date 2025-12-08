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
              Last updated: [Date]
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Introduction
              </h2>
              <p>
                Rackis for Barn values your privacy. This privacy policy explains 
                how we collect, use, and protect your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. What Data We Collect
              </h2>
              <p>
                [Placeholder: Describe what personal data you collect, e.g., name, 
                email address, etc.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. How We Use Your Data
              </h2>
              <p>
                [Placeholder: Explain how you use the collected data, e.g., 
                for communication, newsletters, etc.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Data Sharing
              </h2>
              <p>
                [Placeholder: Explain if and how you share data with third parties.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Your Rights
              </h2>
              <p>
                Under GDPR, you have the right to request access to, correction of, or deletion 
                of your personal data. Contact us if you wish to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Contact
              </h2>
              <p>
                For questions about this privacy policy, contact us at contact@rackisforbarn.se.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
