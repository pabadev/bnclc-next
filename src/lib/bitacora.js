export const saveSesion = (bitacoraForm, sesiones, hoyStr) => {
  const pnl = parseFloat(bitacoraForm.saldoFinal) - parseFloat(bitacoraForm.saldoInicial)

  const timestampFinNueva = new Date(`${bitacoraForm.fecha}T${bitacoraForm.horaFin}`).getTime()

  const nuevaSesion = { ...bitacoraForm, id: Date.now(), pnl: pnl.toFixed(2), timestampFin: timestampFinNueva }

  const esLaMasReciente = sesiones.length === 0 || timestampFinNueva > Math.max(...sesiones.map((s) => s.timestampFin))

  const nuevasSesiones = [...sesiones, nuevaSesion].sort((a, b) => b.timestampFin - a.timestampFin)

  const nuevoSaldoGlobal = esLaMasReciente ? bitacoraForm.saldoFinal : null

  return { nuevasSesiones, nuevoSaldoGlobal }
}
