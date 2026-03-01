import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "../backend.d";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useQueries";

const categories = [
  "All",
  "Mugs",
  "Bowls",
  "Vases",
  "Plates",
  "Sets",
  "Decor",
  "Planters",
  "Kitchen",
];
type SortOption = "featured" | "price-asc" | "price-desc";

export default function Products() {
  const { data: allProducts = [], isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");

  useEffect(() => {
    document.title =
      "Products — SeethaCeramics | Handmade Pastel Ceramics India";
  }, []);

  const filtered = useMemo(() => {
    let list: Product[] =
      activeCategory === "All"
        ? allProducts
        : allProducts.filter(
            (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
          );

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        break;
    }
    return list;
  }, [allProducts, activeCategory, sort]);

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
          Our Collection
        </h1>
        <p className="text-muted-foreground">
          Handmade · Sustainable · Affordable — every piece.
        </p>
      </motion.div>

      {/* Filters + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-sage text-white shadow-sage"
                  : "bg-cream-dark text-muted-foreground hover:bg-sage-light hover:text-sage-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-sm shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-44 rounded-lg border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].map((sk) => (
            <div key={sk} className="space-y-3">
              <Skeleton className="aspect-square rounded-2xl" />
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-9 w-full rounded-xl" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No products found.</p>
          <p className="text-sm">Try a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Badges strip */}
      {!isLoading && filtered.length > 0 && (
        <p className="text-center mt-10 text-xs text-muted-foreground">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} ·{" "}
          <span className="text-sage-dark font-medium">Handmade</span> ·{" "}
          <span className="text-blush-dark font-medium">Sustainable</span> ·{" "}
          <span className="text-gold font-medium">Affordable</span>
        </p>
      )}
    </main>
  );
}
