import dbConnect from '@/lib/db'
import Spot from '@/lib/models/Spot'

const initialSpots = [
  {
    number: 'A-101',
    zone: 'A',
    type: 'standard',
    pricePerHour: 50,
    isAvailable: true,
  },
  {
    number: 'B-205',
    zone: 'B',
    type: 'electric',
    pricePerHour: 70,
    isAvailable: true,
  },
  {
    number: 'VIP-01',
    zone: 'VIP',
    type: 'disabled',
    pricePerHour: 120,
    isAvailable: false,
  },
  {
    number: 'C-312',
    zone: 'C',
    type: 'standard',
    pricePerHour: 45,
    isAvailable: true,
  },
  {
    number: 'A-105',
    zone: 'A',
    type: 'electric',
    pricePerHour: 75,
    isAvailable: false,
  },
  {
    number: 'D-401',
    zone: 'D',
    type: 'standard',
    pricePerHour: 55,
    isAvailable: true,
  },
  {
    number: 'VIP-02',
    zone: 'VIP',
    type: 'disabled',
    pricePerHour: 130,
    isAvailable: true,
  },
  {
    number: 'B-210',
    zone: 'B',
    type: 'electric',
    pricePerHour: 80,
    isAvailable: true,
  },
]

export async function GET() {
  try {
    await dbConnect()

    await Spot.deleteMany({})

    const spots = await Spot.create(initialSpots)

    return Response.json({
      message: `Базу наповнено: ${spots.length} паркомісць`,
      spots,
    })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}