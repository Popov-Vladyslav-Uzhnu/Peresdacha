import { NextResponse } from 'next/server'
import { parkingSpots, addSpot } from '@/lib/data'

// GET /api/drinks — список паркомісць з фільтрацією
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const zone = searchParams.get('zone')
  const type = searchParams.get('type')
  const search = searchParams.get('search')

  let result = [...parkingSpots]

  if (zone && zone !== 'Всі') {
    result = result.filter(spot => spot.zone === zone)
  }

  if (type) {
    result = result.filter(spot => spot.type === type)
  }

  if (search) {
    result = result.filter(spot =>
      spot.number.toLowerCase().includes(search.toLowerCase())
    )
  }

  return NextResponse.json(result)
}

// POST /api/drinks — створення нового паркомісця
export async function POST(request) {
  try {
    const body = await request.json()

    if (!body.number || !body.zone || !body.pricePerHour) {
      return NextResponse.json(
        { error: 'Поля number, zone та pricePerHour є обов\'язковими' },
        { status: 400 }
      )
    }

    const newSpot = addSpot(body)
    return NextResponse.json(newSpot, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Невалідний JSON' },
      { status: 400 }
    )
  }
}