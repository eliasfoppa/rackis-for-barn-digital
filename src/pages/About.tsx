import { Layout } from "@/components/layout/Layout";
import { Heart, Target, Users, Award, Recycle, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import eliasImg from "@/assets/elias.png";
import jacobImg from "@/assets/jacob.png";
import leaImg from "@/assets/lea.png";
import lenkaImg from "@/assets/lenka.png";
import lukasImg from "@/assets/lukas.png";

// --- PHYSICS: Ease-Out-Quart (Smooth Glide) ---
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

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
  const [currentStep, setCurrentStep] = useState(0);
  
  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);
  const visualCardWidthRef = useRef(0);
  const paddingLeftRef = useRef(0);
  
  // Animation State
  const isAnimatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef(0);
  const touchStartTimeRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      // 1. Update Hearts
      if (window.innerWidth < 768) {
        setHearts(generateJitteredHearts(2, 4, 100, 100, [12, 20]));
      } else {
        setHearts(generateJitteredHearts(3, 5, 100, 100, [16, 30]));
      }

      // 2. Update Dimensions
      if (scrollContainerRef.current && scrollContainerRef.current.firstElementChild) {
        const firstCard = scrollContainerRef.current.firstElementChild as HTMLElement;
        const style = window.getComputedStyle(scrollContainerRef.current);
        const gap = parseFloat(style.gap) || 16;
        
        visualCardWidthRef.current = firstCard.offsetWidth;
        cardWidthRef.current = firstCard.offsetWidth + gap;
        paddingLeftRef.current = parseFloat(style.paddingLeft) || 0;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // --- DOUBLE BUFFERING ---
  const scrollData = [values[2], values[3], ...values, values[0], values[1]];
  const START_INDEX = 2; 

  const boardMembers = [
    { name: "Jacob Lehmann", role: "President & Founder", img: jacobImg },
    { name: "Elias Foppa", role: "Vice President & Treasurer", img: eliasImg },
    { name: "Lea Poewe", role: "Secretary & Head of Marketing", img: leaImg },
  ];

  // --- CENTER OFFSET HELPER ---
  const getCenterOffset = (container: HTMLElement, visualWidth: number) => {
    const containerWidth = container.clientWidth;
    return (containerWidth - visualWidth) / 2;
  };

  // --- INITIAL POSITION ---
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = scrollContainerRef.current;
      if (container && container.firstElementChild) {
          const firstCard = container.firstElementChild as HTMLElement;
          const style = window.getComputedStyle(container);
          const gap = parseFloat(style.gap) || 16;
          
          visualCardWidthRef.current = firstCard.offsetWidth;
          cardWidthRef.current = firstCard.offsetWidth + gap;
          paddingLeftRef.current = parseFloat(style.paddingLeft) || 0;
          
          const offset = getCenterOffset(container, visualCardWidthRef.current);
          container.scrollLeft = (paddingLeftRef.current + (cardWidthRef.current * START_INDEX)) - offset;
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // --- INFINITE LOOP LOGIC (Teleport) ---
  const checkInfiniteLoop = (container: HTMLElement) => {
    const totalWidth = cardWidthRef.current;
    const visualWidth = visualCardWidthRef.current;
    const paddingLeft = paddingLeftRef.current;
    if (!totalWidth) return;

    const offset = getCenterOffset(container, visualWidth);
    const rawIndex = Math.round((container.scrollLeft + offset - paddingLeft) / totalWidth);

    // Right Edge: [..., Real 4, Clone 1, Clone 2] -> Jump to Real 1
    if (rawIndex >= scrollData.length - 2) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex - values.length))) - offset;
    } 
    // Left Edge: [Clone 3, Clone 4, Real 1...] -> Jump to Real 4
    else if (rawIndex <= 1) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex + values.length))) - offset;
    }
  };

  // --- SMOOTH GLIDE ENGINE ---
  const glideTo = (targetX: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startX = container.scrollLeft;
    const distance = targetX - startX;
    const duration = 300; 
    const startTime = performance.now();

    isAnimatingRef.current = true;
    container.style.scrollSnapType = 'none';
    container.style.overflowX = 'hidden';

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuart(progress);

      container.scrollLeft = startX + (distance * ease);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        container.style.overflowX = 'auto';
        isAnimatingRef.current = false;
        rafRef.current = null;
        checkInfiniteLoop(container);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  // --- TOUCH HANDLERS ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        isAnimatingRef.current = false;
    }
    
    if (scrollContainerRef.current) {
        scrollContainerRef.current.style.overflowX = 'auto';
        scrollContainerRef.current.style.scrollSnapType = 'none';
        checkInfiniteLoop(scrollContainerRef.current);
    }

    touchStartRef.current = e.touches[0].clientX;
    touchStartTimeRef.current = performance.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const touchEnd = e.changedTouches[0].clientX;
    const touchTime = performance.now() - touchStartTimeRef.current;
    const diff = touchStartRef.current - touchEnd;
    
    // Refresh measurements
    if (container.firstElementChild) {
        const firstCard = container.firstElementChild as HTMLElement;
        const style = window.getComputedStyle(container);
        const gap = parseFloat(style.gap) || 16;
        visualCardWidthRef.current = firstCard.offsetWidth;
        cardWidthRef.current = firstCard.offsetWidth + gap;
        paddingLeftRef.current = parseFloat(style.paddingLeft) || 0;
    }

    const totalWidth = cardWidthRef.current;
    const visualWidth = visualCardWidthRef.current;
    const paddingLeft = paddingLeftRef.current;

    const offset = getCenterOffset(container, visualWidth);
    const exactIndex = (container.scrollLeft + offset - paddingLeft) / totalWidth;
    const rawIndex = Math.round(exactIndex);

    const isFlick = touchTime < 250 && Math.abs(diff) > 20;
    
    let targetIndex = rawIndex;

    if (isFlick) {
        if (diff > 0) targetIndex = Math.floor(exactIndex) + 1;
        else targetIndex = Math.ceil(exactIndex) - 1;
    } else {
        if (diff > 0 && exactIndex > rawIndex) targetIndex = rawIndex + 1;
        else if (diff < 0 && exactIndex < rawIndex) targetIndex = rawIndex - 1;
    }

    targetIndex = Math.max(0, Math.min(targetIndex, scrollData.length - 1));
    
    // GLIDE to the CENTERED position: (Padding + Index*Width) - Offset
    glideTo((paddingLeft + (targetIndex * totalWidth)) - offset);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    // Allow visual updates during animation! Only block physics loop.
    if (!isAnimatingRef.current) {
        checkInfiniteLoop(scrollContainerRef.current);
    }

    const totalWidth = cardWidthRef.current || 1;
    const visualWidth = visualCardWidthRef.current || totalWidth;
    const paddingLeft = paddingLeftRef.current;
    
    const offset = getCenterOffset(scrollContainerRef.current, visualWidth);
    const rawIndex = Math.round((scrollContainerRef.current.scrollLeft + offset - paddingLeft) / totalWidth);
    
    // Robust Dot Calculation
    let visualStep = (rawIndex - START_INDEX);
    visualStep = ((visualStep % values.length) + values.length) % values.length;
    
    if (visualStep !== currentStep) setCurrentStep(visualStep);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient py-8 md:py-12 relative overflow-hidden min-h-[30vh] flex flex-col items-center justify-center">
        <div className="absolute top-10 right-[10%] w-32 h-32 bg-primary/10 blob animate-float" />
        <div className="absolute bottom-5 left-[5%] w-24 h-24 bg-warm/10 blob animate-wiggle" />
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

      {/* Info Sections */}
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

      {/* Values Section */}
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

          {/* STATIC GRID (Tablet/Desktop) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* MOBILE LAYOUT (Custom Smooth Glide + Centered) */}
          <div className="md:hidden relative">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex overflow-x-auto pb-8 gap-4 px-4 scrollbar-hide select-none"
              style={{
                scrollSnapType: 'none',
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overscrollBehaviorX: "contain",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {scrollData.map((value, i) => (
                <div
                  key={`${value.title}-${i}`}
                  className="shrink-0 w-[85vw] max-w-[300px] transform-gpu"
                  style={{
                    WebkitTapHighlightColor: "transparent", 
                  }}
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