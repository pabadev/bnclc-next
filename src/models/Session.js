import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    fecha: {
      type: Date,
      required: true
    },
    horaInicio: {
      type: String,
      required: true
    },
    horaFin: {
      type: String,
      required: true
    },
    saldoInicial: {
      type: Number,
      required: true
    },
    saldoFinal: {
      type: Number,
      required: true
    },
    pnl: {
      type: Number,
      default: 0
    },
    notas: {
      type: String,
      default: ''
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

// Índice para búsquedas por usuario y fecha
sessionSchema.index({ userId: 1, fecha: -1 })

// Evitar recrear el modelo si ya existe
export default mongoose.models.Session || mongoose.model('Session', sessionSchema)
