import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Recycle, ShoppingBag, MapPin, Instagram, Bike, Home, Users, Gift } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient min-h-[85vh] flex items-center">
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/10 blob animate-float" />
      <div className="absolute bottom-32 right-[5%] w-48 h-48 bg-warm/10 blob animate-float delay-200" />
      
      <div className="container section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-8 animate-fade-up">
            <Heart className="h-4 w-4 text-accent" fill="currentColor" />
            <span>By students, for students in Uppsala</span>
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-[1.1] mb-8 animate-fade-up delay-100">
            Give items a{" "}
            <span className="hand-drawn-underline text-primary">second life</span>
            {" "}and help children with cancer
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-200 leading-relaxed">
            Your donated items become affordable finds for fellow students — and every profit goes directly to{" "}
            <span className="font-semibold text-foreground">Barncancerfonden</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Button variant="hero" size="lg" asChild className="text-lg px-8">
              <a href="https://instagram.com/rackisforbarn" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Visit our shop
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild className="text-lg px-8">
              <Link to="/about">
                Learn more
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground animate-fade-up delay-400">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">Find us at Rackarbergsgatan 32, Uppsala</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    { icon: Gift, title: "Donate", description: "Moving out? Don't throw away useful items — give them to us! We accept duvets, curtains, bikes, kitchen gear, and more.", color: "bg-primary/10 text-primary" },
    { icon: ShoppingBag, title: "Shop", description: "Moving in? Browse our collection of quality second-hand items at fair, student-friendly prices.", color: "bg-warm/10 text-warm" },
    { icon: Heart, title: "Support", description: "All profits go directly to Barncancerfonden, supporting children with cancer and their families.", color: "bg-accent/10 text-accent" },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">How it works</h2>
          <p className="text-lg text-muted-foreground">A simple cycle that helps students, reduces waste, and supports a great cause.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.title} className="card-warm text-center group">
              <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform`}>
                <step.icon className="h-8 w-8" />
              </div>
              <span className="inline-block text-sm font-bold text-muted-foreground/60 mb-2">Step {index + 1}</span>
              <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  const benefits = [
    { icon: Recycle, title: "Sustainable", description: "Reduce waste by giving items a second life." },
    { icon: ShoppingBag, title: "Affordable", description: "Quality items at student-friendly prices." },
    { icon: Heart, title: "Charitable", description: "Every purchase supports Barncancerfonden." },
    { icon: Home, title: "Convenient", description: "Everything to make your place feel like home." },
    { icon: Users, title: "Community", description: "Run by students, for students." },
    { icon: Bike, title: "Variety", description: "From bikes to kitchen gear — we've got it all." },
  ];

  return (
    <section className="section-padding bg-section-warm">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Why choose Rackis?</h2>
          <p className="text-lg text-muted-foreground">More than just a second-hand store — we're building a sustainable student community.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="group p-6 rounded-2xl bg-card/80 backdrop-blur border border-border hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutBarncancerfondenSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-4">Our cause</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Supporting Barncancerfonden</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Barncancerfonden is Sweden's leading organization dedicated to supporting children with cancer and their families.</p>
              <p className="font-semibold text-foreground">Every item you donate or purchase helps fund this vital work.</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-warm/10 to-accent/20 flex items-center justify-center">
              <div className="text-center p-8">
                <Heart className="h-20 w-20 text-accent mx-auto mb-6" fill="currentColor" />
                <p className="font-display text-2xl font-bold text-foreground">100% of profits</p>
                <p className="text-muted-foreground mt-2">go to Barncancerfonden</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">Ready to find your next treasure?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">Visit us at Rackarbergsgatan 32 in Uppsala. Check our Instagram for opening times!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 text-lg px-8">
              <a href="https://instagram.com/rackisforbarn" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Follow @rackisforbarn
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white/30 text-primary-foreground hover:bg-white/10 text-lg px-8">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
