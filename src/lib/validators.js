export const validateCalculatorForm = (formValues) => {
  const newErrors = {}

  const saldo = parseFloat(formValues.saldoActual)
  const inversion = parseFloat(formValues.inversionInicial)
  const porcentaje = parseFloat(formValues.porcentajeGanancia)
  const ganancia = parseFloat(formValues.gananciaEsperada)

  // --- Saldo actual ---
  if (isNaN(saldo) || saldo < 1) {
    newErrors.saldoActual = 'Saldo mínimo $1'
  }

  // --- Inversión inicial ---
  if (isNaN(inversion) || inversion < 1) {
    newErrors.inversionInicial = 'Inversión mínima $1'
  } else if (!isNaN(saldo) && inversion > saldo) {
    newErrors.inversionInicial = 'No puede superar el saldo'
  }

  // --- Porcentaje broker ---
  if (isNaN(porcentaje)) {
    newErrors.porcentajeGanancia = 'Campo obligatorio'
  } else if (porcentaje < 50 || porcentaje > 99) {
    newErrors.porcentajeGanancia = 'Rango 50% - 99%'
  }

  // --- Ganancia esperada ---
  if (isNaN(ganancia) || ganancia < 0) {
    newErrors.gananciaEsperada = 'Mínimo $0'
  }

  return newErrors
}
