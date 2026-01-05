// lib/calculations.js

export const calcularInversiones = (
  saldoActual,
  inversionInicial,
  porcentajeGanancia,
  gananciaEsperada,
  valorDolar
) => {
  const saldoNum = parseFloat(saldoActual)
  const inversionIniNum = parseFloat(inversionInicial)
  const porcentajeNum = parseFloat(porcentajeGanancia)
  const gananciaEspNum = parseFloat(gananciaEsperada)
  const dolarNum = parseFloat(valorDolar)

  let inversiones = []
  let acumulado = 0

  // Bucle dinámico (máximo 20 para evitar bucles infinitos, pero corta con el saldo)
  for (let i = 0; i < 20; i++) {
    let inversion = i === 0 ? inversionIniNum : (acumulado + gananciaEspNum) / (porcentajeNum / 100)

    let ganancia = inversion * (porcentajeNum / 100)
    let siguienteAcumulado = acumulado + inversion

    // SI LA INVERSIÓN EXCEDE EL SALDO, PARAMOS
    if (siguienteAcumulado > saldoNum) {
      // Guardamos cuánto faltaría para esta inversión que no se pudo hacer
      const saldoFaltante = (siguienteAcumulado - saldoNum).toFixed(2)
      const saldoSobrante = (saldoNum - acumulado).toFixed(2)

      return {
        inversiones,
        saldoFaltante,
        saldoSobrante,
        counter: inversiones.length
      }
    }

    acumulado = siguienteAcumulado

    inversiones.push({
      numero: i + 1,
      inversion: inversion.toFixed(2),
      porcentaje: porcentajeNum.toFixed(2),
      ganancia: ganancia.toFixed(2),
      acumulado: acumulado.toFixed(2),
      enPesos: (acumulado * dolarNum).toFixed(2)
    })
  }

  return {
    inversiones,
    saldoFaltante: 0,
    saldoSobrante: (saldoNum - acumulado).toFixed(2),
    counter: inversiones.length
  }
}
