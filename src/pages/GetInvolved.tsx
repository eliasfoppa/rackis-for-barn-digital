import { Layout } from "@/components/layout/Layout";
import { Heart, Gift, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Generate jittered hearts like About page
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
      hearts.push({
        x: baseX + jitterX,
        y: baseY + jitterY,
        size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        delay: Math.random() * 600,
      });
    }
  }

  return hearts;
}

export default function GetInvolved() {
  const [hearts, setHearts] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  // Responsive hearts
  useEffect(() => {
    const updateHearts = () => {
      if (window.innerWidth < 768) {
        // Mobile: fewer hearts
        setHearts(generateJitteredHearts(3, 5, 100, 100, [12, 20]));
      } else {
        // Desktop: fewer than before
        setHearts(generateJitteredHearts(4, 6, 100, 100, [16, 30]));
      }
    };

    updateHearts();
    window.addEventListener("resize", updateHearts);
    return () => window.removeEventListener("resize", updateHearts);
  }, []);

  const steps = [
    {
      icon: Gift,
      title: "Donate",
      description:
        "Have items you no longer need? Give them a second life! We gladly accept duvets, curtains, bikes, kitchenware, clothing, shoes, toys, books, small furniture, and household gadgets. Contact us via Instagram or our contact page to arrange drop-offs.",
      bgColor: "bg-primary/10 text-primary",
      iconColor: "",
    },
    {
      icon: ShoppingBag,
      title: "Buy",
      description:
        "Looking for affordable second-hand treasures? Visit us in person to browse our selection of quality items, perfect for students or anyone looking for sustainable options. Check our Instagram to see upcoming sales.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Users,
      title: "Volunteer",
      description:
        "Join our dedicated team of volunteers! Help us collect, sort, and distribute items to support children in need. Tasks include organizing donations, assisting at our shop, and supporting community events. Reach out via Instagram or our contact page to get involved.",
      bgColor: "bg-accent/10 text-accent",
      iconColor: "",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero-gradient section-padding relative overflow-hidden min-h-[60vh] flex items-center">
        {/* Blobs */}
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/10 blob animate-float" />
        <div className="absolute bottom-32 right-[5%] w-48 h-48 bg-warm/10 blob animate-float delay-200" />

        {/* Floating hearts */}
        {hearts.map((h, i) => (
          <Heart
            key={i}
            className="absolute text-warm/30 animate-float"
            fill="currentColor"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              width: `${h.size}px`,
              height: `${h.size}px`,
              animationDelay: `${h.delay}ms`,
            }}
          />
        ))}

        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up">
              Get Involved
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-up delay-100 leading-relaxed max-w-2xl mx-auto">
              Help us make a difference! Whether you want to donate, shop, or volunteer, there are multiple ways to contribute to Rackis for Barn. Every action helps children in need and supports our student community.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-4">
              Ways to contribute
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground">
              How You Can Help
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.title} className="card-warm text-center group">
                <div
                  className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform`}
                >
                  <step.icon className={`h-8 w-8 ${step.iconColor ? step.iconColor : ""}`} />
                </div>
                <span className="inline-block text-sm font-bold text-muted-foreground/60 mb-2">
                  Step {i + 1}
                </span>
                <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-section-alt">
        <div className="container text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with us directly to donate items, shop in person, or join our volunteer team. Every action counts!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://instagram.com/rackis_for_barn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate Items
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a
                href="https://instagram.com/rackis_for_barn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop In Person
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a
                href="https://instagram.com/rackis_for_barn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Volunteer
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
