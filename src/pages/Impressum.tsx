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
                Website Operator
              </h2>
              <p>
                Rackis för Barn<br />
                Rackarbergsgatan 32<br />
                752 32 Uppsala<br />
                Sweden
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Contact Information
              </h2>
              <p>
                Email: info@rackisforbarn.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Board Members
              </h2>
              <p>
                President: Jacob Lehmann<br />
                Vice President & Treasurer: Elias Foppa<br />
                Secretary: Lea Poewe
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Organization Type
              </h2>
              <p>
                Rackis för Barn is a student-run nonprofit organization registered in Sweden. All proceeds go to Barncancerfonden and Riksförbundet för Rörelsehindrade Barn och Ungdomar (RBU).
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Impressum;
