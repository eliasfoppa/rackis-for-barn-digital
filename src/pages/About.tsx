import { Layout } from "@/components/layout/Layout";
import { Heart, Target, Users, Award, Recycle, MapPin } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import eliasImg from "@/assets/elias.png";
import jacobImg from "@/assets/jacob.png";
import leaImg from "@/assets/lea.png";
import lenkaImg from "@/assets/lenka.png";
import lukasImg from "@/assets/lukas.png";

// --- PHYSICS ENGINE: Ease-Out-Quartic ---
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

// Generate hearts on a jittered grid like homepage
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
      const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
      const delay = Math.random() * 600;
      hearts.push({ x, y, size, delay });
    }
  }

  return hearts;
}

const About = () => {
  const [hearts, setHearts] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  // --- VALUES SCROLL STATE (MOBILE) ---
  const [currentStep, setCurrentStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);
  const isJumpingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef(0);

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

  const values = [
    {
      icon: Recycle,
      title: "Sustainability",
      description: "We believe in reducing waste and giving items a second chance at life.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "Every action we take is driven by our desire to help children in need.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Built by students, for students. We understand the Uppsala student life.",
    },
    {
      icon: Award,
      title: "Transparency",
      description: "100% of our profits go directly to Barncancerfonden and RBU.",
    },
  ];

  // Mobile Clone Data for Infinite Loop
  const scrollData = [...values.slice(-1), ...values, ...values.slice(0, 1)];

  const boardMembers = [
    { name: "Jacob Lehmann", role: "President & Founder", img: jacobImg },
    { name: "Elias Foppa", role: "Vice President & Treasurer", img: eliasImg },
    { name: "Lea Poewe", role: "Secretary & Head of Marketing", img: leaImg },
  ];

  // --- MOBILE EFFECT: Initialize Scroll ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && container.firstElementChild) {
      const firstCard = container.firstElementChild as HTMLElement;
      const style = window.getComputedStyle(container);
      const gap = parseFloat(style.gap) || 16;
      cardWidthRef.current = firstCard.offsetWidth + gap;
      container.scrollLeft = cardWidthRef.current;
    }
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // --- GLIDE ENGINE ---
  const glideTo = (targetX: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startX = container.scrollLeft;
    const distance = targetX - startX;
    const duration = 450;
    const startTime = performance.now();

    container.style.scrollSnapType = 'none';

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuart(progress);

      container.scrollLeft = startX + (distance * ease);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        container.style.scrollSnapType = 'x mandatory';
        rafRef.current = null;
        handleScrollEnd();
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
        }
    }
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current;
    if (!container || isJumpingRef.current) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    const cardWidth = cardWidthRef.current;

    const isFlick = Math.abs(diff) > 30;
    const isDrag = Math.abs(diff) > cardWidth / 3;

    if (isFlick || isDrag) {
      const currentScroll = container.scrollLeft;
      const currentExactIndex = currentScroll / cardWidth;
      const baseIndex = Math.round(currentExactIndex);

      let targetIndex = baseIndex;
      if (diff > 0) targetIndex = diff > 0 && currentExactIndex > baseIndex ? baseIndex + 1 : baseIndex + 1;
      else targetIndex = diff < 0 && currentExactIndex < baseIndex ? baseIndex - 1 : baseIndex - 1;

      if (isFlick) {
        if (diff > 0) targetIndex = Math.floor(currentExactIndex) + 1;
        else targetIndex = Math.ceil(currentExactIndex) - 1;
      }

      targetIndex = Math.max(0, Math.min(targetIndex, scrollData.length - 1));
      glideTo(targetIndex * cardWidth);
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current || isJumpingRef.current) return;
    
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const cardWidth = cardWidthRef.current;
    if (cardWidth === 0) return;

    const rawIndex = Math.round(scrollLeft / cardWidth);
    let visualStep = rawIndex - 1;
    if (rawIndex === 0) visualStep = values.length - 1;
    if (rawIndex >= scrollData.length - 1) visualStep = 0;
    
    if (visualStep !== currentStep) {
        setCurrentStep(visualStep);
    }
  };

  const handleScrollEnd = useCallback(() => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    
    scrollTimeoutRef.current = setTimeout(() => {
      const container = scrollContainerRef.current;
      if (!container || isJumpingRef.current) return;

      const cardWidth = cardWidthRef.current;
      const scrollLeft = container.scrollLeft;
      const rawIndex = Math.round(scrollLeft / cardWidth);

      if (rawIndex >= scrollData.length - 1) {
        isJumpingRef.current = true;
        container.style.scrollSnapType = 'none';
        container.scrollLeft = cardWidth * 1;
        requestAnimationFrame(() => {
            container.style.scrollSnapType = 'x mandatory';
            isJumpingRef.current = false;
        });
      } else if (rawIndex <= 0) {
        isJumpingRef.current = true;
        container.style.scrollSnapType = 'none';
        container.scrollLeft = cardWidth * values.length;
        requestAnimationFrame(() => {
            container.style.scrollSnapType = 'x mandatory';
            isJumpingRef.current = false;
        });
      }
    }, 50);
  }, [values.length, scrollData.length, currentStep]);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient py-8 md:py-12 relative overflow-hidden min-h-[30vh] flex flex-col items-center justify-center">
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
              About Rackis for Barn
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-100 leading-relaxed">
              As new students in Uppsala, we struggled to find second-hand essentials,
              while others moving out were throwing away perfectly good items.
              We’ve been working ever since to tackle these problems.
            </p>
          </div>
        </div>
      </section>

      {/* What We Are */}
      <section className="py-8 md:py-12">
        <div className="container-narrow">
          <div className="max-w-none">
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-3">
              Who we are
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mb-6">
              More than just a second-hand store
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Rackis for Barn is a student-run non-profit organization designed
                specifically for students in Uppsala to exchange second-hand items
                during move-ins and move-outs. What makes us unique is that we collect
                and sell second-hand items directly at student housing locations,
                making settling into Uppsala more convenient and sustainable.
              </p>
              <p>
                When students move out, instead of throwing away items 
                they donate them to us. We collect many items like bedding,
                curtains, bikes, kitchen equipment, lamps, small furniture, decoration,
                and much more. Then, students moving into new places can 
                find everything they need at fair prices.
              </p>
              <p className="text-foreground font-semibold">
                All profits from sales go directly to Barncancerfonden and RBU,
                supporting children and their families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Name Meaning */}
      <section className="py-8 md:py-12 bg-section-alt">
        <div className="container-narrow text-center">
          <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-2">
            Our name
          </span>
          <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mb-3">
            What "Rackis for Barn" means
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            "Rackis" is short for{" "}
            <span className="font-semibold text-foreground">Rackarbergsgatan</span>,
            the student housing area where our journey began.
            "Barn" means{" "}
            <span className="font-semibold text-foreground">children</span> in Swedish,
            reflecting our mission to support children in need.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-8 md:py-12 bg-section-warm">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-3">
              The people behind it
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mb-4">
              Our Team
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
              We are a group of dedicated students in Uppsala who believe in
              sustainability, community, and making a difference.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {boardMembers.map((member) => (
              <div key={member.name} className="card-warm text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="mx-auto w-24 h-24 object-cover rounded-full mb-3"
                />
                <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-4 mb-4 max-w-xl mx-auto">
            <div className="card-warm text-center">
              <img
                src={lenkaImg}
                alt="Lenka Benková"
                className="mx-auto w-24 h-24 object-cover rounded-full mb-3"
              />
              <h3 className="text-base font-bold text-foreground">Lenka Benková</h3>
              <p className="text-sm text-muted-foreground">Founding Member</p>
            </div>

            <div className="card-warm text-center">
              <img
                src={lukasImg}
                alt="Lukas Idman"
                className="mx-auto w-24 h-24 object-cover rounded-full mb-3"
              />
              <h3 className="text-base font-bold text-foreground">Lukas Idman</h3>
              <p className="text-sm text-muted-foreground">Founding Member</p>
            </div>
          </div>

          <p className="text-center text-base text-muted-foreground max-w-2xl mx-auto">
            In addition to our members, many amazing volunteers contribute their time
            and effort to make Rackis for Barn possible.
          </p>
        </div>
      </section>

      {/* Values (Enhanced with Scroll Logic) */}
      <section className="py-8 md:py-12 overflow-hidden">
        <div className="container">
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-3">
              What drives us
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-foreground">
              Our Values
            </h2>
          </div>

          {/* DESKTOP LAYOUT (Grid) */}
          <div className="hidden lg:grid grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="card-warm text-center"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>

          {/* MOBILE LAYOUT (Swipeable) */}
          <div className="lg:hidden relative">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-4 px-4 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overscrollBehaviorX: "contain",
              }}
            >
              {scrollData.map((value, i) => (
                <div
                  key={`${value.title}-${i}`}
                  className="snap-center snap-always shrink-0 w-[85vw] max-w-[300px]"
                >
                  <div className="card-warm text-center h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
              <div className="w-4 shrink-0" />
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-2">
              {values.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;