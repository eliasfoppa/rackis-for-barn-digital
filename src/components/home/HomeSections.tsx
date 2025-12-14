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

export function HowItWorksSection() {
  const steps = [
    {
      icon: ShoppingBag,
      title: "Shop",
      description:
        "Moving in? We've got you covered for your first days in Uppsala (and beyond).",
      color: "bg-green-100",
      action: { type: "link", to: "/buy" },
    },
    {
      icon: Heart,
      title: "Support",
      description:
        "All profits from your purchase go directly to Barncancerfonden and RBU, supporting children in need.",
      color: "bg-warm/10 text-warm",
      action: { type: "scroll", target: "charities" },
    },
    {
      icon: Gift,
      title: "Donate",
      description:
        "Moving out? Give items a second life. We accept everything from bedding to bikes and more.",
      color: "bg-primary/10 text-primary",
      action: { type: "link", to: "/donate" },
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* ======================
      GEOMETRY CONSTANTS
   ====================== */

  const containerWidth = 1200;
  const containerHeight = 830;
  const boxWidth = 350;
  const boxHeight = 350;

  // Box positions
  const box1Left = (containerWidth - boxWidth) / 2; // ~425
  const box1Top = 30;

  const box2Left = containerWidth - 80 - boxWidth; // ~770
  const box2Top = 430;

  const box3Left = 80; // ~80
  const box3Top = 430;

  const boxes = [
    { x: box1Left, y: box1Top },
    { x: box2Left, y: box2Top },
    { x: box3Left, y: box3Top },
  ];

  // Circle Geometry (Kept from the previous fix for perfect arrow placement)
  const circleCX = 600;
  const circleCY = 471;
  const circleR = 347;

  /* ======================
      ARROW PLACEMENT
   ====================== */

  // Helper to get point on circle and tangent rotation
  const getArrowOnCircle = (
    targetX: number,
    targetY: number,
    side: "left" | "top" | "right"
  ) => {
    let x = targetX;
    let y = targetY;

    // 1. Calculate intersection point on the circle edge closest to the box
    if (side === "left") {
      // Find Y given X (left edge of box)
      const dx = targetX - circleCX;
      // Top half of circle for Shop box
      y = circleCY - Math.sqrt(Math.pow(circleR, 2) - Math.pow(dx, 2));
    } else if (side === "top") {
      // Find X given Y (top edge of box)
      const dy = targetY - circleCY;
      // Right half of circle for Support box
      x = circleCX + Math.sqrt(Math.pow(circleR, 2) - Math.pow(dy, 2));
    } else if (side === "right") {
      // Find Y given X (right edge of box)
      const dx = targetX - circleCX;
      // Bottom half of circle for Donate box
      y = circleCY + Math.sqrt(Math.pow(circleR, 2) - Math.pow(dx, 2));
    }

    // 2. Calculate Angle from center
    const angleRad = Math.atan2(y - circleCY, x - circleCX);

    // 3. Tangent Angle (Clockwise flow = angle + 90deg)
    const rotation = (angleRad * 180) / Math.PI + 90;

    return { x, y, rotation };
  };

  // Define where arrows should hit the boxes
  const arrows = [
    // Arrow 1: Hits Box 1 (Shop) on its Left edge
    getArrowOnCircle(box1Left, 0, "left"),

    // Arrow 2: Hits Box 2 (Support) on its Top edge
    getArrowOnCircle(0, box2Top, "top"),

    // Arrow 3: Hits Box 3 (Donate) on its Right edge
    getArrowOnCircle(box3Left + boxWidth, 0, "right"),
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            A simple cycle that helps students, reduces waste, and supports a
            great cause.
          </p>
        </div>

        {/* DESKTOP LAYOUT (Visible lg+) */}
        <div
          className="hidden lg:block relative mx-auto"
          style={{ width: containerWidth, height: containerHeight }}
        >
          {/* Circle Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <circle
              cx={circleCX}
              cy={circleCY}
              r={circleR}
              stroke="#0024a8"
              strokeWidth="4"
              fill="none"
              opacity="0.2"
            />
          </svg>

          {/* Independent Arrowheads (Bigger size retained from previous request) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 4 }}
          >
            {arrows.map((arrow, i) => (
              <g
                key={i}
                transform={`translate(${arrow.x}, ${arrow.y}) rotate(${arrow.rotation})`}
              >
                {/* Arrowhead shape */}
                <path
                  d="M-8,-11 L14,0 L-8,11 L-8,-11 Z"
                  fill="#0024a8"
                />
              </g>
            ))}
          </svg>

          {/* Boxes (Restored original text styles) */}
          {boxes.map((b, i) => {
            const Icon = steps[i].icon;
            return (
              <div
                key={i}
                // Restored original card classes
                className="absolute card-warm text-center flex flex-col"
                style={{
                  left: b.x,
                  top: b.y,
                  width: boxWidth,
                  zIndex: 2,
                }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${steps[i].color} mx-auto mb-6 flex items-center justify-center`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                {/* Restored original Step text style */}
                <span className="text-sm font-bold text-muted-foreground/60 mb-2">
                  Step {i + 1}
                </span>
                <h3 className="text-2xl font-bold mb-3">{steps[i].title}</h3>
                {/* Restored original Description text style */}
                <p className="text-muted-foreground mb-6">
                  {steps[i].description}
                </p>
                {steps[i].action.type === "link" ? (
                  <a
                    href={steps[i].action.to}
                    // Restored original button/link style
                    className="mt-auto px-5 py-2 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition"
                  >
                    Learn more →
                  </a>
                ) : (
                  <button
                    onClick={() => scrollToSection(steps[i].action.target)}
                    // Restored original button/link style
                    className="mt-auto px-5 py-2 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition"
                  >
                    Learn more →
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* MOBILE / TABLET LAYOUT (< lg) - Keeping mobile part original */}
        <div className="grid md:grid-cols-3 gap-8 lg:hidden z-20 relative">
          {steps.map((step, i) => (
            <div key={step.title} className="card-warm text-center flex flex-col">
              <div
                className={`w-16 h-16 rounded-2xl ${step.color} mx-auto mb-6 flex items-center justify-center`}
              >
                <step.icon className="h-8 w-8" />
              </div>
              <span className="text-sm font-bold text-muted-foreground/60 mb-2">
                Step {i + 1}
              </span>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground mb-6">{step.description}</p>
              {step.action.type === "link" ? (
                <a
                  href={step.action.to}
                  className="mt-auto px-5 py-2 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition"
                >
                  Learn more →
                </a>
              ) : (
                <button
                  onClick={() => scrollToSection(step.action.target)}
                  className="mt-auto px-5 py-2 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition"
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

export function PartnersSection() {
  const partners = [
    {
      name: "Uppsala University Innovation",
      logo: "/src/assets/uu-innovation.png",
      description: "Uppsala University Innovation provides guidance and resources to help Rackis for Barn expand its reach and positive impact.",
      url: "https://www.uuinnovation.uu.se",
    },
    {
      name: "Uppsalahem",
      logo: "/src/assets/uppsalahem.png",
      description: "Generously provides access to storage units, enabling us to collect and sell items directly at student housing locations.",
      url: "https://www.uppsalahem.se",
    },
  ];

   return (
    <section className="section-padding bg-section-light">
      <div className="container text-center">
        <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-3">
          In collaboration with
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          Our Supportive Partners
        </h2>
        <div className="flex flex-wrap justify-center gap-16 items-center">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center max-w-xs hover:scale-105 transition-transform"
            >
              {/* Bigger container for larger logos */}
              <div className="flex items-center justify-center w-64 h-32 mb-3">
                <img
                  src={partner.logo}
                  alt={`${partner.name} Logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-muted-foreground text-center">{partner.description}</p>
            </a>
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