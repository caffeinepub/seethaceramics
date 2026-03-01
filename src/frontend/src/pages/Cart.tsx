import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Loader2,
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { Product } from "../backend.d";
import { useCart } from "../components/CartContext";
import { FRONTEND_PRODUCTS, useProducts } from "../hooks/useQueries";
import { Link } from "../router";
import { formatPrice, getProductImage, unwrapOptional } from "../utils/helpers";

export default function Cart() {
  const { cartItems, isLoading, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const { data: allProducts = [] } = useProducts();

  useEffect(() => {
    document.title = "Cart — SeethaCeramics";
  }, []);

  const getProduct = (productId: bigint): Product | undefined =>
    allProducts.find((p) => p.id === productId) ??
    FRONTEND_PRODUCTS.find((p) => p.id === productId);

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    if (!product) return sum;
    const price = unwrapOptional(product.discountPrice) ?? product.price;
    return sum + Number(price) * Number(item.quantity);
  }, 0);

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;
    const lines = cartItems
      .map((item) => {
        const product = getProduct(item.productId);
        if (!product) return null;
        const effectivePrice =
          unwrapOptional(product.discountPrice) ?? product.price;
        return `• ${product.name} x${item.quantity} — ${formatPrice(effectivePrice * item.quantity)}`;
      })
      .filter(Boolean);
    const text = `Hi SeethaCeramics! I'd like to order:\n\n${lines.join("\n")}\n\nTotal: ₹${(subtotal / 100).toFixed(0)}\n\nPlease confirm availability.`;
    window.open(
      `https://wa.me/917989215059?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <Skeleton className="h-8 w-48 mb-8 rounded" />
        <div className="space-y-4">
          {["c1", "c2", "c3"].map((sk) => (
            <div
              key={sk}
              className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
            >
              <Skeleton className="w-20 h-20 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-cream-dark flex items-center justify-center mx-auto">
            <ShoppingCart className="w-10 h-10 text-muted-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold mb-2">
              Your cart is empty.
            </h1>
            <p className="text-muted-foreground">Start shopping!</p>
          </div>
          <Button
            asChild
            className="bg-sage hover:bg-sage-dark text-white rounded-xl px-8"
          >
            <Link to="/products">Browse Products</Link>
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Back to products"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <h1 className="font-serif text-2xl font-bold">
              Your Cart ({cartItems.length})
            </h1>
          </div>
          <button
            type="button"
            onClick={handleClearCart}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear all
          </button>
        </div>

        {/* Cart items */}
        <div className="space-y-3">
          <AnimatePresence>
            {cartItems.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              const price =
                unwrapOptional(product.discountPrice) ?? product.price;
              const image = getProductImage(product);

              return (
                <motion.div
                  key={item.productId.toString()}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4 bg-card rounded-2xl p-4 border border-border shadow-xs"
                >
                  <img
                    src={image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-cream-dark"
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="font-serif font-semibold text-sm leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-sage-dark">
                        {formatPrice(price)}
                      </span>
                      {unwrapOptional(product.discountPrice) !== undefined && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (Number(item.quantity) > 1) {
                              updateQuantity(
                                item.productId,
                                BigInt(Number(item.quantity) - 1),
                              );
                            }
                          }}
                          disabled={Number(item.quantity) <= 1}
                          className="w-7 h-7 rounded-full flex items-center justify-center border border-border hover:bg-muted disabled:opacity-40 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">
                          {item.quantity.toString()}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              BigInt(Number(item.quantity) + 1),
                            )
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center border border-border hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      {/* Item total + remove */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-foreground">
                          {formatPrice(price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId)}
                          className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="bg-cream-dark rounded-2xl p-6 border border-border space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-bold text-foreground text-base">
              ₹{(subtotal / 100).toFixed(0)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Free delivery on orders over ₹999. Delivery charges may apply.
          </p>
          <Button
            onClick={handleWhatsAppOrder}
            className="w-full bg-sage hover:bg-sage-dark text-white rounded-xl h-12 text-base font-semibold shadow-sage"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Order via WhatsApp
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full rounded-xl border-border hover:bg-muted"
          >
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
