import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, Review } from "../backend.d";
import { useActor } from "./useActor";

// Products defined in the frontend that don't exist in the backend seed data
export const FRONTEND_PRODUCTS: Product[] = [
  {
    id: BigInt(13),
    name: "Evil Eye Incense Holder",
    category: "Decor",
    description:
      "A handcrafted evil eye incense holder in deep blue. Burn your favourite incense and let the good vibes flow. Protective, decorative, and beautifully made.",
    price: BigInt(14900),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/image-1-3.png",
    tags: ["Handmade", "Decor", "Artisan"],
    inStock: true,
  },
  {
    id: BigInt(14),
    name: "Bio Mini Ceramic Planters Pack of 3",
    category: "Planters",
    description:
      "A set of 3 adorable handmade mini ceramic planters — striped, blush, and heart-print. Perfect for succulents, herbs, or small blooms. Sustainable, biodegradable, and made with love.",
    price: BigInt(9900),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/Screenshot-2026-03-01-142300-1.png",
    tags: ["Handmade", "Planters", "Sustainable", "Set of 3"],
    inStock: true,
  },
  {
    id: BigInt(15),
    name: "Pastel Ceramic Planters Pack of 6",
    category: "Planters",
    description:
      "A delightful set of 6 handmade mini ceramic planters in soft pink and white with playful stripe, polka dot, and floral heart prints. Perfect for succulents and small plants. Sustainable, biodegradable, and full of charm.",
    price: BigInt(17900),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/image-8-1.png",
    tags: ["Handmade", "Planters", "Sustainable", "Set of 6"],
    inStock: true,
  },
  {
    id: BigInt(16),
    name: "Large Ceramic Planter",
    category: "Planters",
    description:
      "A large handmade ceramic planter with a soft sage green wave design. Generous size for your favourite indoor plants. Sustainable, biodegradable, and beautifully crafted.",
    price: BigInt(18900),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/ChatGPT-Image-Mar-1-2026-02_44_46-PM-1.png",
    tags: ["Handmade", "Planters", "Sustainable", "Large"],
    inStock: true,
  },
  {
    id: BigInt(17),
    name: "Smiley Face Ceramic Planter",
    category: "Planters",
    description:
      "A large handmade ceramic planter with a glossy cream finish, playful smiley face, and a pink scallop base with speckled dots. Comes with a matching saucer. Cheerful, sustainable, and beautifully crafted.",
    price: BigInt(18900),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/ChatGPT-Image-Mar-1-2026-02_38_51-PM-1.png",
    tags: ["Handmade", "Planters", "Sustainable", "Large"],
    inStock: true,
  },
  {
    id: BigInt(19),
    name: "Ceramic Egg Holder (4 Eggs)",
    category: "Kitchen",
    description:
      "A handmade ceramic egg holder for 4 eggs. Compact, sturdy, and beautifully crafted. Keeps your eggs safe and adds a touch of handmade charm to your kitchen counter.",
    price: BigInt(10400),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/ChatGPT-Image-Mar-1-2026-03_01_24-PM-1.png",
    tags: ["Handmade", "Kitchen", "Sustainable", "Affordable"],
    inStock: true,
  },
  {
    id: BigInt(20),
    name: "Ceramic Egg Holder (6 Eggs)",
    category: "Kitchen",
    description:
      "A handmade ceramic egg holder for 6 eggs with a sweet red heart-print design. Glossy white finish, beautifully crafted. Keeps your eggs safe and adds a charming touch to your kitchen counter.",
    price: BigInt(15400),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/ChatGPT-Image-Mar-1-2026-03_05_43-PM-1.png",
    tags: ["Handmade", "Kitchen", "Sustainable", "Affordable"],
    inStock: true,
  },
  {
    id: BigInt(18),
    name: "Ceramic Ring Dish — Evil Eye",
    category: "Decor",
    description:
      "A handmade ceramic ring dish with a stunning evil eye design. Deep cobalt blue beaded rim, glossy white centre. Perfect for storing rings, earrings, or small trinkets. Protective, beautiful, and full of charm.",
    price: BigInt(14900),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/image-3-1.png",
    tags: ["Handmade", "Decor", "Artisan", "Ring Dish"],
    inStock: true,
  },
  {
    id: BigInt(21),
    name: "Turtle Ceramic Ring Dish",
    category: "Decor",
    description:
      "A handmade ceramic ring dish shaped like a turtle with a gorgeous teal glaze and intricate shell detail. Perfect for storing rings, earrings, and trinkets. A unique statement piece for your dresser or vanity.",
    price: BigInt(21900),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/image-4-1.png",
    tags: ["Handmade", "Decor", "Artisan", "Ring Dish", "Turtle"],
    inStock: true,
  },
  {
    id: BigInt(22),
    name: "Shell Organizer",
    category: "Decor",
    description:
      "A beautiful handmade ceramic shell-shaped organizer with a pearlescent blush finish. Perfect for rings, earrings, pins, or small trinkets. A soft, elegant piece that brings a touch of the sea to your dresser or vanity.",
    price: BigInt(27900),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/image-5-1.png",
    tags: ["Handmade", "Decor", "Artisan", "Organizer", "Shell"],
    inStock: true,
  },
  {
    id: BigInt(23),
    name: "Ceramic Trinket Tray",
    category: "Decor",
    description:
      "A handmade ceramic trinket tray — perfect for jewellery, keys, or small keepsakes. Soft pastel glaze with a glossy finish. Keep your essentials beautiful and organised.",
    price: BigInt(11900),
    discountPrice: undefined,
    imageUrl: "/assets/uploads/image-7-1.png",
    tags: ["Handmade", "Decor", "Artisan", "Trinket"],
    inStock: true,
  },
];

function mergeProducts(backendProducts: Product[]): Product[] {
  const backendIds = new Set(backendProducts.map((p) => p.id.toString()));
  const extras = FRONTEND_PRODUCTS.filter(
    (p) => !backendIds.has(p.id.toString()),
  );
  return [...backendProducts, ...extras];
}

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return mergeProducts([]);
      const products = await actor.getProducts();
      return mergeProducts(products);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) {
        const all = mergeProducts([]);
        return category === "All"
          ? all
          : all.filter(
              (p) => p.category.toLowerCase() === category.toLowerCase(),
            );
      }
      if (category === "All") {
        const products = await actor.getProducts();
        return mergeProducts(products);
      }
      const products = await actor.getProductsByCategory(category);
      const frontendMatches = FRONTEND_PRODUCTS.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
      return [...products, ...frontendMatches];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: async ({
      actor,
      name,
      email,
      phone,
      message,
    }: {
      actor: import("../backend.d").backendInterface;
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      return actor.submitContact(name, email, phone, message);
    },
  });
}

export function useAddReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      actor,
      productName,
      customerName,
      rating,
      comment,
    }: {
      actor: import("../backend.d").backendInterface;
      productName: string;
      customerName: string;
      rating: bigint;
      comment: string;
    }) => {
      return actor.addReview(productName, customerName, rating, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
