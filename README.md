# Parking Pro

Сучасна система онлайн-бронювання паркомісць. Зручно, швидко та надійно.

> **Демо:** [https://parking-pro.vercel.app](https://your-app.vercel.app) *(після деплойменту)*

## Скріншоти

- Головна сторінка з hero
- Сторінка з доступними паркомісцями
- Dashboard (адмін-панель)
- Форма бронювання / деталі місця
- Сторінка профілю

*(Додайте скріншоти після деплойменту)*

## Можливості

- 🔐 Аутентифікація та реєстрація (NextAuth.js)
- 👥 RBAC — ролі user та admin з обмеженням доступу
- 🅿️ CRUD паркомісць з валідацією
- 📍 Фільтрація, пошук, бронювання
- 🎨 Сучасні форми (React Hook Form + Zod)
- 🛡️ Безпечна робота з даними (Mongoose + серверна валідація)
- 🚀 Production-ready (SEO, OG, sitemap, robots.txt)

## Технологічний стек

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS
- **Backend:** Next.js API Routes
- **Автентифікація:** NextAuth.js + Credentials
- **База даних:** MongoDB Atlas + Mongoose
- **Форми:** React Hook Form + Zod
- **Нотифікації:** Sonner
- **Деплой:** Vercel

## Локальний запуск

```bash
git clone <your-repo-url>
cd parking-pro
npm install
cp .env.local.example .env.local
# Заповніть змінні в .env.local
npm run dev