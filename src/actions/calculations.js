// app/actions/calculations.js
'use server' // Indica que todo este archivo se ejecuta solo en el servidor

import dbConnect from '@/lib/mongodb'
import Calculation from '@/models/Calculation'
import { calcularInversiones } from '@/lib/calculations'
import { revalidatePath } from 'next/cache'

export async function createCalculationAction(formData) {
  console.log('¡Acción recibida!', formData.get('saldoActual'))
  try {
    await dbConnect()

    // 1. Extraer datos del FormData (los nombres deben coincidir con los 'name' de tus inputs)
    const rawData = {
      saldoActual: parseFloat(formData.get('saldoActual')),
      inversionInicial: parseFloat(formData.get('inversionInicial')),
      porcentajeGanancia: parseFloat(formData.get('porcentajeGanancia')),
      gananciaEsperada: parseFloat(formData.get('gananciaEsperada')),
      valorDolar: parseFloat(formData.get('valorDolar')) || 1
    }

    // 2. Ejecutar tu lógica matemática (Versión 2 Dinámica)
    const { inversiones, saldoFaltante, saldoSobrante, counter } = calcularInversiones(
      rawData.saldoActual,
      rawData.inversionInicial,
      rawData.porcentajeGanancia,
      rawData.gananciaEsperada,
      rawData.valorDolar
    )

    // 3. Guardar en MongoDB
    const newCalculation = new Calculation({
      ...rawData,
      resultados: inversiones // Guardamos el array de operaciones
    })

    await newCalculation.save()

    // Convertimos el documento de Mongoose a un objeto plano de JS
    const plainCalculation = JSON.parse(JSON.stringify(newCalculation))

    // 4. Limpiar el caché de la página para mostrar datos frescos
    revalidatePath('/')

    return {
      success: true,
      data: { ...plainCalculation, saldoFaltante, saldoSobrante, counter }
    }
  } catch (error) {
    console.error('Error en el Server Action:', error)
    return { success: false, error: 'Error al procesar el cálculo' }
  }
}
