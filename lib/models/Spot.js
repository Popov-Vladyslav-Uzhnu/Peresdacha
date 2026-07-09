import mongoose from 'mongoose'

const spotSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Номер паркомісця обов\'язковий'],
    trim: true,
    unique: true,
  },
  zone: {
    type: String,
    required: [true, 'Зона обов\'язкова'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['standard', 'electric', 'disabled', 'premium'],
    default: 'standard',
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Ціна за годину обов\'язкова'],
    min: [0, 'Ціна не може бути від\'ємною'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

export default mongoose.models.Spot || mongoose.model('Spot', spotSchema)