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
                Organisationsuppgifter
              </h2>
              <p>
                Rackis för Barn<br />
                [Platshållartext: Organisationsnummer]<br />
                [Platshållartext: Adress]<br />
                [Platshållartext: Postnummer och Ort]<br />
                Sverige
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Kontaktinformation
              </h2>
              <p>
                E-post: kontakt@rackisforbarn.se<br />
                [Platshållartext: Telefonnummer om tillämpligt]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Ansvarig utgivare
              </h2>
              <p>
                [Platshållartext: Namn på ansvarig person]<br />
                [Platshållartext: Roll/Titel]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Organisationsform
              </h2>
              <p>
                Rackis för Barn är en ideell förening registrerad i Sverige.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Impressum;
