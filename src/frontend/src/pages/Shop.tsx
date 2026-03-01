import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import type { Product } from "../backend.d";
import { useProducts } from "../hooks/useQueries";
import { Link } from "../router";
import { formatPrice, unwrapOptional } from "../utils/helpers";

const bundles = [
  {
    name: "Home Starter Set",
    desc: "Mugs + bowls to transform your kitchen.",
    price: "₹1,499",
    original: "₹1,799",
    discount: "17% OFF",
    color: "border-blush",
    badgeColor: "bg-blush-light text-blush-dark",
  },
  {
    name: "Celebration Bundle",
    desc: "A complete gift set for someone special.",
    price: "₹1,999",
    original: "₹2,499",
    discount: "20% OFF",
    color: "border-sage",
    badgeColor: "bg-sage-light text-sage-dark",
  },
];

const perks = [
  {
    icon: Truck,
    title: "Free delivery over ₹999",
    color: "text-sage-dark",
    bg: "bg-sage-light",
  },
  {
    icon: ShieldCheck,
    title: "Handmade quality guarantee",
    color: "text-blush-dark",
    bg: "bg-blush-light",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp support",
    color: "text-gold",
    bg: "bg-gold-light",
  },
];

function PricingTier({
  label,
  priceRange,
  rangeLabel,
  tagline,
  products,
  cta,
  ctaLink,
  highlight,
  index,
}: {
  label: string;
  priceRange: string;
  rangeLabel: string;
  tagline: string;
  products: Product[];
  cta: string;
  ctaLink: string;
  highlight?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className={`rounded-2xl border-2 p-8 flex flex-col gap-5 ${
        highlight
          ? "border-sage bg-sage-light/30 shadow-sage"
          : "border-border bg-card shadow-xs"
      }`}
    >
      {highlight && (
        <span className="inline-block w-fit px-3 py-1 text-xs font-semibold bg-sage text-white rounded-full">
          Most Popular
        </span>
      )}
      <div>
        <h3 className="font-serif text-xl font-bold mb-1">{label}</h3>
        <div className="text-2xl font-bold text-sage-dark">{priceRange}</div>
        <div className="text-xs text-muted-foreground mt-1">{rangeLabel}</div>
      </div>
      <p className="text-sm text-muted-foreground">{tagline}</p>

      {products.length > 0 && (
        <ul className="space-y-2">
          {products.slice(0, 3).map((p) => (
            <li
              key={p.id.toString()}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-foreground">{p.name}</span>
              <span className="font-semibold text-sage-dark shrink-0 ml-2">
                {formatPrice(unwrapOptional(p.discountPrice) ?? p.price)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <Button
        asChild
        className={`mt-auto rounded-xl w-full ${
          highlight
            ? "bg-sage hover:bg-sage-dark text-white"
            : "border-2 border-sage text-sage-dark hover:bg-sage-light bg-transparent"
        }`}
        variant={highlight ? "default" : "outline"}
      >
        <Link to={ctaLink}>{cta}</Link>
      </Button>
    </motion.div>
  );
}

export default function Shop() {
  const { data: allProducts = [], isLoading } = useProducts();

  useEffect(() => {
    document.title =
      "Shop & Pricing — SeethaCeramics | Affordable Handmade Ceramics";
  }, []);

  const essentials = useMemo(
    () => allProducts.filter((p) => Number(p.price) < 50000),
    [allProducts],
  );
  const signature = useMemo(
    () =>
      allProducts.filter(
        (p) => Number(p.price) >= 50000 && Number(p.price) <= 150000,
      ),
    [allProducts],
  );
  const giftSets = useMemo(
    () => allProducts.filter((p) => Number(p.price) > 150000),
    [allProducts],
  );

  return (
    <main>
      {/* Header */}
      <section className="gradient-blush py-16">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Simple Pricing. No Surprises.
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              Handmade ceramics that fit every budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["s1", "s2", "s3"].map((sk) => (
              <div key={sk} className="rounded-2xl border p-8 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingTier
              index={0}
              label="Everyday Essentials"
              priceRange="Under ₹500"
              rangeLabel="Perfect for gifting or starting your collection."
              tagline="Simple, beautiful pieces for everyday use."
              products={essentials}
              cta="Shop Essentials"
              ctaLink="/products"
            />
            <PricingTier
              index={1}
              label="Signature Pieces"
              priceRange="₹500 – ₹1,500"
              rangeLabel="Elevate your home with our most-loved pieces."
              tagline="Our best sellers. Crafted with a little extra care."
              products={signature}
              cta="Shop Signature"
              ctaLink="/products"
              highlight
            />
            <PricingTier
              index={2}
              label="Gift Sets & Bundles"
              priceRange="From ₹1,500"
              rangeLabel="The perfect gift. For someone special, or yourself."
              tagline="Thoughtfully curated. Beautifully packaged."
              products={giftSets}
              cta="Shop Gift Sets"
              ctaLink="/products"
            />
          </div>
        )}
      </section>

      {/* Bundle Offers */}
      <section className="bg-cream-dark py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
              Bundle & Save
            </h2>
            <p className="text-muted-foreground text-sm">
              Curated sets for every occasion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {bundles.map((bundle, i) => (
              <motion.div
                key={bundle.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card rounded-2xl p-6 border-2 ${bundle.color} shadow-xs`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif font-bold text-lg">
                    {bundle.name}
                  </h3>
                  <Badge
                    className={`${bundle.badgeColor} border-0 text-xs rounded-full ml-2 shrink-0`}
                  >
                    {bundle.discount}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {bundle.desc}
                </p>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xl font-bold text-foreground">
                    {bundle.price}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {bundle.original}
                  </span>
                </div>
                <Button
                  asChild
                  className="w-full rounded-xl bg-sage hover:bg-sage-dark text-white"
                >
                  <a
                    href="https://wa.me/917989215059"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shop Now
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why buy from us */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${perk.bg} flex items-center justify-center shrink-0`}
              >
                <perk.icon className={`w-5 h-5 ${perk.color}`} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {perk.title}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
