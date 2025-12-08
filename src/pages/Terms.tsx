import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Terms & Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: [Date]
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. General
              </h2>
              <p>
                By using this website, you agree to these terms. If you do not 
                agree to the terms, please do not use the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Use of Website
              </h2>
              <p>
                The content on this website is intended for informational purposes. You may not 
                use the website in a way that could damage, disable, or overload it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Intellectual Property
              </h2>
              <p>
                All content on this website, including text, images, and logos, 
                belongs to Rackis for Barn unless otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Limitation of Liability
              </h2>
              <p>
                [Placeholder: Describe any limitations of liability for the organization.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Changes
              </h2>
              <p>
                We reserve the right to change these terms at any time. Changes 
                take effect when published on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Contact
              </h2>
              <p>
                For questions about these terms, contact us at contact@rackisforbarn.se.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
