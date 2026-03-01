import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Route =
  | "/"
  | "/about"
  | "/products"
  | "/shop"
  | "/portfolio"
  | "/contact"
  | "/cart";

interface RouterContextValue {
  path: Route;
  navigate: (to: Route) => void;
}

const RouterContext = createContext<RouterContextValue>({
  path: "/",
  navigate: () => {},
});

function parseHash(): Route {
  const hash = window.location.hash.replace("#", "");
  return (hash as Route) || "/";
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<Route>(parseHash);

  useEffect(() => {
    const handler = () => setPath(parseHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback((to: Route) => {
    window.location.hash = to;
    setPath(to);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function useLocation() {
  const { path } = useRouter();
  return { pathname: path };
}

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export function Link({
  to,
  children,
  className,
  onClick,
  target,
  rel,
}: LinkProps) {
  const { navigate } = useRouter();

  const isExternal =
    to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel");

  if (isExternal) {
    return (
      <a
        href={to}
        className={className}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to as Route);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
