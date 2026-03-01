import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "../router";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/shop", label: "Pricing" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-cream-dark border-t border-border mt-16">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img
                src="/assets/uploads/seetha_logo_cutout-1.png"
                alt="SeethaCeramics"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sustainable ceramics. Handmade with love in Hyderabad.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/seetha_ceramics"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blush-light hover:bg-blush transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-blush-dark" />
              </a>
              <a
                href="https://facebook.com/SeethaCeramics"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blush-light hover:bg-blush transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-blush-dark" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4 text-base">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4 text-base">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+917989215059"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="p-1.5 rounded-md bg-sage-light group-hover:bg-sage transition-colors">
                    <Phone className="w-3.5 h-3.5 text-sage-dark" />
                  </span>
                  +91 79892 15059
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@seethaceramics.in"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="p-1.5 rounded-md bg-sage-light group-hover:bg-sage transition-colors">
                    <Mail className="w-3.5 h-3.5 text-sage-dark" />
                  </span>
                  hello@seethaceramics.in
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="p-1.5 rounded-md bg-sage-light mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-sage-dark" />
                  </span>
                  Hyderabad, Telangana, India
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} SeethaCeramics. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
