import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.png"; // <-- import your bear logo

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo + Site Name */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Rackis for Barn Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-primary">Rackis for Barn</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Button variant="outline" size="sm" className="ml-2" asChild>
            <a
              href="https://instagram.com/rackis_for_barn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Follow Us
            </a>
          </Button>

          {/* New Donate and Buy Buttons */}
          <Button size="sm" className="ml-2" asChild>
            <Link to="/donate">Donate</Link>
          </Button>

          <Button size="sm" className="ml-2" asChild>
            <Link to="/buy">Buy</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-border bg-background p-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Button variant="outline" size="sm" className="mt-2" asChild>
              <a
                href="https://instagram.com/rackis_for_barn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Follow Us on Instagram
              </a>
            </Button>

            {/* New Donate and Buy Buttons for Mobile */}
            <Button size="sm" className="mt-2" asChild>
              <Link to="/donate" onClick={() => setIsOpen(false)}>
                Donate
              </Link>
            </Button>

            <Button size="sm" className="mt-2" asChild>
              <Link to="/buy" onClick={() => setIsOpen(false)}>
                Buy
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
