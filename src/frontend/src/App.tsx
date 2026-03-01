import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./components/CartContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Products from "./pages/Products";
import Shop from "./pages/Shop";
import { RouterProvider, useRouter } from "./router";

function AppRoutes() {
  const { path } = useRouter();

  const renderPage = () => {
    switch (path) {
      case "/about":
        return <About />;
      case "/products":
        return <Products />;
      case "/shop":
        return <Shop />;
      case "/portfolio":
        return <Portfolio />;
      case "/contact":
        return <Contact />;
      case "/cart":
        return <Cart />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">{renderPage()}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <AppRoutes />
        <Toaster richColors position="bottom-right" />
      </CartProvider>
    </RouterProvider>
  );
}
