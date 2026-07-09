import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Parking Pro",
    template: "%s | Parking Pro",
  },
  description: "Система онлайн-бронювання паркомісць — Варіант 11",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <FavoritesProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}