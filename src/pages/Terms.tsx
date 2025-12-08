import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Villkor
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Senast uppdaterad: [Datum]
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Allmänt
              </h2>
              <p>
                Genom att använda denna webbplats godkänner du dessa villkor. Om du inte 
                godkänner villkoren, vänligen använd inte webbplatsen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Användning av webbplatsen
              </h2>
              <p>
                Innehållet på denna webbplats är avsett för informationsändamål. Du får inte 
                använda webbplatsen på ett sätt som kan skada, inaktivera eller överbelasta den.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Immateriella rättigheter
              </h2>
              <p>
                Allt innehåll på denna webbplats, inklusive text, bilder och logotyper, 
                tillhör Rackis för Barn om inget annat anges.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Ansvarsbegränsning
              </h2>
              <p>
                [Platshållartext: Beskriv eventuella ansvarsbegränsningar för organisationen.]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Ändringar
              </h2>
              <p>
                Vi förbehåller oss rätten att när som helst ändra dessa villkor. Ändringar 
                träder i kraft när de publiceras på denna sida.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Kontakt
              </h2>
              <p>
                För frågor om dessa villkor, kontakta oss på kontakt@rackisforbarn.se.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
