import ClientToastContainer from "@/components/ClientToastContainer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import "@/lib/errorHandler"; // Initialize global error handler
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kombee Storefront",
  description: "Built with Next.js, TypeScript and Apollo GraphQL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen font-sans overflow-x-hidden flex flex-col min-h-screen">
        <ErrorBoundary>
          <Providers>
            <CartProvider>
              <ToastProvider>
                <header>
                  <Navbar />
                </header>
                <main className="pt-20 flex-1">{children}</main>
                <footer className="w-full text-center py-6 text-gray-400 border-t border-white/10 mt-12">
                  &copy; {new Date().getFullYear()} Kombee Storefront. Built
                  with Next.js, TypeScript, and Apollo GraphQL.
                </footer>
                <ClientToastContainer />
              </ToastProvider>
            </CartProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
