import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-8xl mb-6">🅿️</div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">
          Ой! Такого паркомісця або сторінки не існує.
        </p>
        <Link
          href="/"
          className="bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-slate-800 transition inline-block"
        >
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}