import { Layout } from "@/components/layout/Layout";
import { Heart, Target, Users, Award, Recycle, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import eliasImg from "@/assets/elias.png";
import jacobImg from "@/assets/jacob.png";
import leaImg from "@/assets/lea.png";
import lenkaImg from "@/assets/lenka.png";
import lukasImg from "@/assets/lukas.png";
// --- PARTNER LOGO IMPORTS ---
import uuInnovationLogo from "@/assets/uu-innovation.png";
// import uppsalahemLogo from "@/assets/uppsalahem.png";

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
  
  // --- VALUES CAROUSEL STATE ---
  const [currentStep, setCurrentStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);
  const visualCardWidthRef = useRef(0);
  const paddingLeftRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef(0);
  const touchStartTimeRef = useRef(0);

  // --- PARTNERS CAROUSEL STATE ---
  const [partnerStep, setPartnerStep] = useState(0);
  const partnerScrollRef = useRef<HTMLDivElement>(null);
  const partnerCardWidthRef = useRef(0);
  const partnerVisualWidthRef = useRef(0);
  const partnerPaddingRef = useRef(0);
  const partnerAnimatingRef = useRef(false);
  const partnerRafRef = useRef<number | null>(null);
  const partnerTouchStartRef = useRef(0);
  const partnerTouchTimeRef = useRef(0);


  useEffect(() => {
    const handleResize = () => {
      // 1. Update Hearts
      if (window.innerWidth < 768) {
        setHearts(generateJitteredHearts(2, 4, 100, 100, [12, 20]));
      } else {
        setHearts(generateJitteredHearts(3, 5, 100, 100, [16, 30]));
      }

      // 2. Update Dimensions (VALUES)
      if (scrollContainerRef.current && scrollContainerRef.current.firstElementChild) {
        const firstCard = scrollContainerRef.current.firstElementChild as HTMLElement;
        const style = window.getComputedStyle(scrollContainerRef.current);
        const gap = parseFloat(style.gap) || 16;
        visualCardWidthRef.current = firstCard.offsetWidth;
        cardWidthRef.current = firstCard.offsetWidth + gap;
        paddingLeftRef.current = parseFloat(style.paddingLeft) || 0;
      }

      // 3. Update Dimensions (PARTNERS)
      if (partnerScrollRef.current && partnerScrollRef.current.firstElementChild) {
        const firstP = partnerScrollRef.current.firstElementChild as HTMLElement;
        const styleP = window.getComputedStyle(partnerScrollRef.current);
        const gapP = parseFloat(styleP.gap) || 16;
        partnerVisualWidthRef.current = firstP.offsetWidth;
        partnerCardWidthRef.current = firstP.offsetWidth + gapP;
        partnerPaddingRef.current = parseFloat(styleP.paddingLeft) || 0;
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

  const partners = [
    {
      name: "Uppsala University Innovation",
      logo: uuInnovationLogo,
      description: "Uppsala University Innovation provides guidance and resources to help Rackis for Barn expand its reach and positive impact.",
      url: "https://www.uuinnovation.uu.se",
    },
  ];

  const isPartnerSingle = partners.length === 1;

  // --- DATA BUFFERS ---
  const valuesScrollData = [values[2], values[3], ...values, values[0], values[1]];
  const VALUES_START = 2;

  const partnersScrollData = isPartnerSingle 
    ? partners 
    : [
        partners[(partners.length - 2 + partners.length) % partners.length],
        partners[(partners.length - 1 + partners.length) % partners.length],
        ...partners,
        partners[0],
        partners[1 % partners.length]
      ];
  const PARTNER_START = isPartnerSingle ? 0 : 2;

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

  // --- INITIAL POSITIONS ---
  useEffect(() => {
    const timer = setTimeout(() => {
      // Init Values
      if (scrollContainerRef.current && scrollContainerRef.current.firstElementChild) {
          const c = scrollContainerRef.current;
          const fc = c.firstElementChild as HTMLElement;
          const s = window.getComputedStyle(c);
          visualCardWidthRef.current = fc.offsetWidth;
          cardWidthRef.current = fc.offsetWidth + (parseFloat(s.gap) || 16);
          paddingLeftRef.current = parseFloat(s.paddingLeft) || 0;
          const off = getCenterOffset(c, visualCardWidthRef.current);
          c.scrollLeft = (paddingLeftRef.current + (cardWidthRef.current * VALUES_START)) - off;
      }
      
      // Init Partners
      if (partnerScrollRef.current && partnerScrollRef.current.firstElementChild) {
          const c = partnerScrollRef.current;
          const fc = c.firstElementChild as HTMLElement;
          const s = window.getComputedStyle(c);
          partnerVisualWidthRef.current = fc.offsetWidth;
          partnerCardWidthRef.current = fc.offsetWidth + (parseFloat(s.gap) || 16);
          partnerPaddingRef.current = parseFloat(s.paddingLeft) || 0;
          const off = getCenterOffset(c, partnerVisualWidthRef.current);
          const idx = isPartnerSingle ? 0 : PARTNER_START;
          c.scrollLeft = (partnerPaddingRef.current + (partnerCardWidthRef.current * idx)) - off;
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [partners.length, isPartnerSingle]);


  // --- GENERIC ANIMATION HELPERS ---
  const checkLoop = (
    container: HTMLElement, 
    totalWidth: number, 
    visualWidth: number, 
    paddingLeft: number,
    dataLen: number,
    realLen: number,
    isSingle: boolean
  ) => {
    if (isSingle) return;
    if (!totalWidth) return;

    const offset = getCenterOffset(container, visualWidth);
    const rawIndex = Math.round((container.scrollLeft + offset - paddingLeft) / totalWidth);

    if (rawIndex >= dataLen - 2) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex - realLen))) - offset;
    } else if (rawIndex <= 1) {
      container.scrollLeft = (paddingLeft + (totalWidth * (rawIndex + realLen))) - offset;
    }
  };

  const glide = (
    container: HTMLElement, 
    targetX: number, 
    animRef: React.MutableRefObject<boolean>,
    rafRef: React.MutableRefObject<number | null>,
    onComplete: () => void
  ) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const startX = container.scrollLeft;
    const distance = targetX - startX;
    const duration = 300;
    const startTime = performance.now();

    animRef.current = true;
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
        animRef.current = false;
        rafRef.current = null;
        onComplete();
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  const handleTouchEndGeneric = (
    e: React.TouchEvent,
    container: HTMLElement,
    touchStart: number,
    touchTimeStart: number,
    totalWidth: number,
    visualWidth: number,
    paddingLeft: number,
    dataLen: number,
    isSingle: boolean,
    animRef: React.MutableRefObject<boolean>,
    rafRef: React.MutableRefObject<number | null>
  ) => {
    if (isSingle || !container) return;

    const touchEnd = e.changedTouches[0].clientX;
    const touchTime = performance.now() - touchTimeStart;
    const diff = touchStart - touchEnd;
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

    targetIndex = Math.max(0, Math.min(targetIndex, dataLen - 1));
    glide(container, (paddingLeft + (targetIndex * totalWidth)) - offset, animRef, rafRef, () => {});
  };

  // --- VALUES CAROUSEL HANDLERS ---
  const handleValuesScroll = () => {
    if (!scrollContainerRef.current) return;
    if (!isAnimatingRef.current) {
        checkLoop(scrollContainerRef.current, cardWidthRef.current, visualCardWidthRef.current, paddingLeftRef.current, valuesScrollData.length, values.length, false);
    }
    const offset = getCenterOffset(scrollContainerRef.current, visualCardWidthRef.current);
    const rawIndex = Math.round((scrollContainerRef.current.scrollLeft + offset - paddingLeftRef.current) / cardWidthRef.current);
    let visualStep = (rawIndex - VALUES_START);
    visualStep = ((visualStep % values.length) + values.length) % values.length;
    if (visualStep !== currentStep) setCurrentStep(visualStep);
  };

  const handleValuesTouchStart = (e: React.TouchEvent) => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; isAnimatingRef.current = false; }
    touchStartRef.current = e.touches[0].clientX;
    touchStartTimeRef.current = performance.now();
  };

  const handleValuesTouchEnd = (e: React.TouchEvent) => {
    handleTouchEndGeneric(e, scrollContainerRef.current!, touchStartRef.current, touchStartTimeRef.current, cardWidthRef.current, visualCardWidthRef.current, paddingLeftRef.current, valuesScrollData.length, false, isAnimatingRef, rafRef);
  };

  // --- PARTNERS CAROUSEL HANDLERS ---
  const handlePartnersScroll = () => {
    if (!partnerScrollRef.current || isPartnerSingle) return;
    if (!partnerAnimatingRef.current) {
        checkLoop(partnerScrollRef.current, partnerCardWidthRef.current, partnerVisualWidthRef.current, partnerPaddingRef.current, partnersScrollData.length, partners.length, isPartnerSingle);
    }
    const offset = getCenterOffset(partnerScrollRef.current, partnerVisualWidthRef.current);
    const rawIndex = Math.round((partnerScrollRef.current.scrollLeft + offset - partnerPaddingRef.current) / partnerCardWidthRef.current);
    let visualStep = (rawIndex - PARTNER_START);
    visualStep = ((visualStep % partners.length) + partners.length) % partners.length;
    if (visualStep !== partnerStep) setPartnerStep(visualStep);
  };

  const handlePartnersTouchStart = (e: React.TouchEvent) => {
    if (isPartnerSingle) return;
    if (partnerRafRef.current) { cancelAnimationFrame(partnerRafRef.current); partnerRafRef.current = null; partnerAnimatingRef.current = false; }
    partnerTouchStartRef.current = e.touches[0].clientX;
    partnerTouchTimeRef.current = performance.now();
  };

  const handlePartnersTouchEnd = (e: React.TouchEvent) => {
    if (isPartnerSingle) return;
    handleTouchEndGeneric(e, partnerScrollRef.current!, partnerTouchStartRef.current, partnerTouchTimeRef.current, partnerCardWidthRef.current, partnerVisualWidthRef.current, partnerPaddingRef.current, partnersScrollData.length, isPartnerSingle, partnerAnimatingRef, partnerRafRef);
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

      {/* --- CHARITY SECTION --- */}
      <section id="charities" className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-3">Our cause</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Supporting children in need</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-warm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-foreground mb-3">Barncancerfonden</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Sweden's leading organization dedicated to supporting children with cancer and their families. Through research funding and family support programs, they work to improve outcomes for young cancer patients.
                </p>
                <a href="https://www.barncancerfonden.se" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary text-sm font-semibold hover:underline">
                  Learn more at barncancerfonden.se
                </a>
              </div>
              <div className="card-warm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-foreground mb-3">RBU</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Riksförbundet för Rörelsehindrade Barn och Ungdomar works to improve the lives of children and young people with mobility impairments in Sweden through advocacy and support programs.
                </p>
                <a href="https://www.rbu.se" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary text-sm font-semibold hover:underline">
                  Learn more at rbu.se
                </a>
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10">
                <Heart className="h-6 w-6 text-warm" fill="currentColor" />
                <p className="font-display text-lg font-bold text-foreground">100% of profits go to these charities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - INCREASED VERTICAL PADDING */}
      <section className="py-16 md:py-24 overflow-hidden bg-section-alt">
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
                className="card-warm text-center bg-white"
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
              onScroll={handleValuesScroll}
              onTouchStart={handleValuesTouchStart}
              onTouchEnd={handleValuesTouchEnd}
              className="flex overflow-x-auto pb-8 gap-4 px-4 scrollbar-hide select-none"
              style={{
                scrollSnapType: 'none',
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overscrollBehaviorX: "contain",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {valuesScrollData.map((value, i) => (
                <div
                  key={`${value.title}-${i}`}
                  className="shrink-0 w-[75vw] max-w-[300px] transform-gpu"
                  style={{
                    WebkitTapHighlightColor: "transparent", 
                  }}
                >
                  <div className="card-warm text-center h-full flex flex-col items-center justify-center bg-white">
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

      {/* --- PARTNERS SECTION - INCREASED MOBILE PADDING AGAIN --- */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-32 bg-section-light">
        <div className="container">
          <div className="text-center mb-8">
              <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-3">In collaboration with</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Supportive Partners</h2>
          </div>

          {/* --- MOBILE (SCROLLING) --- */}
          <div className="md:hidden relative w-full flex flex-col items-center"> {/* FIXED PARENT */}
            <div
              ref={partnerScrollRef}
              onScroll={handlePartnersScroll}
              onTouchStart={handlePartnersTouchStart}
              onTouchEnd={handlePartnersTouchEnd}
              className={`
                flex pb-8 gap-4 px-4 scrollbar-hide select-none w-full
                ${isPartnerSingle ? 'justify-center overflow-hidden' : 'overflow-x-auto justify-start'} 
              `}
              style={{
                scrollSnapType: 'none',
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overscrollBehaviorX: "contain",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {partnersScrollData.map((partner, i) => (
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
              {!isPartnerSingle && <div className="w-4 shrink-0" />}
            </div>

            {/* Dots Indicator */}
            {!isPartnerSingle && (
              <div className="flex justify-center gap-2 mt-2">
                  {partners.map((_, i) => (
                  <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                      partnerStep === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
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
      
    </Layout>
  );
};

export default About;
