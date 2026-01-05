// models/Calculation.js
import mongoose from 'mongoose'

const CalculationSchema = new mongoose.Schema({
  saldoActual: {
    type: Number,
    required: [true, 'El saldo actual es obligatorio']
  },
  inversionInicial: {
    type: Number,
    required: [true, 'La inversión inicial es obligatoria']
  },
  porcentajeGanancia: {
    type: Number,
    required: [true, 'El porcentaje de ganancia es obligatorio']
  },
  gananciaEsperada: {
    type: Number,
    required: [true, 'La ganancia esperada es obligatoria']
  },
  valorDolar: {
    type: Number,
    required: [true, 'El valor del dólar es obligatorio']
  },
  resultados: {
    type: Array,
    required: true,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Si el modelo ya existe, lo usa; si no, lo crea.
const Calculation = mongoose.models.Calculation || mongoose.model('Calculation', CalculationSchema)

export default Calculation
