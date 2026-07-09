import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Parking Pro",
    template: "%s | Parking Pro",
  },
  description: "Система онлайн-бронювання паркомісць. Зручно, швидко та надійно.",
  keywords: ["паркінг", "бронювання", "паркомісця", "автостоянка"],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: "Parking Pro",
    title: "Parking Pro",
    description: "Система онлайн-бронювання паркомісць. Зручно, швидко та надійно.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Parking Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parking Pro",
    description: "Система онлайн-бронювання паркомісць. Зручно, швидко та надійно.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </FavoritesProvider>
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}