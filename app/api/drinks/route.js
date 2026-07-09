import dbConnect from '@/lib/db'
import Spot from '@/lib/models/Spot'

// GET /api/drinks
export async function GET(request) {
  await dbConnect()

  const { searchParams } = new URL(request.url)
  const zone = searchParams.get('zone')
  const type = searchParams.get('type')
  const search = searchParams.get('search')

  const filter = {}
  if (zone && zone !== 'Всі') filter.zone = zone
  if (type) filter.type = type
  if (search) filter.number = { $regex: search, $options: 'i' }

  const spots = await Spot.find(filter).sort({ createdAt: -1 })

  return Response.json({
    count: spots.length,
    spots,
  })
}

// POST /api/drinks
export async function POST(request) {
  await dbConnect()

  try {
    const body = await request.json()
    const spot = await Spot.create(body)

    return Response.json(spot, { status: 201 })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return Response.json({ errors: messages }, { status: 400 })
    }

    return Response.json({ error: 'Помилка сервера' }, { status: 500 })
  }
}