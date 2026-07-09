import { StatSkeleton } from '@/components/skeletons/PostSkeleton'

export default function Loading() {
  return (
    <div className="p-8">
      <div className="h-10 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>

      <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
      <div className="bg-white rounded-lg shadow">
        {/* Table skeleton placeholder */}
        <div className="h-96 bg-gray-100 rounded animate-pulse"></div>
      </div>
    </div>
  )
}