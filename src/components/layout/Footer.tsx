import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const footerLinks = {
  organization: [
    { href: "/about", label: "Om Oss" },
    { href: "/contact", label: "Kontakt" },
  ],
  legal: [
    { href: "/impressum", label: "Impressum" },
    { href: "/privacy", label: "Integritetspolicy" },
    { href: "/terms", label: "Villkor" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-section-alt border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold text-primary">Rackis för Barn</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              En studentdriven ideell organisation dedikerad till att göra skillnad för barn i Sverige.
            </p>
          </div>

          {/* Organization Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Organisation</h4>
            <ul className="space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Juridiskt</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Rackis för Barn. Alla rättigheter förbehållna.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Skapat med <Heart className="h-4 w-4 text-accent fill-accent" /> av studenter
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
