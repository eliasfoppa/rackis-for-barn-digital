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

export function Donate() {
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

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-hero-gradient section-padding relative overflow-hidden min-h-[60vh] flex items-center">
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
                            Donate Items
                        </h1>
                        <p className="text-xl text-muted-foreground animate-fade-up delay-100 leading-relaxed">
                            Help students and children in need by donating items in good condition. Your contributions make a real difference!
                        </p>
                    </div>
                </div>
            </section>

            {/* Drop-off Information */}
            <section className="section-padding relative z-10">
                <div className="container max-w-3xl mx-auto text-center space-y-6">
                    <p className="text-lg text-muted-foreground animate-fade-up delay-200">
                        We are collecting donations from now until the end of the semester. Items can be dropped off at the locations below during our collection hours.
                    </p>

                    <div className="bg-white/70 backdrop-blur-sm border rounded-2xl p-8 max-w-2xl mx-auto my-8 animate-fade-up delay-250 shadow-md">
                        <div className="space-y-6">
                            
                            {/* Where */}
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div className="text-left">
                                    <p className="font-semibold text-foreground text-lg mb-2"> Where:</p>
                                    <p className="text-muted-foreground">
                                        <span className="font-bold text-foreground">Rackarbergsgatan 32 (Rackis)</span>
                                    </p>
                                    <p className="text-muted-foreground">
                                        Or <span className="font-bold text-foreground">Building Nr. 1 (Flogsta)</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div className="h-px bg-border"></div>
                            
                            {/* When */}
                            <div className="flex items-start gap-4">
                                <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div className="text-left">
                                    <p className="font-semibold text-foreground text-lg mb-2"> When:</p>
                                    <p className="text-muted-foreground">
                                        <span className="font-bold text-foreground">Everyday from 18:00 - 19:00</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground italic">(except for Christmas)</p>
                                </div>
                            </div>

                            <div className="h-px bg-border"></div>

                            {/* How */}
                            <div className="flex items-start gap-4">
                                <MessageCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div className="text-left">
                                    <p className="font-semibold text-foreground text-lg mb-2"> How:</p>
                                    <p className="text-muted-foreground">
                                        <span className="font-bold text-foreground">DM us on Instagram and then stop by to drop off your items.</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <br />

                    <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-8">
                        Donation Rules
                    </h2>
                    <ul className="text-left text-lg text-muted-foreground max-w-xl mx-auto space-y-3 animate-fade-up delay-300 list-disc list-inside">
                        <li>All items should be in good, usable condition. No broken items.</li>
                        <li>
                            Textiles must be washed at <span className="font-semibold">60°C</span> before donation.
                            If unwashed, please inform us when donating.
                        </li>
                        <li>We do not accept clothing and toiletries.</li>
                        <li>No large furniture (beds, couches, wardrobes).</li>
                    </ul>

                    <p className="text-lg text-muted-foreground animate-fade-up delay-400">
                        Your donations support students, reduce waste, and help children in need through our charity partners.
                    </p>

                    <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 animate-fade-up delay-500">
                        <a
                            href="https://instagram.com/rackis_for_barn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <Instagram className="h-5 w-5" />
                            Check our Instagram for updates
                        </a>
                    </Button>
                </div>
            </section>

            {/* What You Can Donate */}
            <section className="section-padding bg-section-alt">
                <div className="container max-w-4xl mx-auto">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
                        What You Can Donate
                    </h2>

                    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
                        We accept practical, good-quality items that help students settle into their new homes.
                        The categories below show what is most needed and most useful.
                    </p>

                    <div className="space-y-8">

                        {/* CATEGORY BLOCK */}
                        <div className="rounded-2xl bg-white/70 backdrop-blur-sm border shadow-sm p-8">
                            <h3 className="text-xl font-semibold text-foreground mb-4">
                                Household & Bedding
                            </h3>
                            <ul className="grid md:grid-cols-2 gap-y-3 gap-x-6 text-muted-foreground text-lg leading-relaxed">
                                <li>Duvets, pillows and mattress toppers</li>
                                <li>Bedding sets, sheets and blankets</li>
                                <li>Curtains and simple window coverings</li>
                                <li>Throws and small household textiles</li>
                            </ul>
                        </div>

                        {/* CATEGORY BLOCK */}
                        <div className="rounded-2xl bg-white/70 backdrop-blur-sm border shadow-sm p-8">
                            <h3 className="text-xl font-semibold text-foreground mb-4">
                                Kitchen Equipment
                            </h3>
                            <ul className="grid md:grid-cols-2 gap-y-3 gap-x-6 text-muted-foreground text-lg leading-relaxed">
                                <li>Pots, pans and basic cookware</li>
                                <li>Cutlery and cooking utensils</li>
                                <li>Plates, bowls, cups and glasses</li>
                                <li>Food storage containers</li>
                            </ul>
                        </div>

                        {/* CATEGORY BLOCK */}
                        <div className="rounded-2xl bg-white/70 backdrop-blur-sm border shadow-sm p-8">
                            <h3 className="text-xl font-semibold text-foreground mb-4">
                                Electronics
                            </h3>
                            <ul className="grid md:grid-cols-2 gap-y-3 gap-x-6 text-muted-foreground text-lg leading-relaxed">
                                <li>Routers and basic Wi-Fi equipment</li>
                                <li>Extension cords and power strips</li>
                                <li>Desk lamps and floor lamps</li>
                                <li>Small appliances: kettles, toasters, rice cookers</li>
                            </ul>
                        </div>

                        {/* CATEGORY BLOCK */}
                        <div className="rounded-2xl bg-white/70 backdrop-blur-sm border shadow-sm p-8">
                            <h3 className="text-xl font-semibold text-foreground mb-4">
                                And Many Other Items Such As...
                            </h3>
                            <ul className="grid md:grid-cols-2 gap-y-3 gap-x-6 text-muted-foreground text-lg leading-relaxed">
                                <li>Small shelves and storage units</li>
                                <li>Mirrors and simple decoration</li>
                                <li>Laundry racks, shoe racks and hangers</li>
                                <li>Bicycles in working condition</li>
                            </ul>
                        </div>

                    </div>

                    <p className="text-lg text-muted-foreground text-center mt-12 leading-relaxed">
                        If you're unsure whether an item is suitable, feel free to contact us on Instagram for guidance.
                    </p>
                </div>
            </section>

        </Layout>
    );
}

export default Donate;