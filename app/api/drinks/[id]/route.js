import dbConnect from '@/lib/db'
import Spot from '@/lib/models/Spot'

// GET /api/drinks/[id]
export async function GET(request, { params }) {
  await dbConnect()
  const { id } = await params

  try {
    const spot = await Spot.findById(id)

    if (!spot) {
      return Response.json({ error: 'Паркомісце не знайдено' }, { status: 404 })
    }

    return Response.json(spot)
  } catch (error) {
    return Response.json({ error: 'Невалідний ID' }, { status: 400 })
  }
}

// PUT /api/drinks/[id]
export async function PUT(request, { params }) {
  await dbConnect()
  const { id } = await params

  try {
    const body = await request.json()
    const spot = await Spot.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!spot) {
      return Response.json({ error: 'Паркомісце не знайдено' }, { status: 404 })
    }

    return Response.json(spot)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return Response.json({ errors: messages }, { status: 400 })
    }
    return Response.json({ error: 'Помилка сервера' }, { status: 500 })
  }
}

// DELETE /api/drinks/[id]
export async function DELETE(request, { params }) {
  await dbConnect()
  const { id } = await params

  try {
    const spot = await Spot.findByIdAndDelete(id)

    if (!spot) {
      return Response.json({ error: 'Паркомісце не знайдено' }, { status: 404 })
    }

    return Response.json({
      message: `Паркомісце ${spot.number} видалено`
    })
  } catch (error) {
    return Response.json({ error: 'Невалідний ID' }, { status: 400 })
  }
}