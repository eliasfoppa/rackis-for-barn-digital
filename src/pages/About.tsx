import { Layout } from "@/components/layout/Layout";
import { Heart, Target, Users, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Empati",
      description: "Vi sätter alltid barnens bästa i centrum och agerar med omsorg och förståelse.",
    },
    {
      icon: Target,
      title: "Engagemang",
      description: "Som studenter brinner vi för att göra verklig skillnad i samhället.",
    },
    {
      icon: Users,
      title: "Samarbete",
      description: "Tillsammans kan vi åstadkomma mer än vi någonsin kunde göra på egen hand.",
    },
    {
      icon: Award,
      title: "Transparens",
      description: "Vi är öppna med hur vi arbetar och hur våra resurser används.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
              Om Rackis för Barn
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-100">
              En studentdriven ideell organisation dedikerad till att göra skillnad för barn i Sverige.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Vår historia
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                [Platshållartext: Berätta om hur organisationen grundades. Vem startade den, 
                när och varför? Vad var den ursprungliga visionen?]
              </p>
              <p>
                [Platshållartext: Beskriv hur organisationen har utvecklats sedan starten. 
                Vilka milstolpar har ni uppnått? Hur har ni växt som grupp?]
              </p>
              <p>
                [Platshållartext: Förklara vad som driver er idag och vad ni hoppas 
                uppnå i framtiden. Vilken inverkan vill ni ha på samhället?]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Vårt uppdrag
          </h2>
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed">
              [Platshållartext: Skriv er mission statement här. Vad är ert huvudsakliga 
              syfte och vad strävar ni efter att uppnå för barnen ni hjälper?]
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            Våra värderingar
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Vårt team
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            [Platshållartext: Presentera teamet kort. Ni kan lägga till foton och 
            information om nyckelpersoner här.]
          </p>
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">
              Vi är en grupp engagerade studenter som brinner för att hjälpa barn. 
              Vår styrka ligger i vår mångfald och vårt gemensamma mål.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
