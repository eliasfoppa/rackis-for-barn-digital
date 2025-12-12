import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Instagram, Heart, MapPin, MessageCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

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

export function Buy() {
  const [hearts, setHearts] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const updateHearts = () => {
      if (window.innerWidth < 768) {
        setHearts(generateJitteredHearts(2, 4, 100, 100, [12, 20]));
      } else {
        setHearts(generateJitteredHearts(3, 5, 100, 100, [16, 30]));
      }
    };
    updateHearts();
    window.addEventListener("resize", updateHearts);
    return () => window.removeEventListener("resize", updateHearts);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero-gradient py-8 md:pb-12 relative overflow-hidden min-h-[30vh] flex items-center">
        {/* Background blobs */}
        <div className="absolute top-10 right-[10%] w-32 h-32 bg-primary/10 blob animate-float" />
        <div className="absolute bottom-5 left-[5%] w-24 h-24 bg-warm/10 blob animate-wiggle" />

        {/* Floating hearts */}
        {hearts.map((h, i) => (
          <Heart
            key={i}
            className="absolute text-warm/30 animate-float"
            fill="currentColor"
            style={{
              top: `${h.y}%`,
              left: `${h.x}%`,
              width: `${h.size}px`,
              height: `${h.size}px`,
              animationDelay: `${h.delay}ms`,
            }}
          />
        ))}

        <div className="container relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up">
              Buy Items
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-100 leading-relaxed">
              At the beginning of each semester, we host a large sale for students moving in.
              <br />
              Be quick to find your treasure!
            </p>
          </div>
        </div>
      </section>

      {/* Buy Info Section */}
      <section className="py-8 md:pb-12 relative z-10">
        <div className="container max-w-3xl mx-auto text-center space-y-4">
          
          <div className="bg-white/70 backdrop-blur-sm border rounded-2xl p-6 max-w-2xl mx-auto my-6 animate-fade-up delay-250 shadow-md">
            <div className="space-y-4">

              {/* Where */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-foreground text-base mb-1"> Where:</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Rackarbergsgatan 32 (Rackis)</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Flogsta</span> - only bedding during move-in days
                  </p>
                </div>
              </div>

              <div className="h-px bg-border"></div>

              {/* When */}
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-foreground text-base mb-1"> When:</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">At the beginning of each semester</span>
                  </p>
                  <p className="text-xs text-muted-foreground italic">Check Instagram for exact dates and times</p>
                </div>
              </div>

              <div className="h-px bg-border"></div>

              {/* How */}
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-foreground text-base mb-1"> How:</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">First-come, first-served basis.</span> Arrive early for the best finds!
                  </p>
                </div>
              </div>

            </div>
          </div>

          <Button size="default" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 animate-fade-up delay-400">
            <a
              href="https://instagram.com/rackis_for_barn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Check Instagram for opening times
            </a>
          </Button>
        </div>
      </section>

      {/* What You Can Buy */}
      <section className="py-8 md:py-12 bg-section-alt">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            What You Can Buy
          </h2>

          <p className="text-base text-muted-foreground text-center max-w-2xl mx-auto mb-8 leading-relaxed">
            We offer second hand items that help students settle into their new homes.
            The categories below show examples of what is sold.
          </p>

          <div className="space-y-6">

            {/* CATEGORY BLOCK */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border shadow-sm p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Household & Bedding
              </h3>
              <ul className="grid md:grid-cols-2 gap-y-2 gap-x-4 text-muted-foreground text-base leading-relaxed">
                <li>Duvets and pillows</li>
                <li>Bed sheets and blankets</li>
                <li>Curtains</li>
                <li>Small household textiles</li>
              </ul>
            </div>

            {/* CATEGORY BLOCK */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border shadow-sm p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Kitchen Equipment
              </h3>
              <ul className="grid md:grid-cols-2 gap-y-2 gap-x-4 text-muted-foreground text-base leading-relaxed">
                <li>Pots and pans</li>
                <li>Cutlery and cooking utensils</li>
                <li>Plates, bowls, cups and glasses</li>
                <li>Food storage containers</li>
              </ul>
            </div>

            {/* CATEGORY BLOCK */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border shadow-sm p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Electronics
              </h3>
              <ul className="grid md:grid-cols-2 gap-y-2 gap-x-4 text-muted-foreground text-base leading-relaxed">
                <li>Routers and basic Wi-Fi equipment</li>
                <li>Extension cords and power strips</li>
                <li>Desk lamps and floor lamps</li>
                <li>Small appliances: kettles, toasters, rice cookers</li>
              </ul>
            </div>

            {/* CATEGORY BLOCK */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border shadow-sm p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                And Many Other Items Such As...
              </h3>
              <ul className="grid md:grid-cols-2 gap-y-2 gap-x-4 text-muted-foreground text-base leading-relaxed">
                <li>Small shelves and storage containers</li>
                <li>Mirrors and decoration</li>
                <li>Laundry racks and hangers</li>
                <li>Bicycles in working condition</li>
              </ul>
            </div>

          </div>

          <p className="text-base text-muted-foreground text-center mt-8 leading-relaxed">
            Stop by during our sale days to see the full range of items available for purchase!
          </p>
        </div>
      </section>

    </Layout>
  );
}

export default Buy;