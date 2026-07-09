export const revalidate = 10

export default async function RevalidatedPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/2')
  const post = await response.json()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Revalidated пост (кожні 10 сек)</h1>
      
      <div className="bg-green-50 p-4 rounded mb-4">
        <p className="text-sm text-green-800">
          <strong>Production:</strong> Оновлюється кожні 10 секунд. Почекай і онови сторінку.
        </p>
        <p className="text-sm text-green-800 mt-1">
          <strong>Dev-режим:</strong> В dev revalidation не працює — час оновлюється завжди.
        </p>
      </div>

      <article className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700">{post.body}</p>
        <p className="text-sm text-gray-500 mt-4">
          Завантажено: {new Date().toLocaleTimeString()}
        </p>
      </article>
    </div>
  )
}