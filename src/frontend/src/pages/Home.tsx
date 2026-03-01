import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle2,
  Heart,
  IndianRupee,
  Leaf,
  Phone,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts, useReviews } from "../hooks/useQueries";
import { Link } from "../router";
import { formatDate, renderStars } from "../utils/helpers";

const features = [
  {
    icon: Leaf,
    title: "No Plastic",
    desc: "Every piece replaces plastic in your home.",
    bg: "bg-sage-light",
    iconColor: "text-sage-dark",
  },
  {
    icon: Heart,
    title: "Handmade",
    desc: "Crafted by hand, with care, every time.",
    bg: "bg-blush-light",
    iconColor: "text-blush-dark",
  },
  {
    icon: Sparkles,
    title: "Glossy Finish",
    desc: "Smooth, glossy, made to last for years.",
    bg: "bg-gold-light",
    iconColor: "text-gold",
  },
  {
    icon: IndianRupee,
    title: "Affordable",
    desc: "Luxury doesn't have to cost a fortune.",
    bg: "bg-sage-light",
    iconColor: "text-sage-dark",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Shape",
    desc: "Every piece starts on the wheel. Shaped by hand, guided by skill.",
    image: "/assets/generated/process-shaping.dim_600x500.jpg",
  },
  {
    num: "02",
    title: "Glaze",
    desc: "We apply our signature pastel glazes. This is where the magic happens.",
    image: "/assets/generated/process-glazing.dim_600x500.jpg",
  },
  {
    num: "03",
    title: "Fire",
    desc: "Fired at high temperatures for a glossy, durable finish that lasts.",
    image: null,
  },
];

const trustItems = [
  "Best Quality",
  "On-time Delivery",
  "Friendly Service",
  "Loved by Customers",
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: reviews = [], isLoading: reviewsLoading } = useReviews();

  useEffect(() => {
    document.title =
      "SeethaCeramics — Sustainable Handmade Ceramics | Hyderabad";
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden gradient-blush">
        {/* Decorative blurred orb — top right atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.88 0.07 12 / 0.6) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        {/* Decorative orb — bottom left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.78 0.085 72 / 0.5) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="container mx-auto px-4 py-16 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-7 max-w-lg relative z-10"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm text-xs font-semibold text-sage-dark rounded-full border border-sage-light shadow-xs tracking-widest uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
                Handmade in Hyderabad
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="font-serif font-bold text-foreground"
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                Sustainable{" "}
                <em
                  className="not-italic"
                  style={{ color: "oklch(var(--blush-dark))" }}
                >
                  Ceramics.
                </em>
                <br />
                Everyday Luxury.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-xl font-medium text-muted-foreground tracking-tight"
              >
                Switch from plastic.{" "}
                <span className="text-foreground font-semibold">
                  Choose better.
                </span>
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 pt-1"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-sage hover:bg-sage-dark text-white rounded-xl px-8 h-12 text-base shadow-sage"
                >
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-foreground/25 hover:bg-white/60 rounded-xl px-8 h-12 text-base backdrop-blur-sm"
                >
                  <a
                    href="https://wa.me/917989215059"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Message Us
                  </a>
                </Button>
              </motion.div>

              {/* Social proof micro-strip */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 pt-2"
              >
                <div className="flex -space-x-2">
                  {["bg-blush", "bg-sage-light", "bg-gold-light"].map(
                    (c, i) => (
                      <div
                        key={c}
                        className={`w-8 h-8 rounded-full border-2 border-white ${c} flex items-center justify-center text-xs font-bold text-foreground/60`}
                        style={{ zIndex: 3 - i }}
                      >
                        {["A", "P", "R"][i]}
                      </div>
                    ),
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">500+</span>{" "}
                  happy homes in Hyderabad
                </p>
              </motion.div>
            </motion.div>

            {/* Right — image with floating ceramic circle accent */}
            <div className="relative">
              {/* Decorative ceramic circle behind image */}
              <div
                aria-hidden="true"
                className="ceramic-circle absolute -top-6 -right-6 w-40 h-40 lg:w-52 lg:h-52 opacity-70"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-[4/3] z-10"
              >
                <img
                  src="/assets/generated/hero-ceramics.dim_1400x700.jpg"
                  alt="SeethaCeramics handmade ceramic collection"
                  className="w-full h-full object-cover"
                />
                {/* Subtle vignette bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                {/* Floating badge on image */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-soft flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-sage-light flex items-center justify-center shrink-0">
                    <span className="text-lg">🏺</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-none mb-0.5">
                      Handmade Ceramics
                    </p>
                    <p className="text-xs text-muted-foreground leading-none">
                      Sustainable · Affordable
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            Our Favourites
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            The pieces everyone's talking about.
          </p>
        </motion.div>

        {productsLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {["sk1", "sk2", "sk3", "sk4"].map((sk) => (
              <div key={sk} className="space-y-3">
                <Skeleton className="aspect-square rounded-2xl" />
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-sage text-sage-dark hover:bg-sage-light rounded-xl px-8"
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-cream-dark py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Beautiful. Responsible. Affordable.
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We create pastel, minimal ceramics that make your home feel soft
              and elevated.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="bg-card rounded-2xl p-6 text-center border border-border shadow-xs hover:shadow-soft transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mx-auto mb-4`}
                >
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="font-serif font-semibold text-base mb-1">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Mission ── */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-xs font-semibold tracking-widest text-sage-dark uppercase">
              Our Mission
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight">
              We're not just selling ceramics.
              <br />
              <span className="text-blush-dark">We're changing habits.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every piece you buy helps reduce plastic use and supports mindful
              living.
            </p>
            <p className="text-foreground font-medium italic font-serif text-xl">
              "We believe everyday products can be beautiful."
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                className="bg-sage hover:bg-sage-dark text-white rounded-xl"
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-soft aspect-[4/3]"
          >
            <img
              src="/assets/generated/portfolio-home-setup.dim_800x600.jpg"
              alt="Ceramics in a home setting"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="gradient-blush py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Handcrafted with care.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-xs"
              >
                <div className="aspect-[6/5] bg-cream-dark overflow-hidden">
                  {step.image ? (
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full gradient-sage flex items-center justify-center">
                      <span className="text-5xl">🔥</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-4xl font-serif font-bold text-gold/40 mb-1">
                    {step.num}
                  </div>
                  <h3 className="font-serif font-semibold text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-8 text-muted-foreground font-medium">
            Glossy finish. Made to last. You'll see the difference.
          </p>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            Loved by our customers
          </h2>
        </motion.div>

        {reviewsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {["rsk1", "rsk2", "rsk3"].map((sk) => (
              <div
                key={sk}
                className="space-y-3 p-6 bg-card rounded-2xl border border-border"
              >
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-16 w-full rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.slice(0, 6).map((review, i) => (
              <motion.div
                key={review.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-xs hover:shadow-soft transition-shadow"
              >
                <div className="text-blush-dark text-lg mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">
                      {review.customerName}
                    </span>
                    <span className="mx-1.5">·</span>
                    <span>{review.productName}</span>
                  </div>
                  <span>{formatDate(review.createdAt)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>Be the first to share your experience!</p>
          </div>
        )}
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-cream-dark border-y border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {trustItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <CheckCircle2 className="w-5 h-5 text-sage" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 max-w-xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Ready to switch to ceramic?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join hundreds of happy homes in Hyderabad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-sage hover:bg-sage-dark text-white rounded-xl px-8 shadow-sage"
            >
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-foreground/20 hover:bg-muted rounded-xl px-8"
            >
              <a href="tel:+917989215059">
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </a>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
