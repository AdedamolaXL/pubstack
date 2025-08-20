import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "../context/CardContext";
import "@/app/globals.css"; 
import { ClientProviders } from "@/app/providers/ClientProviders";

const inter = Inter({
  subsets: ["cyrillic"],
});


export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <ClientProviders>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </CartProvider>      
        </ClientProviders>
      </body>
    </html>
  );
}