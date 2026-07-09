'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/parking", label: "Паркомісця" },
  { href: "/menu", label: "Меню" },
  { href: "/about", label: "Про проект" },
  { href: "/contact", label: "Контакти" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-slate-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-blue-400 transition">
          Parking Pro
        </Link>
        <nav>
          <ul className="flex gap-6">
            {navLinks.map((link) => {
              const isActive = 
                link.href === "/" 
                  ? pathname === "/" 
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition ${
                      isActive 
                        ? "text-blue-400 font-semibold" 
                        : "hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}