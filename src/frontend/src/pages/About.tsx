import { Globe, HandHeart, Leaf, Sparkles, Users } from "lucide-react";
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
    title: "The Name Seetha",
    text: "Seetha is inspired by our grandmother — a remarkable woman whose values of simplicity, sustainability, and tradition continue to shape everything we create.",
    bg: "bg-blush-light",
    color: "text-blush-dark",
  },
  {
    icon: Leaf,
    title: "Why We Started",
    text: "Plastic has become part of everyday life. We asked: what if we could reduce that dependence in simple, meaningful ways? That question became Seetha Ceramics.",
    bg: "bg-sage-light",
    color: "text-sage-dark",
  },
  {
    icon: Globe,
    title: "Tradition, Reimagined",
    text: "We bring heritage back into modern living — creating products that beautifully blend tradition with contemporary needs. Not just a brand. A way of living.",
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
              The Story Behind Seetha Ceramics
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl text-muted-foreground font-medium"
            >
              Tradition, reimagined for the future.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Full Brand Story ── */}
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Opening */}
          <div className="space-y-4">
            <p className="text-lg text-foreground leading-relaxed">
              In today's fast-paced world, we often drift away from our roots.
              Seetha Ceramics was born from a desire to bring tradition back
              into modern living — creating products that beautifully blend
              heritage with contemporary needs.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Plastic has become a part of our everyday lives. It's hard to
              imagine a day without it. But what if we could reduce our
              dependence on plastic in simple, meaningful ways?
            </p>
          </div>

          {/* Mission highlight */}
          <div className="bg-sage-light/50 border border-sage/30 rounded-2xl px-8 py-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center shrink-0 mt-1">
                <Leaf className="w-5 h-5 text-sage-dark" />
              </div>
              <p className="text-foreground leading-relaxed font-medium">
                At Seetha Ceramics, we are committed to creating eco-friendly
                alternatives to everyday plastic items. Our ceramic planters
                offer a sustainable replacement for plastic pots — they are
                biodegradable, durable, and safer for the environment.
              </p>
            </div>
          </div>

          {/* Name meaning */}
          <div className="bg-blush-light/50 border border-blush/30 rounded-2xl px-8 py-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blush-light flex items-center justify-center shrink-0 mt-1">
                <HandHeart className="w-5 h-5 text-blush-dark" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg">
                  The Name Seetha
                </h3>
                <p className="text-foreground leading-relaxed">
                  The name Seetha holds deep personal meaning. It is inspired by
                  our grandmother — a remarkable woman who guided us toward
                  discovering this vision. Her values of simplicity,
                  sustainability, and tradition continue to shape our journey.
                </p>
              </div>
            </div>
          </div>

          {/* Founders */}
          <div className="bg-gold-light/40 border border-gold/20 rounded-2xl px-8 py-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold-light flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg">
                  Two Teenagers. One Dream.
                </h3>
                <p className="text-foreground leading-relaxed">
                  Seetha Ceramics is the story of{" "}
                  <span className="font-semibold text-foreground">
                    Bhavajna
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-foreground">Charita</span>{" "}
                  — two passionate teenagers who came together with a shared
                  dream — to create something meaningful, sustainable, and
                  rooted in culture.
                </p>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <div className="text-center pt-4">
            <p className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
              This is not just a brand.
            </p>
            <p className="font-serif text-2xl md:text-3xl font-bold text-blush-dark leading-snug mt-1">
              It is tradition, reimagined for the future.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Story Cards ── */}
      <section className="container mx-auto px-4 pb-16">
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

      {/* ── Founders ── */}
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
              Bhavajna & Charita
            </h2>
            <p className="text-muted-foreground font-medium">
              Co-founders · Made in Hyderabad.
            </p>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Two passionate teenagers with a shared dream — to create something
              meaningful, sustainable, and rooted in culture. Guided by
              tradition. Built for the future.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
