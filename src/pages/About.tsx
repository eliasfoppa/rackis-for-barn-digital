import { Layout } from "@/components/layout/Layout";
import { Heart, Target, Users, Award, Recycle, MapPin } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Recycle,
      title: "Sustainability",
      description: "We believe in reducing waste and giving items a second chance at life.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "Every action we take is driven by our desire to help children with cancer.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Built by students, for students — we understand the Uppsala student life.",
    },
    {
      icon: Award,
      title: "Transparency",
      description: "100% of our profits go directly to Barncancerfonden. No exceptions.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient section-padding relative overflow-hidden">
        <div className="absolute top-20 right-[10%] w-48 h-48 bg-primary/10 blob animate-float" />
        <div className="absolute bottom-10 left-[5%] w-32 h-32 bg-warm/10 blob animate-wiggle" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up">
              About Rackis for Barn
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-up delay-100 leading-relaxed">
              A student-run second-hand store in Uppsala, turning move-out items into support for children with cancer.
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
                Rackis for Barn is a platform designed specifically for students in Uppsala to exchange second-hand items during move-ins and move-outs. We believe in creating a sustainable cycle where useful items find new homes instead of being discarded.
              </p>
              <p>
                When students move out, instead of throwing away items that are still useful, they donate them to us. We collect items like duvets, curtains, bikes, kitchen equipment, and much more. Then, students moving into new places can browse our collection and find everything they need at fair, student-friendly prices.
              </p>
              <p className="text-foreground font-semibold">
                But here's what makes us special: all profits from sales go directly to Barncancerfonden, supporting children with cancer and their families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Card */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Visit us in Uppsala
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  You can find us at <span className="font-semibold text-foreground">Rackarbergsgatan 32</span> — check our Instagram for opening times and the latest arrivals.
                </p>
                <a 
                  href="https://instagram.com/rackisforbarn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  Follow @rackisforbarn →
                </a>
              </div>
            </div>
          </div>
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
              <div
                key={value.title}
                className="card-warm text-center"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
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

      {/* Barncancerfonden */}
      <section className="section-padding bg-section-warm">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-4">Our cause</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6">
              About Barncancerfonden
            </h2>
          </div>
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed text-center">
              <p>
                Barncancerfonden is Sweden's leading organization dedicated to supporting children with cancer and their families.
              </p>
              <p>
                Through research funding, family support programs, and advocacy, they work tirelessly to improve outcomes for young cancer patients and their loved ones.
              </p>
              <p className="text-foreground font-semibold">
                By shopping at or donating to Rackis for Barn, you're directly contributing to this vital work.
              </p>
            </div>
            <div className="mt-8 text-center">
              <a 
                href="https://www.barncancerfonden.se" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Learn more at barncancerfonden.se →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center">
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-4">The people behind it</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6">
              Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a group of dedicated students in Uppsala who believe in sustainability, community, and making a difference. Our strength lies in our shared passion for helping both fellow students and children in need.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
