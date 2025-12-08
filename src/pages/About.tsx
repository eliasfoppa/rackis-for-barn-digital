import { Layout } from "@/components/layout/Layout";
import { Heart, Target, Users, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Empathy",
      description: "We always put the children's best interests first and act with care and understanding.",
    },
    {
      icon: Target,
      title: "Dedication",
      description: "As students, we are passionate about making a real difference in society.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Together we can achieve more than we ever could on our own.",
    },
    {
      icon: Award,
      title: "Transparency",
      description: "We are open about how we work and how our resources are used.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
              About Rackis for Barn
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-100">
              A student-run nonprofit organization dedicated to making a difference for children in Sweden.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                [Placeholder: Tell the story of how the organization was founded. Who started it, 
                when, and why? What was the original vision?]
              </p>
              <p>
                [Placeholder: Describe how the organization has developed since its founding. 
                What milestones have you achieved? How have you grown as a group?]
              </p>
              <p>
                [Placeholder: Explain what drives you today and what you hope to 
                achieve in the future. What impact do you want to have on society?]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Our Mission
          </h2>
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed">
              [Placeholder: Write your mission statement here. What is your main 
              purpose and what do you strive to achieve for the children you help?]
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
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
            Our Team
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            [Placeholder: Briefly introduce the team. You can add photos and 
            information about key people here.]
          </p>
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">
              We are a group of dedicated students who are passionate about helping children. 
              Our strength lies in our diversity and our shared goal.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
