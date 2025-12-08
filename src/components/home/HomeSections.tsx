import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="container section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 animate-fade-up">
            <Sparkles className="h-4 w-4" />
            <span>Studentdriven ideell organisation</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up delay-100">
            Tillsammans skapar vi en{" "}
            <span className="text-primary">bättre framtid</span> för barn
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up delay-200">
            Rackis för Barn är en ideell organisation driven av studenter som arbetar 
            för att stödja och hjälpa barn i behov runt om i Sverige.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Button variant="hero" size="lg" asChild>
              <Link to="/about">
                Läs mer om oss
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/contact">Kontakta oss</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
}

export function MissionSection() {
  const features = [
    {
      icon: Heart,
      title: "Stöd & Omsorg",
      description: "Vi erbjuder emotionellt och praktiskt stöd till barn och familjer som behöver det mest.",
    },
    {
      icon: Users,
      title: "Gemenskap",
      description: "Vi skapar trygga mötesplatser där barn kan växa, lära sig och ha roligt tillsammans.",
    },
    {
      icon: Sparkles,
      title: "Möjligheter",
      description: "Vi öppnar dörrar till nya upplevelser och möjligheter för barn med begränsade resurser.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vad vi gör
          </h2>
          <p className="text-muted-foreground text-lg">
            [Platshållartext: Beskriv kort vad er organisation gör och vad som driver er.]
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vill du göra skillnad?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Oavsett om du vill bli volontär, donera eller bara lära dig mer om vårt arbete – 
            vi vill gärna höra från dig.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Ta kontakt
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
