import { Globe, HandHeart, Leaf, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const story = [
  {
    icon: HandHeart,
    title: "Why We Started",
    text: "We grew up using plastic in every corner of the house. One day, we asked: why? That question became SeethaCeramics.",
    bg: "bg-blush-light",
    color: "text-blush-dark",
  },
  {
    icon: Leaf,
    title: "Our Mission",
    text: "We want to make sustainable living accessible. Not preachy. Not expensive. Just beautiful ceramics that replace plastic, one piece at a time.",
    bg: "bg-sage-light",
    color: "text-sage-dark",
  },
  {
    icon: Globe,
    title: "Local Love",
    text: "Every piece is crafted in Hyderabad. We work with local artisans, support local craft, and put Hyderabad on the ceramics map.",
    bg: "bg-gold-light",
    color: "text-gold",
  },
];

const values = [
  {
    icon: Leaf,
    label: "Sustainability",
    desc: "Every choice we make reduces plastic waste.",
  },
  {
    icon: HandHeart,
    label: "Craftsmanship",
    desc: "Skilled hands. Real art. Every time.",
  },
  {
    icon: Globe,
    label: "Affordability",
    desc: "Beautiful shouldn't mean expensive.",
  },
  {
    icon: Users,
    label: "Community",
    desc: "Supporting local artisans in Hyderabad.",
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us — SeethaCeramics | Handmade Ceramics Hyderabad";
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="gradient-blush py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 bg-white/70 text-xs font-semibold text-sage-dark rounded-full border border-sage/30 tracking-wide uppercase"
            >
              Our Story
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl font-bold leading-tight"
            >
              We Started with a Simple Idea.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl text-muted-foreground font-medium"
            >
              What if everyday things could be beautiful AND sustainable?
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Story Blocks ── */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {story.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="bg-card rounded-2xl p-8 border border-border shadow-xs hover:shadow-soft transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-5`}
              >
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <h3 className="font-serif font-semibold text-lg mb-3">
                {s.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Vision Statement ── */}
      <section className="bg-blush-light py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground"
          >
            "We want to be the ceramic brand every Hyderabad home trusts."
          </motion.blockquote>
          <p className="mt-4 text-muted-foreground">— SeethaCeramics</p>
        </div>
      </section>

      {/* ── Values Grid ── */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            What We Stand For
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              variants={fadeUp}
              className="text-center p-6 bg-cream-dark rounded-2xl border border-border"
            >
              <div
                className={`w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  i % 2 === 0 ? "bg-sage-light" : "bg-blush-light"
                }`}
              >
                <v.icon
                  className={`w-5 h-5 ${i % 2 === 0 ? "text-sage-dark" : "text-blush-dark"}`}
                />
              </div>
              <h3 className="font-serif font-semibold text-sm mb-1.5">
                {v.label}
              </h3>
              <p className="text-xs text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Team placeholder ── */}
      <section className="bg-cream-dark border-y border-border py-16">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="w-20 h-20 rounded-full bg-blush-light flex items-center justify-center mx-auto">
              <Users className="w-10 h-10 text-blush-dark" />
            </div>
            <h2 className="font-serif text-2xl font-bold">
              A small team. Big dreams.
            </h2>
            <p className="text-muted-foreground font-medium">
              Made in Hyderabad.
            </p>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Behind every piece is a small passionate team that believes in
              sustainable living and the power of beautiful, everyday objects.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
