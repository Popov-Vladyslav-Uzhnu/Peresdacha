export const metadata = {
  title: "Про нас",
  description: "Інформація про Parking Pro — сучасну систему бронювання паркомісць.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Про Parking Pro</h1>
        <p className="text-lg text-gray-700 mb-6">
          Parking Pro — сучасна система онлайн-бронювання паркомісць, яка допомагає водіям швидко знаходити та резервувати місця.
        </p>
        <p className="text-lg text-gray-700">
          Ми використовуємо передові технології Next.js, MongoDB та NextAuth для забезпечення зручності та безпеки.
        </p>
      </div>
    </div>
  );
}