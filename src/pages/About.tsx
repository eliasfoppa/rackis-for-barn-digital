import { Layout } from "@/components/layout/Layout";
import { Heart, Target, Users, Award, Recycle, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import eliasImg from "@/assets/elias.png";
import jacobImg from "@/assets/jacob.png";
import leaImg from "@/assets/lea.png";

// Generate hearts on a jittered grid like homepage
function generateJitteredHearts(
  rows: number,
  cols: number,
  width = 100,
  height = 100,
  sizeRange: [number, number] = [16, 30] // pixel sizes like homepage
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

const About = () => {
  const [hearts, setHearts] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const updateHearts = () => {
      if (window.innerWidth < 768) {
        setHearts(generateJitteredHearts(3, 5, 100, 100, [12, 20]));
      } else {
        setHearts(generateJitteredHearts(4, 6, 100, 100, [16, 30]));
      }
    };
    updateHearts();
    window.addEventListener("resize", updateHearts);
    return () => window.removeEventListener("resize", updateHearts);
  }, []);

  const values = [
    { icon: Recycle, title: "Sustainability", description: "We believe in reducing waste and giving items a second chance at life." },
    { icon: Heart, title: "Compassion", description: "Every action we take is driven by our desire to help children in need." },
    { icon: Users, title: "Community", description: "Built by students, for students. We understand the Uppsala student life." },
    { icon: Award, title: "Transparency", description: "100% of our profits go directly to Barncancerfonden and RBU." },
  ];

  const boardMembers = [
    { name: "Jacob Lehmann", role: "President & Founder", /* img: jacobImg */ img: "https://via.placeholder.com/128?text=Jacob" }, // TODO: replace with jacobImg
    { name: "Elias Foppa", role: "Vice President & Treasurer", img: eliasImg },
    { name: "Lea Poewe", role: "Secretary & Head of Marketing", /* img: leaImg */ img: "https://via.placeholder.com/128?text=Lea" }, // TODO: replace with leaImg
  ];


  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient section-padding relative overflow-hidden min-h-[60vh] flex flex-col items-center justify-center">
        {/* Background blobs */}
        <div className="absolute top-20 right-[10%] w-48 h-48 bg-primary/10 blob animate-float" />
        <div className="absolute bottom-10 left-[5%] w-32 h-32 bg-warm/10 blob animate-wiggle" />

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
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up">
              About Rackis för Barn
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-up delay-100 leading-relaxed">
              We were all once new students in Uppsala, and quickly noticed how difficult it was to find second-hand items like bedding for our new rooms. At the same time, many students moving out were throwing away perfectly good items. Since then, we’ve been working every day to tackle both of these problems.
            </p>
          </div>
        </div>
      </section>

      {/* What We Are */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="max-w-none">
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-4">Who we are</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-8">
              More than just a second-hand store
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Rackis för Barn is a student-run non-profit organization designed specifically for students in Uppsala to exchange second-hand items during move-ins and move-outs. We believe in creating a sustainable cycle where useful items find new homes instead of being discarded.
              </p>
              <p>
                When students move out, instead of throwing away items that are still useful, they donate them to us. We collect many items like bedding, curtains, bikes, kitchen equipment, lamps, small furniture, decoration, and much more. Then, students moving into new places can browse our collection and find everything they need at fair, student-friendly prices.
              </p>
              <p className="text-foreground font-semibold">
                All profits from sales go directly to Barncancerfonden and RBU, supporting children and their families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Name Meaning */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow text-center">
          <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-2">Our name</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
            What "Rackis för Barn" means
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            "Rackis" is short for <span className="font-semibold text-foreground">Rackarbergsgatan</span>, the student housing area where our journey began.
            "För Barn" means <span className="font-semibold text-foreground">for children</span> in Swedish, reflecting our mission to support children in need.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-section-warm">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-4">The people behind it</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6">
              Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              We are a group of dedicated students in Uppsala who believe in sustainability, community, and making a difference.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            {boardMembers.map((member) => (
              <div key={member.name} className="card-warm text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="mx-auto w-32 h-32 object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
            In addition to our board, many amazing volunteers contribute their time and effort to make Rackis för Barn possible.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-4">What drives us</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground">
              Our Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={value.title} className="card-warm text-center" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
