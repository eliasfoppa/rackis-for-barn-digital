import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Recycle, ShoppingBag, MapPin, Instagram, Bike, Home, Users, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import Logo from "@/assets/logo.png";
import uuInnovationLogo from "@/assets/uu-innovation.png";
import uppsalahemLogo from "@/assets/uppsalahem.png";

// --- PHYSICS: Ease-Out-Quart (Stable, Smooth) ---
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

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
        setHearts(generateJitteredHearts(3, 5, 100, 100, [12, 20]));
      } else {
        setHearts(generateJitteredHearts(4, 7, 100, 100, [16, 30]));
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
  const [currentStep, setCurrentStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);
  const visualCardWidthRef = useRef(0); 
  const paddingLeftRef = useRef(0); // Stores container padding
  const isAnimatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef(0);
  const touchStartTimeRef = useRef(0);

  const steps = [
    {
      icon: ShoppingBag,
      title: "Shop",
      description: "Moving in? We've got you covered for your first days in Uppsala (and beyond).",
      color: "bg-green-100",
      action: { type: "link", to: "/buy" },
    },
    {
      icon: Heart,
      title: "Support",
      description: "All profits from your purchase go directly to Barncancerfonden and RBU.",
      color: "bg-warm/10 text-warm",
      action: { type: "scroll", target: "charities" },
    },
    {
      icon: Gift,
      title: "Donate",
      description: "Moving out? Give items a second life. We accept everything from bedding to bikes.",
      color: "bg-primary/10 text-primary",
      action: { type: "link", to: "/donate" },
    },
  ];

  const scrollData = [steps[1], steps[2], ...steps, steps[0], steps[1]];
  const START_INDEX = 2;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const getCenterOffset = (container: HTMLElement, visualWidth: number) => {
    const containerWidth = container.clientWidth;
    return (containerWidth - visualWidth) / 2;
  };

  /* ====================== DESKTOP GEOMETRY ====================== */
  const containerWidth = 1200;
  const containerHeight = 830;
  const boxWidth = 350;
  const box1Left = (containerWidth - boxWidth) / 2;
  const box1Top = 30;
  const box2Left = containerWidth - 80 - boxWidth;
  const box2Top = 430;
  const box3Left = 80;
  const box3Top = 430;
  const boxes = [{ x: box1Left, y: box1Top }, { x: box2Left, y: box2Top }, { x: box3Left, y: box3Top }];
  const circleCX = 600;
  const circleCY = 471;
  const circleR = 347;

  const getArrowOnCircle = (targetX: number, targetY: number, side: "left" | "top" | "right") => {
    let x = targetX;
    let y = targetY;
    if (side === "left") {
      const dx = targetX - circleCX;
      y = circleCY - Math.sqrt(Math.pow(circleR, 2) - Math.pow(dx, 2));
    } else if (side === "top") {
      const dy = targetY - circleCY;
      x = circleCX + Math.sqrt(Math.pow(circleR, 2) - Math.pow(dy, 2));
    } else if (side === "right") {
      const dx = targetX - circleCX;
      y = circleCY + Math.sqrt(Math.pow(circleR, 2) - Math.pow(dx, 2));
    }
    const angleRad = Math.atan2(y - circleCY, x - circleCX);
    const rotation = (angleRad * 180) / Math.PI + 90;
    return { x, y, rotation };
  };
  const arrows = [
    getArrowOnCircle(box1Left, 0, "left"),
    getArrowOnCircle(0, box2Top, "top"),
    getArrowOnCircle(box3Left + boxWidth, 0, "right"),
  ];

  // --- INIT SCROLL ---
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
          
          // Formula: (Padding + Index*Stride) - CenterOffset
          container.scrollLeft = (paddingLeftRef.current + (cardWidthRef.current * START_INDEX)) - offset;
        }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const checkInfiniteLoop = (container: HTMLElement) => {
    const totalWidth = cardWidthRef.current;
    const visualWidth = visualCardWidthRef.current;
    const paddingLeft = paddingLeftRef.current;
    if (!totalWidth) return;

    const offset = getCenterOffset(container, visualWidth);
    // Reverse Formula: (Scroll + Offset - Padding) / Stride
    const rawIndex = Math.round((container.scrollLeft + offset - paddingLeft) / totalWidth);

    if (rawIndex >= scrollData.length - 2) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex - steps.length))) - offset;
    } else if (rawIndex <= 1) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex + steps.length))) - offset;
    }
  };

  const glideTo = (targetX: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startX = container.scrollLeft;
    const distance = targetX - startX;
    const duration = 300; 
    const startTime = performance.now();

    isAnimatingRef.current = true;
    container.style.overflowX = 'hidden'; 
    container.style.scrollSnapType = 'none';

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
    const rawIndex = Math.round((container.scrollLeft + offset - paddingLeft) / totalWidth);

    const isFlick = touchTime < 250 && Math.abs(diff) > 20;
    let targetIndex = rawIndex;
    
    const exactIndex = (container.scrollLeft + offset - paddingLeft) / totalWidth;

    if (isFlick) {
      if (diff > 0) targetIndex = Math.floor(exactIndex) + 1;
      else targetIndex = Math.ceil(exactIndex) - 1;
    } else {
       if (diff > 0 && exactIndex > rawIndex) targetIndex = rawIndex + 1;
       else if (diff < 0 && exactIndex < rawIndex) targetIndex = rawIndex - 1;
    }

    targetIndex = Math.max(0, Math.min(targetIndex, scrollData.length - 1));
    glideTo((paddingLeft + (targetIndex * totalWidth)) - offset);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    if (!isAnimatingRef.current) checkInfiniteLoop(scrollContainerRef.current);

    const totalWidth = cardWidthRef.current || 1;
    const visualWidth = visualCardWidthRef.current || totalWidth;
    const paddingLeft = paddingLeftRef.current;
    
    const offset = getCenterOffset(scrollContainerRef.current, visualWidth);
    
    const rawIndex = Math.round((scrollContainerRef.current.scrollLeft + offset - paddingLeft) / totalWidth);

    let visualStep = (rawIndex - START_INDEX);
    visualStep = ((visualStep % steps.length) + steps.length) % steps.length;
    
    if (visualStep !== currentStep) setCurrentStep(visualStep);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">How it works</h2>
          <p className="text-lg text-muted-foreground">
            A simple cycle that helps students, reduces waste, and supports a great cause.
          </p>
        </div>

        {/* Desktop XL ... (unchanged) */}
        <div className="hidden xl:block relative mx-auto" style={{ width: containerWidth, height: containerHeight }}>
             <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <circle cx={circleCX} cy={circleCY} r={circleR} stroke="#0024a8" strokeWidth="4" fill="none" opacity="0.2" />
          </svg>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 4 }}>
            {arrows.map((arrow, i) => (
              <g key={i} transform={`translate(${arrow.x}, ${arrow.y}) rotate(${arrow.rotation})`}>
                <path d="M-8,-11 L14,0 L-8,11 L-8,-11 Z" fill="#0024a8" />
              </g>
            ))}
          </svg>
          {boxes.map((b, i) => {
            const Icon = steps[i].icon;
            return (
              <div key={i} className="absolute card-warm text-center flex flex-col" style={{ left: b.x, top: b.y, width: boxWidth, zIndex: 2 }}>
                <div className={`w-16 h-16 rounded-2xl ${steps[i].color} mx-auto mb-6 flex items-center justify-center`}>
                  <Icon className="h-8 w-8" />
                </div>
                <span className="text-sm font-bold text-muted-foreground/60 mb-2">Step {i + 1}</span>
                <h3 className="text-2xl font-bold mb-3">{steps[i].title}</h3>
                <p className="text-muted-foreground mb-6">{steps[i].description}</p>
                {steps[i].action.type === "link" ? (
                  <a href={steps[i].action.to} className="mt-auto px-5 py-2 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition">Learn more →</a>
                ) : (
                  <button onClick={() => scrollToSection(steps[i].action.target)} className="mt-auto px-5 py-2 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition">Learn more →</button>
                )}
              </div>
            );
          })}
        </div>
        
        {/* MD/LG Layout (unchanged) */}
        <div className="hidden md:flex xl:hidden justify-center gap-6 px-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex-1 max-w-[350px]">
                <div className="card-warm text-center flex flex-col h-full shadow-md border border-stone-100/50">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} mx-auto mb-6 flex items-center justify-center`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground/60 mb-2">Step {i + 1}</span>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  {step.action.type === "link" ? (
                    <a href={step.action.to} className="mt-auto px-5 py-3 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition w-full block">Learn more →</a>
                  ) : (
                    <button onClick={() => scrollToSection(step.action.target)} className="mt-auto px-5 py-3 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition w-full block">Learn more →</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE (Fixed width to max-w-[300px]) */}
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
            {scrollData.map((step, i) => {
              const realStepNumber = steps.indexOf(step) + 1;
              return (
                <div 
                  key={`${step.title}-${i}`} 
                  // CHANGED: max-w-[350px] -> max-w-[300px]
                  className="shrink-0 w-[75vw] max-w-[300px] transform-gpu"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <div className="card-warm text-center flex flex-col h-full shadow-md border border-stone-100/50">
                    <div className={`w-16 h-16 rounded-2xl ${step.color} mx-auto mb-6 flex items-center justify-center`}>
                      <step.icon className="h-8 w-8" />
                    </div>
                    <span className="text-sm font-bold text-muted-foreground/60 mb-2">Step {realStepNumber}</span>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    {step.action.type === "link" ? (
                      <a href={step.action.to} className="mt-auto px-5 py-3 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition w-full block">Learn more →</a>
                    ) : (
                      <button onClick={() => scrollToSection(step.action.target)} className="mt-auto px-5 py-3 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition w-full block">Learn more →</button>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="w-4 shrink-0" />
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {steps.map((_, i) => (
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
  );
}

export function WhyChooseUsSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);
  const visualCardWidthRef = useRef(0);
  const paddingLeftRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef(0);
  const touchStartTimeRef = useRef(0);

  const benefits = [
    { icon: Recycle, title: "Sustainable", description: "Reduce waste by giving items a second life." },
    { icon: Heart, title: "Charitable", description: "Every purchase supports children in need." },
    { icon: Home, title: "Convenient", description: "Directly buy from student housing locations." },
    { icon: ShoppingBag, title: "Affordable", description: "Quality items at student-friendly prices." },
    { icon: Users, title: "Community", description: "Run by students, for students." },
    { icon: Bike, title: "Variety", description: "From bedsheets to bikes, we have it all." },
  ];

  const scrollData = [benefits[benefits.length - 2], benefits[benefits.length - 1], ...benefits, benefits[0], benefits[1]];
  const START_INDEX = 2;

  const getCenterOffset = (container: HTMLElement, visualWidth: number) => {
    const containerWidth = container.clientWidth;
    return (containerWidth - visualWidth) / 2;
  };

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
        // Padding fix applied
        container.scrollLeft = (paddingLeftRef.current + (cardWidthRef.current * START_INDEX)) - offset;
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const checkInfiniteLoop = (container: HTMLElement) => {
    const totalWidth = cardWidthRef.current;
    const visualWidth = visualCardWidthRef.current;
    const paddingLeft = paddingLeftRef.current;
    if (!totalWidth) return;

    const offset = getCenterOffset(container, visualWidth);
    const rawIndex = Math.round((container.scrollLeft + offset - paddingLeft) / totalWidth);

    if (rawIndex >= scrollData.length - 2) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex - benefits.length))) - offset;
    }
    else if (rawIndex <= 1) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex + benefits.length))) - offset;
    }
  };

  const glideTo = (targetX: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startX = container.scrollLeft;
    const distance = targetX - startX;
    const duration = 300;
    const startTime = performance.now();

    isAnimatingRef.current = true;
    container.style.overflowX = 'hidden';
    container.style.scrollSnapType = 'none';

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
    glideTo((paddingLeft + (targetIndex * totalWidth)) - offset);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    if (!isAnimatingRef.current) checkInfiniteLoop(scrollContainerRef.current);

    const totalWidth = cardWidthRef.current || 1;
    const visualWidth = visualCardWidthRef.current || totalWidth;
    const paddingLeft = paddingLeftRef.current;

    const offset = getCenterOffset(scrollContainerRef.current, visualWidth);
    const rawIndex = Math.round((scrollContainerRef.current.scrollLeft + offset - paddingLeft) / totalWidth);

    let visualStep = (rawIndex - START_INDEX);
    visualStep = ((visualStep % benefits.length) + benefits.length) % benefits.length;

    if (visualStep !== currentStep) setCurrentStep(visualStep);
  };

  return (
    <section className="section-padding bg-section-warm overflow-hidden">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            What makes Rackis for Barn unique?
          </h2>
          <p className="text-lg text-muted-foreground">
            More than just a second-hand store.
          </p>
        </div>

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
            {scrollData.map((benefit, i) => (
              <div
                key={`${benefit.title}-${i}`}
                // CHANGED: max-w-[350px] -> max-w-[300px] to match About page style
                className="shrink-0 w-[75vw] max-w-[300px] transform-gpu"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <div className="h-full p-6 rounded-2xl bg-card/80 backdrop-blur border border-border flex flex-col items-center text-center shadow-sm">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
            <div className="w-4 shrink-0" />
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {benefits.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${currentStep === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <section id="charities" className="pt-20 pb-0 md:pt-20 md:pb-4">
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
              <a href="https://www.barncancerfonden.se" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-semibold hover:underline">
                Learn more at barncancerfonden.se
              </a>
            </div>
            <div className="card-warm">
              <h3 className="text-xl font-bold text-foreground mb-4">RBU</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Riksförbundet för Rörelsehindrade Barn och Ungdomar works to improve the lives of children and young people with mobility impairments in Sweden through advocacy and support programs.
              </p>
              <a href="https://www.rbu.se" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-semibold hover:underline">
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

export function PartnersSection() {
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

  const partners = [
    {
      name: "Uppsala University Innovation",
      logo: uuInnovationLogo,
      description: "Uppsala University Innovation provides guidance and resources to help Rackis for Barn expand its reach and positive impact.",
      url: "https://www.uuinnovation.uu.se",
    },
    // {
    //   name: "Uppsalahem",
    //   logo: uppsalahemLogo, 
    //   description: "Generously provides access to storage units, enabling us to collect and sell items directly at student housing locations.",
    //   url: "https://www.uppsalahem.se",
    // },
  ];

  // --- LOGIC SWITCH ---
  const isSingle = partners.length === 1;

  // --- DOUBLE BUFFERING (Only if > 1) ---
  const len = partners.length;
  const scrollData = isSingle
    ? partners
    : [
      partners[(len - 2 + len) % len],
      partners[(len - 1 + len) % len],
      ...partners,
      partners[0],
      partners[1 % len]
    ];

  const START_INDEX = isSingle ? 0 : 2;

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
        const targetIndex = isSingle ? 0 : START_INDEX;

        container.scrollLeft = (paddingLeftRef.current + (cardWidthRef.current * targetIndex)) - offset;
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [partners.length, isSingle]);

  // --- INFINITE LOOP LOGIC ---
  const checkInfiniteLoop = (container: HTMLElement) => {
    if (isSingle) return;

    const totalWidth = cardWidthRef.current;
    const visualWidth = visualCardWidthRef.current;
    const paddingLeft = paddingLeftRef.current;
    if (!totalWidth) return;

    const offset = getCenterOffset(container, visualWidth);
    const rawIndex = Math.round((container.scrollLeft + offset - paddingLeft) / totalWidth);

    if (rawIndex >= scrollData.length - 2) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex - partners.length))) - offset;
    } else if (rawIndex <= 1) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex + partners.length))) - offset;
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
    if (isSingle) return;

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
    if (isSingle) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const touchEnd = e.changedTouches[0].clientX;
    const touchTime = performance.now() - touchStartTimeRef.current;
    const diff = touchStartRef.current - touchEnd;

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
    glideTo((paddingLeft + (targetIndex * totalWidth)) - offset);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current || isSingle) return;

    if (!isAnimatingRef.current) {
      checkInfiniteLoop(scrollContainerRef.current);
    }

    const totalWidth = cardWidthRef.current || 1;
    const visualWidth = visualCardWidthRef.current || totalWidth;
    const paddingLeft = paddingLeftRef.current;

    const offset = getCenterOffset(scrollContainerRef.current, visualWidth);
    const rawIndex = Math.round((scrollContainerRef.current.scrollLeft + offset - paddingLeft) / totalWidth);

    let visualStep = (rawIndex - START_INDEX);
    visualStep = ((visualStep % partners.length) + partners.length) % partners.length;

    if (visualStep !== currentStep) setCurrentStep(visualStep);
  };

  return (
    <section className="pt-20 pb-20 md:pt-32 md:pb-32 bg-section-light">
      <div className="container">
        <div className="text-center mb-8">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-3">In collaboration with</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Supportive Partners</h2>
        </div>

        {/* --- MOBILE (SCROLLING) --- */}
        <div className="md:hidden relative w-full flex flex-col items-center"> {/* FIXED PARENT */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`
              flex pb-8 gap-4 px-4 scrollbar-hide select-none w-full
              ${isSingle ? 'justify-center overflow-hidden' : 'overflow-x-auto justify-start'} 
            `}
            style={{
              scrollSnapType: 'none',
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overscrollBehaviorX: "contain",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {scrollData.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="shrink-0 w-[75vw] max-w-[300px] transform-gpu"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center h-full p-6 rounded-2xl bg-white/50 backdrop-blur border border-transparent active:scale-95 transition-transform"
                >
                  <div className="flex items-center justify-center w-full h-32 mb-3">
                    <img src={partner.logo} alt={`${partner.name} Logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                  <p className="text-muted-foreground text-center text-sm">{partner.description}</p>
                </a>
              </div>
            ))}
            {!isSingle && <div className="w-4 shrink-0" />}
          </div>

          {/* Dots Indicator */}
          {!isSingle && (
            <div className="flex justify-center gap-2 mt-2">
              {partners.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${currentStep === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* --- DESKTOP (GRID) --- */}
        <div className="hidden md:flex flex-wrap justify-center gap-16 items-center">
          {partners.map((partner) => (
            <a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center max-w-xs hover:scale-105 transition-transform">
              <div className="flex items-center justify-center w-64 h-32 mb-3">
                <img src={partner.logo} alt={`${partner.name} Logo`} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="text-muted-foreground text-center">{partner.description}</p>
            </a>
          ))}
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