'use client'
import { useFavorites } from '@/contexts/FavoritesContext'

export default function FavoriteButton({ spotId }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const liked = isFavorite(spotId)

  return (
    <button
      onClick={() => toggleFavorite(spotId)}
      className="text-2xl transition hover:scale-110 active:scale-90 cursor-pointer"
      title={liked ? 'Видалити з обраного' : 'Додати до обраного'}
    >
      {liked ? '❤️' : '🤍'}
    </button>
  )
}