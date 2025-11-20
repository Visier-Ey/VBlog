import { Outlet,
  Scripts, ScrollRestoration, useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/root";
import * as React from "react";
import "./app.css";


// ------- Auth Provider (SSR-safe) -------
function AuthProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isLoginPage = location.pathname === "/login";

    if (!isLoggedIn && !isLoginPage) {
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  return <>{children}</>;
}

// ------- App Layout -------
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// ------- App Root -------
export default function App() {
  return (
    <Layout>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </Layout>
  );
}

// ------- Error Boundary -------
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Error</h1>
      <p>{error instanceof Error ? error.message : "Unknown error"}</p>
    </div>
  );
}
