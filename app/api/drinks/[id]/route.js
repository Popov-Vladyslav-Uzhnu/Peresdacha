import { NextResponse } from 'next/server'
import { getSpotById, updateSpot, deleteSpot } from '@/lib/data'

// GET /api/drinks/[id] — одне паркомісце
export async function GET(request, { params }) {
  const { id } = await params
  const spot = getSpotById(id)

  if (!spot) {
    return NextResponse.json({ error: 'Паркомісце не знайдено' }, { status: 404 })
  }

  return NextResponse.json(spot)
}

// PUT /api/drinks/[id] — оновлення
export async function PUT(request, { params }) {
  const { id } = await params

  try {
    const body = await request.json()

    if (!body.number || !body.zone || !body.pricePerHour) {
      return NextResponse.json({ error: 'Поля number, zone та pricePerHour обов\'язкові' }, { status: 400 })
    }

    const updated = updateSpot(id, body)

    if (!updated) {
      return NextResponse.json({ error: 'Паркомісце не знайдено' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Невалідний JSON' }, { status: 400 })
  }
}

// DELETE /api/drinks/[id] — видалення
export async function DELETE(request, { params }) {
  const { id } = await params

  const deleted = deleteSpot(id)

  if (!deleted) {
    return NextResponse.json({ error: 'Паркомісце не знайдено' }, { status: 404 })
  }

  return NextResponse.json({
    message: `Паркомісце ${deleted.number} видалено`,
    deleted
  })
}