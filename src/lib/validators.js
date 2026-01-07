export const validateCalculatorForm = (formValues) => {
  const newErrors = {}
  const saldo = parseFloat(formValues.saldoActual)
  const inversion = parseFloat(formValues.inversionInicial)

  if (inversion < 1) newErrors.inversionInicial = 'Mínimo $1.00'
  if (inversion > saldo) newErrors.inversionInicial = 'No puede superar el saldo'

  return newErrors
}
