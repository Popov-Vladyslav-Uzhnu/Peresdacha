import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

Завдання: Оновити metadata в layout.js
Додайте шаблон title у app/layout.js:

app/layout.js — оновити metadata
export const metadata = {
  title: {
    default: "Кав'ярня «Кофеїн»",
    template: "%s | Кофеїн",
  },
  description: "Найкраща кава у місті.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}