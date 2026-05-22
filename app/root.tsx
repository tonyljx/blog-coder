import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";

export function links() {
  return [
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap",
    },
  ];
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="font-sans antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-display bg-theme-bg">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let title = "Page not found";
  let detail = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "Page not found" : "Request failed";
    detail = error.statusText || detail;
  } else if (error instanceof Error) {
    detail = error.message;
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-20">
      <p className="text-foreground/40 font-mono text-sm tracking-wide uppercase">
        Error — {new Date().toISOString().slice(0, 10)}
      </p>
      <h1 className="text-foreground text-2xl font-medium tracking-tight">
        {title}
      </h1>
      <p className="text-foreground/70">{detail}</p>
      <Link
        to="/"
        viewTransition
        className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
      >
        Back to home
      </Link>
    </div>
  );
}
