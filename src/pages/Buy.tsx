import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Instagram,
  Heart,
  MapPin,
  MessageCircle,
  Clock,
  BedDouble,
  ChefHat,
  Zap,
  PackageOpen,
} from "lucide-react";
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
      const baseX = ((c + 0.5) / cols) * width;
      const baseY = ((r + 0.5) / rows) * height;
      const jitterX = (Math.random() - 0.5) * (width / cols);
      const jitterY = (Math.random() - 0.5) * (height / rows);
      const x = baseX + jitterX;
      const y = baseY + jitterY;
      const size =
        sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
      const delay = Math.random() * 600;
      hearts.push({ x, y, size, delay });
    }
  }

  return hearts;
}

export function Buy() {
  const [hearts, setHearts] = useState<
    { x: number; y: number; size: number; delay: number }[]
  >([]);

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
      {/* --- HERO SECTION --- */}
      <section className="bg-hero-gradient py-12 md:pb-16 relative overflow-hidden min-h-[35vh] flex items-center">
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
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-3 animate-fade-up">
              Find Your Treasure
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up delay-100">
              Buy Items
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up delay-200 leading-relaxed">
              At the beginning of each semester, we host a large sale for
              students moving in. Be quick to find the best deals!
            </p>
          </div>
        </div>
      </section>

      {/* --- LOGISTICS SECTION --- */}
      <section className="py-12 relative z-10">
        <div className="container max-w-4xl mx-auto text-center">
          {/* The Info Card */}
          <div className="bg-white border rounded-3xl p-6 max-w-2xl mx-auto mb-12 animate-fade-up delay-300 shadow-xl shadow-slate-100">
            <div className="space-y-5">
              {/* Where */}
              <div className="flex gap-4 text-left">
                <div className="p-2.5 bg-primary/10 rounded-full shrink-0 h-fit">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg mb-1">
                    Where to find us
                  </p>
                  <div className="space-y-0.5">
                    <p className="text-muted-foreground text-base">
                      <span className="font-semibold text-slate-900">
                        Rackarbergsgatan 32
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full"></div>

              {/* When */}
              <div className="flex gap-4 text-left">
                <div className="p-2.5 bg-orange-100 rounded-full shrink-0 h-fit">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg mb-1">
                    When we open
                  </p>
                  <p className="text-muted-foreground text-base">
                    <span className="font-semibold text-slate-900">
                      01.15 – 01.17
                    </span>
                    :{" "}
                    <span className="font-semibold text-slate-900">
                      10:00 - 22:00
                    </span>
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full"></div>

              {/* How */}
              <div className="flex gap-4 text-left">
                <div className="p-2.5 bg-blue-100 rounded-full shrink-0 h-fit">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg mb-1">
                    How to buy
                  </p>
                  <p className="text-muted-foreground text-base">
                    <span className="font-semibold text-slate-900">
                      First-come, first-served
                    </span>{" "}
                    basis. Come early!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all animate-fade-up delay-400"
          >
            <a
              href="https://instagram.com/rackis_for_barn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold"
            >
              <Instagram className="h-5 w-5" />
              Check Instagram for updates
            </a>
          </Button>
        </div>
      </section>

      {/* --- LIST OF ITEMS SECTION --- */}
      <section className="py-16 md:py-24 bg-slate-50/80 border-t border-slate-100">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You Can Buy
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We offer second-hand items perfect for your new room. Here is what you can typically find at our sales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* CATEGORY 1: Household & Bedding */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
                  <BedDouble className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Household & Bedding
                </h3>
              </div>
              <ul className="space-y-3 pl-2">
                {[
                  "Duvets and pillows",
                  "Bed sheets and blankets",
                  "Curtains & Rugs",
                  "Small household textiles",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-600 text-base"
                  >
                    <span className="text-slate-300 mt-1.5 text-xs">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CATEGORY 2: Kitchen */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-lg hover:border-orange-200 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 bg-orange-50 text-orange-600 rounded-xl">
                  <ChefHat className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Kitchen Equipment
                </h3>
              </div>
              <ul className="space-y-3 pl-2">
                {[
                  "Pots, pans & frying pans",
                  "Cutlery and cooking utensils",
                  "Plates, bowls, cups and glasses",
                  "Food storage containers",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-600 text-base"
                  >
                    <span className="text-slate-300 mt-1.5 text-xs">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CATEGORY 3: Electronics */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-lg hover:border-yellow-200 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 bg-yellow-50 text-yellow-600 rounded-xl">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Electronics</h3>
              </div>
              <ul className="space-y-3 pl-2">
                {[
                  "Routers and Wi-Fi equipment",
                  "Extension cords & power strips",
                  "Desk lamps and floor lamps",
                  "Small appliances (kettles, toasters)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-600 text-base"
                  >
                    <span className="text-slate-300 mt-1.5 text-xs">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CATEGORY 4: Misc */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl">
                  <PackageOpen className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  And Much More...
                </h3>
              </div>
              <ul className="space-y-3 pl-2">
                {[
                  "Small shelves and storage boxes",
                  "Mirrors and decoration",
                  "Laundry racks and hangers",
                  "Bicycles in working condition",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-600 text-base"
                  >
                    <span className="text-slate-300 mt-1.5 text-xs">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            {/* CLICKABLE BOTTOM BANNER */}
            <a
              href="https://instagram.com/rackis_for_barn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm text-sm text-slate-600 hover:shadow-md hover:border-primary/50 transition-all group"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="group-hover:text-primary transition-colors">
                Follow us on Instagram for updates on sale dates and opening
                hours!
              </span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Buy;