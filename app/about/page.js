export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Про проект Parking Pro
        </h1>
        
        <p className="text-lg text-gray-700 mb-6">
          Parking Pro — це повнофункціональна система управління паркінгом (Варіант 11). 
          Вона призначена для водіїв та адміністраторів автостоянок.
        </p>
        
        <p className="text-lg text-gray-700 mb-6">
          Система вирішує проблему черг, ручного бронювання та неефективного використання паркомісць. 
          Водії можуть швидко забронювати місце, а адміністратори — керувати всім процесом.
        </p>

        <p className="text-lg text-gray-700">
          Використовуються сучасні технології: Next.js 14 (App Router), Tailwind CSS, 
          MongoDB + Mongoose, авторизація через NextAuth.js.
        </p>
      </div>
    </div>
  )
}