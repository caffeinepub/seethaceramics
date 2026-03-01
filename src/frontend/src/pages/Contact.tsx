import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useActor } from "../hooks/useActor";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    document.title = "Contact Us — SeethaCeramics | Get In Touch | Hyderabad";
  }, []);

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !actor) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await actor.submitContact(
        form.name,
        form.email,
        form.phone,
        form.message,
      );
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

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
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              Let's talk.
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Phone */}
          <motion.div
            variants={fadeUp}
            className="bg-blush-light rounded-2xl p-7 border border-blush text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto shadow-soft">
              <Phone className="w-6 h-6 text-blush-dark" />
            </div>
            <h3 className="font-serif font-bold text-lg">Call Us</h3>
            <p className="text-muted-foreground text-sm">We pick up. Really.</p>
            <a
              href="tel:+917989215059"
              className="text-lg font-bold text-foreground hover:text-blush-dark transition-colors"
            >
              +91 79892 15059
            </a>
            <div>
              <Button
                asChild
                className="bg-blush-dark hover:bg-blush text-white rounded-xl w-full"
              >
                <a href="tel:+917989215059">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            variants={fadeUp}
            className="bg-sage-light rounded-2xl p-7 border border-sage text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto shadow-soft">
              <MessageCircle className="w-6 h-6 text-sage-dark" />
            </div>
            <h3 className="font-serif font-bold text-lg">Message Us</h3>
            <p className="text-muted-foreground text-sm">
              WhatsApp is easiest for us.
            </p>
            <p className="text-lg font-bold text-foreground">
              Chat on WhatsApp
            </p>
            <div>
              <Button
                asChild
                className="bg-sage hover:bg-sage-dark text-white rounded-xl w-full"
              >
                <a
                  href="https://wa.me/917989215059"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Open WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={fadeUp}
            className="bg-cream-dark rounded-2xl p-7 border border-border text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto shadow-soft">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif font-bold text-lg">Visit Us</h3>
            <p className="text-muted-foreground text-sm">
              Come say hello in person.
            </p>
            <p className="text-lg font-bold text-foreground">
              Hyderabad, Telangana
            </p>
            <p className="text-sm text-muted-foreground">India</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-8 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-8 shadow-soft"
        >
          <h2 className="font-serif text-2xl font-bold mb-6">
            Send us a message
          </h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <CheckCircle2 className="w-14 h-14 text-sage mx-auto" />
              <h3 className="font-serif text-xl font-bold">
                Thanks! We'll get back to you soon.
              </h3>
              <p className="text-muted-foreground text-sm">
                Usually within a few hours.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="rounded-xl border-sage text-sage-dark hover:bg-sage-light"
              >
                Send another message
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  Name <span className="text-blush-dark">*</span>
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Your name"
                  className="rounded-xl border-border"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">
                  Email <span className="text-blush-dark">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="your@email.com"
                  className="rounded-xl border-border"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="+91 98765 43210"
                  className="rounded-xl border-border"
                  autoComplete="tel"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">
                  Message <span className="text-blush-dark">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="Tell us what you're looking for…"
                  rows={4}
                  className="rounded-xl border-border resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message}</p>
                )}
              </div>

              {submitError && (
                <p className="text-sm text-destructive">{submitError}</p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-sage hover:bg-sage-dark text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Social Links */}
      <section className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h3 className="font-serif text-xl font-bold">Find us on</h3>
          <div className="flex justify-center gap-4">
            <a
              href="https://instagram.com/seetha_ceramics"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-blush-light hover:bg-blush text-blush-dark rounded-xl border border-blush transition-colors text-sm font-medium"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
            <a
              href="https://facebook.com/SeethaCeramics"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-sage-light hover:bg-sage text-sage-dark rounded-xl border border-sage transition-colors text-sm font-medium"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
