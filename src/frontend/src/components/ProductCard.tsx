import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import { formatPrice, getProductImage, unwrapOptional } from "../utils/helpers";
import { useCart } from "./CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Map tag text to a soft color pair so each tag feels intentional
const TAG_COLORS: Record<string, string> = {
  handmade: "bg-blush-light text-blush-dark",
  sustainable: "bg-sage-light text-sage-dark",
  affordable: "bg-gold-light text-foreground",
  glossy: "bg-cream-dark text-foreground",
  "gift set": "bg-blush-light text-blush-dark",
  gift: "bg-blush-light text-blush-dark",
  set: "bg-sage-light text-sage-dark",
  pastel: "bg-blush-light text-blush-dark",
  mug: "bg-sage-light text-sage-dark",
  bowl: "bg-sage-light text-sage-dark",
  vase: "bg-gold-light text-foreground",
  plate: "bg-cream-dark text-foreground",
};

function tagColor(tag: string): string {
  const key = tag.toLowerCase();
  for (const [k, v] of Object.entries(TAG_COLORS)) {
    if (key.includes(k)) return v;
  }
  return "bg-cream-dark text-muted-foreground";
}

// Show at most 3 of the product's own tags; fall back to brand defaults
const FALLBACK_TAGS = ["Handmade", "Sustainable", "Affordable"];

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const image = getProductImage(product);
  const discountPrice = unwrapOptional(product.discountPrice);

  const displayTags =
    product.tags && product.tags.length > 0
      ? product.tags.slice(0, 3)
      : FALLBACK_TAGS;

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    setAdding(true);
    try {
      await addToCart(product.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="card-hover bg-card rounded-2xl overflow-hidden border border-border group flex flex-col"
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden bg-cream-dark aspect-square shrink-0">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-107"
          loading="lazy"
        />

        {/* Category chip — top left */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/85 backdrop-blur-sm text-xs font-medium text-foreground/70 rounded-full border border-white/60 leading-none">
          {product.category}
        </span>

        {/* Sale ribbon — top right */}
        {discountPrice !== undefined && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-blush-dark text-white text-xs font-bold rounded-full leading-none">
            Sale
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1.5 bg-white text-xs font-semibold text-muted-foreground rounded-full border border-border shadow-xs">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Name */}
        <h3 className="font-serif font-semibold text-foreground text-[0.95rem] leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Real product tags */}
        <div className="flex flex-wrap gap-1.5">
          {displayTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`text-[0.68rem] px-2 py-0.5 font-medium border-0 rounded-full leading-none ${tagColor(tag)}`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Price — dominant number */}
        <div className="flex items-baseline gap-2 mt-auto">
          {discountPrice !== undefined ? (
            <>
              <span className="font-bold text-sage-dark text-xl leading-none">
                {formatPrice(discountPrice)}
              </span>
              <span className="text-sm text-muted-foreground line-through leading-none">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-bold text-foreground text-xl leading-none">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to cart — full-width, comfortable height */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || adding}
          className="w-full bg-sage hover:bg-sage-dark active:scale-[0.98] text-white rounded-xl h-10 text-sm font-semibold transition-all duration-200 mt-1"
        >
          {adding ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
              Adding…
            </>
          ) : added ? (
            <>
              <Check className="w-3.5 h-3.5 mr-2" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
