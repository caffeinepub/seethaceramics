import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, Review } from "../backend.d";
import { useActor } from "./useActor";

// Products defined in the frontend that don't exist in the backend seed data
export const FRONTEND_PRODUCTS: Product[] = [
  {
    id: BigInt(9001),
    name: "Evil Eye Incense Holder",
    description:
      "Handcrafted ceramic evil eye incense holder. Burn incense while keeping away negative energy.",
    price: BigInt(14900),
    category: "Decor",
    imageUrl: "/assets/uploads/Screenshot-2026-02-22-141642-1.png",
    tags: ["Handmade", "Decor", "Sustainable"],
    inStock: true,
  },
  {
    id: BigInt(9002),
    name: "Bio Mini Ceramic Planters Pack of 3",
    description:
      "A set of 3 handcrafted mini ceramic planters — biodegradable, sustainable, and perfect for your windowsill or desk.",
    price: BigInt(9900),
    category: "Planters",
    imageUrl: "/assets/uploads/Screenshot-2026-03-01-142300-1-1.png",
    tags: ["Handmade", "Planters", "Sustainable"],
    inStock: true,
  },
  {
    id: BigInt(9003),
    name: "Pastel Ceramic Planters Pack of 6",
    description:
      "A gorgeous set of 6 pastel ceramic planters with charming pink and white designs — stripes, polka dots, hearts, and florals. Perfect for succulents and small plants.",
    price: BigInt(17900),
    category: "Planters",
    imageUrl: "/assets/generated/pastel-planters-pack6.dim_600x500.png",
    tags: ["Handmade", "Planters", "Sustainable"],
    inStock: true,
  },
  {
    id: BigInt(9004),
    name: "Ceramic Ring Dish — Evil Eye",
    description:
      "Handcrafted ceramic ring dish with a stunning cobalt blue evil eye design. A beautiful and protective spot for your jewellery.",
    price: BigInt(14900),
    category: "Decor",
    imageUrl: "/assets/uploads/Screenshot-2026-03-01-145905-1-1.png",
    tags: ["Handmade", "Decor", "Sustainable"],
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
