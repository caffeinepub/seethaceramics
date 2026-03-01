import { Button } from "@/components/ui/button";
import { Instagram, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Category = "All" | "Product Shots" | "Home Setups" | "Textures";

interface GalleryItem {
  src: string;
  alt: string;
  category: Category;
  caption: string;
  wide?: boolean;
}

const gallery: GalleryItem[] = [
  {
    src: "/assets/generated/hero-ceramics.dim_1400x700.jpg",
    alt: "Full SeethaCeramics collection",
    category: "Product Shots",
    caption: "Our full collection.",
    wide: true,
  },
  {
    src: "/assets/generated/portfolio-home-setup.dim_800x600.jpg",
    alt: "Ceramics in home setting",
    category: "Home Setups",
    caption: "Ceramics in their natural habitat.",
  },
  {
    src: "/assets/generated/portfolio-flatlay.dim_800x600.jpg",
    alt: "Flatlay product shot",
    category: "Product Shots",
    caption: "Styled for the 'gram.",
  },
  {
    src: "/assets/generated/portfolio-texture-closeup.dim_800x600.jpg",
    alt: "Ceramic texture close-up",
    category: "Textures",
    caption: "Close up. Every detail matters.",
  },
  {
    src: "/assets/generated/product-mug-pink.dim_600x600.jpg",
    alt: "Blush Pink Mug",
    category: "Product Shots",
    caption: "The Blush Pink Mug.",
  },
  {
    src: "/assets/generated/product-bowl-green.dim_600x600.jpg",
    alt: "Sage Green Bowls",
    category: "Product Shots",
    caption: "Sage Green Bowls.",
  },
  {
    src: "/assets/generated/product-vase-cream.dim_600x600.jpg",
    alt: "Cream Vase with Gold Rim",
    category: "Product Shots",
    caption: "Cream Vase with Gold Rim.",
  },
  {
    src: "/assets/generated/product-plates-set.dim_600x600.jpg",
    alt: "Pastel Plate Set",
    category: "Product Shots",
    caption: "Pastel Plate Set.",
  },
  {
    src: "/assets/generated/product-gift-set.dim_600x600.jpg",
    alt: "Gift Set Packaging",
    category: "Product Shots",
    caption: "Gift Set Packaging.",
  },
  {
    src: "/assets/generated/process-shaping.dim_600x500.jpg",
    alt: "Clay shaping process",
    category: "Textures",
    caption: "From clay to ceramic.",
  },
  {
    src: "/assets/generated/process-glazing.dim_600x500.jpg",
    alt: "Glaze application",
    category: "Textures",
    caption: "Glaze application.",
  },
];

const categories: Category[] = [
  "All",
  "Product Shots",
  "Home Setups",
  "Textures",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  useEffect(() => {
    document.title =
      "Portfolio — SeethaCeramics | Handmade Ceramics Photography";
  }, []);

  const filtered =
    activeCategory === "All"
      ? gallery
      : gallery.filter((i) => i.category === activeCategory);

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  const closeLightbox = () => setLightboxSrc(null);

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
              Our Work
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              Every piece, a little piece of art.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-sage text-white shadow-sage"
                  : "bg-cream-dark text-muted-foreground hover:bg-sage-light hover:text-sage-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`relative cursor-pointer group overflow-hidden rounded-2xl bg-cream-dark ${
                  item.wide ? "md:col-span-3" : ""
                }`}
                onClick={() => openLightbox(item.src, item.alt)}
              >
                <div
                  className={`overflow-hidden ${
                    item.wide ? "aspect-[21/9]" : "aspect-square"
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <p className="text-white font-medium text-sm">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-blush-light border-y border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center mx-auto">
              <Instagram className="w-6 h-6 text-blush-dark" />
            </div>
            <h3 className="font-serif text-xl font-bold">
              Follow our journey on Instagram
            </h3>
            <p className="text-muted-foreground">
              Behind-the-scenes, new arrivals & more.
            </p>
            <Button
              asChild
              className="bg-blush-dark hover:bg-blush text-white rounded-xl px-8"
            >
              <a
                href="https://instagram.com/seetha_ceramics"
                target="_blank"
                rel="noopener noreferrer"
              >
                @seetha_ceramics
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <motion.img
              key={lightboxSrc}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={lightboxSrc}
              alt={lightboxAlt}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
