export const metadata = {
  title: "Меню",
  description: "Доступні паркомісця та актуальні ціни.",
};

import MenuFilter from "@/components/MenuFilter";

export default function MenuPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Доступні паркомісця</h1>
          <p className="text-lg opacity-90">Оберіть зручне місце для вашого авто</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <MenuFilter />
        </div>
      </section>
    </div>
  );
}