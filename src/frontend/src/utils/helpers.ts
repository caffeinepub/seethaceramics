import type { Product } from "../backend.d";

export const getProductImage = (product: Product): string => {
  const name = product.name.toLowerCase();
  if (name.includes("evil eye") && name.includes("incense"))
    return "/assets/uploads/image-1.png";
  if (name.includes("planter"))
    return "/assets/uploads/Screenshot-2026-03-01-142300-1.png";
  if (name.includes("mug") && name.includes("pink"))
    return "/assets/generated/product-mug-pink.dim_600x600.jpg";
  if (name.includes("mug") && name.includes("green"))
    return "/assets/generated/product-mug-pink.dim_600x600.jpg";
  if (name.includes("mug"))
    return "/assets/generated/product-mug-pink.dim_600x600.jpg";
  if (name.includes("bowl") && name.includes("cream"))
    return "/assets/generated/product-bowl-green.dim_600x600.jpg";
  if (name.includes("bowl"))
    return "/assets/generated/product-bowl-green.dim_600x600.jpg";
  if (name.includes("vase") && name.includes("blush"))
    return "/assets/generated/product-vase-cream.dim_600x600.jpg";
  if (name.includes("vase"))
    return "/assets/generated/product-vase-cream.dim_600x600.jpg";
  if (name.includes("plate"))
    return "/assets/generated/product-plates-set.dim_600x600.jpg";
  if (name.includes("gift box"))
    return "/assets/generated/product-gift-set.dim_600x600.jpg";
  if (name.includes("gift") || name.includes("set") || name.includes("bundle"))
    return "/assets/generated/product-gift-set.dim_600x600.jpg";
  if (name.includes("tea"))
    return "/assets/generated/product-tea-set.dim_600x600.jpg";
  return "/assets/generated/product-mug-pink.dim_600x600.jpg";
};

export const formatPrice = (paisa: bigint): string =>
  `₹${(Number(paisa) / 100).toFixed(0)}`;

// Motoko optional ([] | [bigint]) → bigint | undefined
export const unwrapOptional = (
  opt: [] | [bigint] | bigint | undefined,
): bigint | undefined => {
  if (opt === undefined || opt === null) return undefined;
  if (typeof opt === "bigint") return opt;
  if (Array.isArray(opt)) {
    return opt.length > 0 ? opt[0] : undefined;
  }
  return undefined;
};

export const getSessionId = (): string => {
  let id = localStorage.getItem("seetha_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("seetha_session", id);
  }
  return id;
};

export const formatDate = (timestamp: bigint): string => {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const renderStars = (rating: bigint): string => {
  const r = Number(rating);
  return "★".repeat(r) + "☆".repeat(5 - r);
};
