export const metadata = {
  title: "Контакти",
  description: "Зв'яжіться з адміністрацією паркінгу",
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-slate-800 to-slate-950 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Контакти</h1>
          <p className="text-lg opacity-90">Адміністрація паркінгу Parking Pro</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Наші контакти</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📍</span>
                  <div>
                    <p className="font-semibold">Адреса</p>
                    <p className="text-gray-600">вул. Центральна, 15, Мукачево</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📞</span>
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-gray-600">+380 66 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🕒</span>
                  <div>
                    <p className="font-semibold">Графік роботи</p>
                    <p className="text-gray-600">24/7 (цілодобово)</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Напишіть нам</h2>
              <div className="bg-gray-50 p-8 rounded-xl">
                <p className="text-gray-600">
                  Форма зворотного зв'язку буде додана пізніше (тиждень 12).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}