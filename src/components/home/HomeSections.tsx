import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Recycle, ShoppingBag, MapPin, Instagram, Bike, Home, Users, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "@/assets/logo.png"; // your teddy bear logo


// Generate hearts on a jittered grid
function generateJitteredHearts(
  rows: number,
  cols: number,
  width = 100,
  height = 100,
  sizeRange: [number, number] = [16, 30]
) {
  const hearts: { x: number; y: number; size: number; delay: number }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const baseX = (c + 0.5) / cols * width;
      const baseY = (r + 0.5) / rows * height;
      const jitterX = (Math.random() - 0.5) * (width / cols);
      const jitterY = (Math.random() - 0.5) * (height / rows);
      const x = baseX + jitterX;
      const y = baseY + jitterY;
      const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
      const delay = Math.random() * 600;

      hearts.push({ x, y, size, delay });
    }
  }

  return hearts;
}

export function HeroSection() {
  const [hearts, setHearts] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const updateHearts = () => {
      if (window.innerWidth < 768) {
        // Mobile: a few more hearts than before
        setHearts(generateJitteredHearts(3, 5, 100, 100, [12, 20])); // 15 hearts
      } else {
        // Desktop: full hearts
        setHearts(generateJitteredHearts(4, 7, 100, 100, [16, 30])); // 28 hearts
      }
    };

    updateHearts();
    window.addEventListener("resize", updateHearts);

    return () => window.removeEventListener("resize", updateHearts);
  }, []);


  return (
    <section className="relative overflow-hidden bg-hero-gradient min-h-[85vh] flex items-center">
      {/* BLOBS */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/10 blob animate-float" />
      <div className="absolute bottom-32 right-[5%] w-48 h-48 bg-warm/10 blob animate-float delay-200" />

      {/* HEARTS */}
      {hearts.map((h, i) => (
        <Heart
          key={i}
          className="absolute text-warm/30 animate-float"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            animationDelay: `${h.delay}ms`,
          }}
          fill="currentColor"
        />
      ))}

      {/* MAIN CONTENT */}
      <div className="container section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-8 animate-fade-up">
            <Heart className="h-4 w-4 text-accent" fill="currentColor" />
            <span>By students, for students in Uppsala</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-[1.1] mb-8 animate-fade-up delay-100">
            Give items a{" "}
            <span className="hand-drawn-underline text-primary">second life</span>
            {" "}and help children in need
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-200 leading-relaxed">
            Donated items become affordable finds for fellow students
            <br /> 
            all profit goes directly to{" "}
            <span className="font-semibold text-foreground">Barncancerfonden</span> and{" "}
            <span className="font-semibold text-foreground">RBU</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Button variant="hero" size="lg" asChild className="text-lg px-8">
              <a href="https://instagram.com/rackis_for_barn" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Follow us
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

// Keep other sections (HeroSection, CTASection, etc.) as they were originally, 
// since we know they are not crashing the app.

export function HowItWorksSection() {
  const steps = [
    {
      icon: ShoppingBag,
      title: "Shop",
      description: "Moving in? We've got you covered for your first days in Uppsala (and beyond).",
      color: "bg-green-100",
      action: { type: "link", to: "/buy" }
    },
    {
      icon: Heart,
      title: "Support",
      description: "All profits from your purchase go directly to Barncancerfonden and RBU, supporting children in need.",
      color: "bg-warm/10 text-warm",
      action: { type: "scroll", target: "charities" }
    },
    {
      icon: Gift,
      title: "Donate",
      description: "Moving out? Don’t throw away useful items. Give them to us! We accept bedding, curtains, bikes, kitchen gear, and more.",
      color: "bg-primary/10 text-primary",
      action: { type: "link", to: "/donate" }
    },
  ];

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            A simple cycle that helps students, reduces waste, and supports a great cause.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.title} className="card-warm text-center group flex flex-col">
              <div
                className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform`}
              >
                <step.icon className={`h-8 w-8 ${step.title === "Shop" ? "text-green-600" : ""}`} />
              </div>

              <span className="inline-block text-sm font-bold text-muted-foreground/60 mb-2">
                Step {index + 1}
              </span>

              <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {step.description}
              </p>

              {/* BUTTON */}
              {step.action.type === "link" ? (
                <Link
                  to={step.action.to}
                  className="mt-auto inline-block px-5 py-2 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition"
                >
                  Learn more →
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(step.action.target)}
                  className="mt-auto inline-block px-5 py-2 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition"
                >
                  Learn more →
                </button>
              )}
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
    { icon: Heart, title: "Charitable", description: "Every purchase supports children in need." },
    { icon: Home, title: "Convenient", description: "Directly buy from student housing locations." },
    { icon: ShoppingBag, title: "Affordable", description: "Quality items at student-friendly prices." }, 
    { icon: Users, title: "Community", description: "Run by students, for students." },
    { icon: Bike, title: "Variety", description: "From bedsheets to bikes, we have it all." },
  ];

  return (
    <section className="section-padding bg-section-warm">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">What makes Rackis for Barn unique?</h2>
          <p className="text-lg text-muted-foreground">More than just a second-hand store.</p>
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

export function AboutCharitiesSection() {
  return (
    <section id="charities" className="section-padding">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-4">Our cause</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Supporting children in need</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-warm">
              <h3 className="text-xl font-bold text-foreground mb-4">Barncancerfonden</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sweden's leading organization dedicated to supporting children with cancer and their families. Through research funding and family support programs, they work to improve outcomes for young cancer patients.
              </p>
              <a
                href="https://www.barncancerfonden.se"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Learn more at barncancerfonden.se
              </a>
            </div>

            <div className="card-warm">
              <h3 className="text-xl font-bold text-foreground mb-4">RBU</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Riksförbundet för Rörelsehindrade Barn och Ungdomar works to improve the lives of children and young people with mobility impairments in Sweden through advocacy and support programs.
              </p>
              <a
                href="https://www.rbu.se"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Learn more at rbu.se
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary/10">
              <Heart className="h-8 w-8 text-warm" fill="currentColor" />
              <p className="font-display text-xl font-bold text-foreground">100% of profits go to these charities</p>
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
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/70 text-lg px-8">
              <a href="https://instagram.com/rackis_for_barn" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Follow @rackis_for_barn
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white/30 text-primary hover:bg-white/70 text-lg px-8">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}