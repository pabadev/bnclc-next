export const calcularInversionesLocal = (
  saldoActual,
  inversionInicial,
  porcentajeGanancia,
  gananciaEsperada
) => {
  const saldoNum = parseFloat(saldoActual)
  const inversionIniNum = parseFloat(inversionInicial)
  const porcentajeNum = parseFloat(porcentajeGanancia)
  const gananciaEspNum = parseFloat(gananciaEsperada)

  let inversiones = []
  let acumulado = 0

  for (let i = 0; i < 20; i++) {
    let inversion = i === 0 ? inversionIniNum : (acumulado + gananciaEspNum) / (porcentajeNum / 100)

    let ganancia = inversion * (porcentajeNum / 100)
    let siguienteAcumulado = acumulado + inversion

    if (siguienteAcumulado > saldoNum) {
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
      acumulado: acumulado.toFixed(2)
    })
  }

  return {
    inversiones,
    saldoFaltante: '0.00',
    saldoSobrante: (saldoNum - acumulado).toFixed(2),
    counter: inversiones.length
  }
}
