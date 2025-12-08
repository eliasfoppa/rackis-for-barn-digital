import { Layout } from "@/components/layout/Layout";

const Impressum = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Impressum
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Organization Details
              </h2>
              <p>
                Rackis for Barn<br />
                [Placeholder: Organization number]<br />
                [Placeholder: Address]<br />
                [Placeholder: Postal code and City]<br />
                Sweden
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Contact Information
              </h2>
              <p>
                Email: contact@rackisforbarn.se<br />
                [Placeholder: Phone number if applicable]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Responsible Publisher
              </h2>
              <p>
                [Placeholder: Name of responsible person]<br />
                [Placeholder: Role/Title]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Organization Type
              </h2>
              <p>
                Rackis for Barn is a nonprofit organization registered in Sweden.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Impressum;
