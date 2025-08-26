import { CartProvider } from "../context/CardContext";
import { ClientProviders } from "@/app/providers/ClientProviders";
import CartDrawer from "../components/Ebooks/CartDrawer";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "PubStack | Creator Platform with Crypto Payments",
  description: "Web2-like experience with gasless USDC payments for authors and creators",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" className={`${inter.variable} font-serif`}>
      <body className="min-h-screen bg-white text-dune-900 antialiased">
        <ClientProviders>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
       
              <main className="flex-1">
                {children}
                 <CartDrawer />
              </main>
            </div>
          </CartProvider>      
        </ClientProviders>
      </body>
    </html>
  );
}