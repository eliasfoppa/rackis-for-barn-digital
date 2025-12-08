import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Integritetspolicy
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Senast uppdaterad: [Datum]
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Inledning
              </h2>
              <p>
                Rackis för Barn värnar om din integritet. Denna integritetspolicy förklarar 
                hur vi samlar in, använder och skyddar dina personuppgifter.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Vilka uppgifter vi samlar in
              </h2>
              <p>
                [Platshållartext: Beskriv vilka personuppgifter ni samlar in, t.ex. namn, 
                e-postadress, etc.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Hur vi använder dina uppgifter
              </h2>
              <p>
                [Platshållartext: Förklara hur ni använder de insamlade uppgifterna, t.ex. 
                för att kommunicera, skicka nyhetsbrev, etc.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Delning av uppgifter
              </h2>
              <p>
                [Platshållartext: Förklara om och hur ni delar uppgifter med tredje part.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Dina rättigheter
              </h2>
              <p>
                Enligt GDPR har du rätt att begära tillgång till, rättelse av eller radering 
                av dina personuppgifter. Kontakta oss om du vill utöva dessa rättigheter.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Kontakt
              </h2>
              <p>
                För frågor om denna integritetspolicy, kontakta oss på kontakt@rackisforbarn.se.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
