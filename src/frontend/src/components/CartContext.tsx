import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { CartItem } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { FRONTEND_PRODUCTS } from "../hooks/useQueries";
import { getSessionId } from "../utils/helpers";

// IDs of products that only exist in the frontend (not persisted in the backend)
const FRONTEND_ONLY_IDS = new Set(
  FRONTEND_PRODUCTS.map((p) => p.id.toString()),
);
const LOCAL_CART_KEY = "seetha_local_cart";

interface LocalCartItem {
  productId: string; // stored as string because JSON can't serialise BigInt
  quantity: number;
}

function readLocalCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_CART_KEY);
    if (!raw) return [];
    const items: LocalCartItem[] = JSON.parse(raw);
    return items.map((i) => ({
      productId: BigInt(i.productId),
      quantity: BigInt(i.quantity),
    }));
  } catch {
    return [];
  }
}

function writeLocalCart(items: CartItem[]): void {
  const serialisable: LocalCartItem[] = items.map((i) => ({
    productId: i.productId.toString(),
    quantity: Number(i.quantity),
  }));
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(serialisable));
}

interface CartContextValue {
  cartItems: CartItem[];
  cartCount: number;
  isLoading: boolean;
  addToCart: (productId: bigint, quantity?: bigint) => Promise<void>;
  removeFromCart: (productId: bigint) => Promise<void>;
  updateQuantity: (productId: bigint, quantity: bigint) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [sessionId] = useState(() => getSessionId());
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>(() =>
    readLocalCart(),
  );

  const { data: backendCartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["cart", sessionId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart(sessionId);
    },
    enabled: !!actor && !isFetching,
  });

  // Merge backend + local-only items
  const cartItems: CartItem[] = [
    ...backendCartItems,
    ...localCartItems.filter(
      (li) =>
        !backendCartItems.some(
          (bi) => bi.productId.toString() === li.productId.toString(),
        ),
    ),
  ];

  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  const invalidateCart = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
  }, [queryClient, sessionId]);

  // ── local cart helpers ───────────────────────────────────────────────────
  const addToLocalCart = useCallback((productId: bigint, quantity: bigint) => {
    setLocalCartItems((prev) => {
      const existing = prev.find(
        (i) => i.productId.toString() === productId.toString(),
      );
      const next = existing
        ? prev.map((i) =>
            i.productId.toString() === productId.toString()
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          )
        : [...prev, { productId, quantity }];
      writeLocalCart(next);
      return next;
    });
  }, []);

  const removeFromLocalCart = useCallback((productId: bigint) => {
    setLocalCartItems((prev) => {
      const next = prev.filter(
        (i) => i.productId.toString() !== productId.toString(),
      );
      writeLocalCart(next);
      return next;
    });
  }, []);

  const updateLocalCartQuantity = useCallback(
    (productId: bigint, quantity: bigint) => {
      setLocalCartItems((prev) => {
        const next = prev.map((i) =>
          i.productId.toString() === productId.toString()
            ? { ...i, quantity }
            : i,
        );
        writeLocalCart(next);
        return next;
      });
    },
    [],
  );

  const clearLocalCart = useCallback(() => {
    setLocalCartItems([]);
    localStorage.removeItem(LOCAL_CART_KEY);
  }, []);

  // ── backend mutations ────────────────────────────────────────────────────
  const addMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.addToCart(sessionId, productId, quantity);
    },
    onSuccess: invalidateCart,
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.removeFromCart(sessionId, productId);
    },
    onSuccess: invalidateCart,
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateCartQuantity(sessionId, productId, quantity);
    },
    onSuccess: invalidateCart,
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.clearCart(sessionId);
    },
    onSuccess: invalidateCart,
  });

  // ── public API ───────────────────────────────────────────────────────────
  const addToCart = useCallback(
    async (productId: bigint, quantity: bigint = BigInt(1)) => {
      if (FRONTEND_ONLY_IDS.has(productId.toString())) {
        addToLocalCart(productId, quantity);
      } else {
        await addMutation.mutateAsync({ productId, quantity });
      }
    },
    [addMutation, addToLocalCart],
  );

  const removeFromCart = useCallback(
    async (productId: bigint) => {
      if (FRONTEND_ONLY_IDS.has(productId.toString())) {
        removeFromLocalCart(productId);
      } else {
        await removeMutation.mutateAsync(productId);
      }
    },
    [removeMutation, removeFromLocalCart],
  );

  const updateQuantity = useCallback(
    async (productId: bigint, quantity: bigint) => {
      if (FRONTEND_ONLY_IDS.has(productId.toString())) {
        updateLocalCartQuantity(productId, quantity);
      } else {
        await updateMutation.mutateAsync({ productId, quantity });
      }
    },
    [updateMutation, updateLocalCartQuantity],
  );

  const clearCart = useCallback(async () => {
    await Promise.all([
      clearMutation.mutateAsync(),
      Promise.resolve(clearLocalCart()),
    ]);
  }, [clearMutation, clearLocalCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
