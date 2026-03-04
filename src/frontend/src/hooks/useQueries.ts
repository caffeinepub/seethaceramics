import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, Review } from "../backend.d";
import { useActor } from "./useActor";

// Products defined in the frontend that don't exist in the backend seed data
export const FRONTEND_PRODUCTS: Product[] = [
  {
    id: BigInt(9001),
    name: "Evil Eye Incense Holder",
    description:
      "A beautiful handcrafted evil eye incense holder with a glossy finish. Doubles as a decorative piece and a functional incense stand.",
    price: BigInt(14900),
    imageUrl: "/assets/Screenshot 2026-02-22 141642.png",
    category: "Decor",
    tags: ["Handmade", "Sustainable", "Decor"],
    inStock: true,
  },
  {
    id: BigInt(9002),
    name: "Ceramic Ring Dish — Evil Eye",
    description:
      "A stunning cobalt blue evil eye ceramic ring dish, handcrafted with glossy finish. Perfect for storing rings, earrings, and small jewellery.",
    price: BigInt(28900),
    imageUrl: "/assets/Screenshot 2026-03-01 145905-2.png",
    category: "Decor",
    tags: ["Handmade", "Sustainable", "Decor"],
    inStock: true,
  },
  {
    id: BigInt(9003),
    name: "Turtle Ceramic Ring Dish",
    description:
      "An adorable turtle-shaped ceramic ring dish, handmade with a smooth pastel finish. A charming spot to keep your favourite jewellery.",
    price: BigInt(21900),
    imageUrl: "/assets/image-4.png",
    category: "Decor",
    tags: ["Handmade", "Sustainable", "Decor"],
    inStock: true,
  },
  {
    id: BigInt(9004),
    name: "Shell Organizer",
    description:
      "A handcrafted ceramic shell-shaped organizer, perfect for storing small items, trinkets, or jewellery on your vanity or desk.",
    price: BigInt(27900),
    imageUrl: "/assets/image-5.png",
    category: "Decor",
    tags: ["Handmade", "Sustainable", "Decor"],
    inStock: true,
  },
  {
    id: BigInt(9005),
    name: "Ceramic Trinket Tray",
    description:
      "A delicate handmade ceramic trinket tray — ideal for rings, earrings, or small keepsakes. Minimal, elegant, and practical.",
    price: BigInt(11900),
    imageUrl: "/assets/image-7.png",
    category: "Decor",
    tags: ["Handmade", "Sustainable", "Decor"],
    inStock: true,
  },
  {
    id: BigInt(9006),
    name: "Bio Mini Ceramic Planters Pack of 3",
    description:
      "A set of 3 adorable mini ceramic planters, perfect for succulents, cacti, or herbs. Biodegradable and eco-friendly alternative to plastic pots.",
    price: BigInt(9900),
    imageUrl: "/assets/Screenshot 2026-03-01 142300-1.png",
    category: "Planters",
    tags: ["Handmade", "Sustainable", "Planters"],
    inStock: true,
  },
  {
    id: BigInt(9007),
    name: "Pastel Ceramic Planters Pack of 6",
    description:
      "A beautiful set of 6 handmade pastel ceramic planters with charming patterns — stripes, polka dots, hearts, and florals. Perfect for succulents and small plants.",
    price: BigInt(17900),
    imageUrl: "/assets/Screenshot 2026-03-01 153632-4.png",
    category: "Planters",
    tags: ["Handmade", "Sustainable", "Planters"],
    inStock: true,
  },
  {
    id: BigInt(9008),
    name: "Large Ceramic Planter",
    description:
      "A large handcrafted ceramic planter with a modern design, perfect for indoor plants, ferns, or statement greenery. Durable and biodegradable.",
    price: BigInt(18900),
    imageUrl: "/assets/ChatGPT Image Mar 1, 2026, 02_44_46 PM.png",
    category: "Planters",
    tags: ["Handmade", "Sustainable", "Planters"],
    inStock: true,
  },
  {
    id: BigInt(9009),
    name: "Smiley Face Ceramic Planter",
    description:
      "A fun, cheerful smiley face ceramic planter that brings personality to any corner of your home. Handmade with a glossy pastel finish.",
    price: BigInt(18900),
    imageUrl: "/assets/ChatGPT Image Mar 1, 2026, 02_38_51 PM.png",
    category: "Planters",
    tags: ["Handmade", "Sustainable", "Planters"],
    inStock: true,
  },
  {
    id: BigInt(9010),
    name: "Ceramic Egg Holder (4 Eggs)",
    description:
      "A charming handcrafted ceramic egg holder for 4 eggs. Elegant, practical, and a beautiful alternative to plastic egg trays.",
    price: BigInt(10400),
    imageUrl: "/assets/image-3.png",
    category: "Kitchen",
    tags: ["Handmade", "Sustainable", "Kitchen"],
    inStock: true,
  },
  {
    id: BigInt(9011),
    name: "Ceramic Egg Holder (6 Eggs)",
    description:
      "A delightful handcrafted ceramic egg holder for 6 eggs with a heart-print design. A sustainable, stylish addition to any kitchen.",
    price: BigInt(15400),
    imageUrl: "/assets/ChatGPT Image Mar 1, 2026, 03_05_43 PM.png",
    category: "Kitchen",
    tags: ["Handmade", "Sustainable", "Kitchen"],
    inStock: true,
  },
];

function mergeProducts(_backendProducts: Product[]): Product[] {
  // All products are defined in FRONTEND_PRODUCTS so each product has its own unique image.
  // Backend products are intentionally ignored to prevent image mix-ups.
  return FRONTEND_PRODUCTS;
}

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", !!actor],
    queryFn: async () => {
      if (!actor) return mergeProducts([]);
      try {
        const products = await actor.getProducts();
        return mergeProducts(products);
      } catch {
        return mergeProducts([]);
      }
    },
    // Always run — show frontend products immediately, upgrade when actor is ready
    enabled: !isFetching,
    staleTime: 0,
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", category, !!actor],
    queryFn: async () => {
      if (!actor) {
        const all = mergeProducts([]);
        return category === "All"
          ? all
          : all.filter(
              (p) => p.category.toLowerCase() === category.toLowerCase(),
            );
      }
      try {
        if (category === "All") {
          const products = await actor.getProducts();
          return mergeProducts(products);
        }
        const products = await actor.getProductsByCategory(category);
        const frontendMatches = FRONTEND_PRODUCTS.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase(),
        );
        return [...products, ...frontendMatches];
      } catch {
        const all = mergeProducts([]);
        return category === "All"
          ? all
          : all.filter(
              (p) => p.category.toLowerCase() === category.toLowerCase(),
            );
      }
    },
    enabled: !isFetching,
    staleTime: 0,
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
