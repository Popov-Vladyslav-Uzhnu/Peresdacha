'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Огляд" },
  { href: "/dashboard/spots", label: "Паркомісця" },
  { href: "/dashboard/reservations", label: "Бронювання" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 text-white h-screen w-64 p-6 fixed">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Адмін-панель</h2>
      </div>
      <ul className="space-y-2">
        {links.map((link) => {
          const isActive = link.href === "/dashboard" 
            ? pathname === "/dashboard" 
            : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-4 py-3 rounded transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-300 hover:bg-slate-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}