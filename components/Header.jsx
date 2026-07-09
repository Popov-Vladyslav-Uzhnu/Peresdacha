import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white py-5">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Parking Pro</Link>
        
        <nav className="flex gap-10 text-lg">
          <Link href="/" className="hover:text-blue-400 transition">Головна</Link>
          <Link href="/about" className="hover:text-blue-400 transition">Про проект</Link>
          <Link href="#" className="hover:text-blue-400 transition">Паркомісця</Link>
          <Link href="#" className="hover:text-blue-400 transition">Мої бронювання</Link>
        </nav>

        <Link 
          href="#" 
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition"
        >
          Увійти
        </Link>
      </div>
    </header>
  );
}