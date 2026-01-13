'use client'

export default function DaySummary({ date, sessions }) {
  if (!sessions || sessions.length === 0) return null

  // 1. Función para convertir "09:26 p. m." a minutos totales del día
  const toMinutes = (timeStr) => {
    const match = timeStr.match(/(\d+):(\d+)\s*([ap])/i)
    if (!match) return 0
    let [, hours, minutes, period] = match
    let h = parseInt(hours, 10)
    let m = parseInt(minutes, 10)
    if (period.toLowerCase() === 'p' && h !== 12) h += 12
    if (period.toLowerCase() === 'a' && h === 12) h = 0
    return h * 60 + m
  }

  // 2. Ordenamos de forma DESCENDENTE (más tarde arriba)
  const ordered = [...sessions].sort((a, b) => toMinutes(b.horaInicio) - toMinutes(a.horaInicio))

  // 3. Para los cálculos de balance, necesitamos el primero y último cronológicamente
  // Como 'ordered' está al revés, el primero del día es el último del array y viceversa
  const firstSession = ordered[ordered.length - 1]
  const lastSession = ordered[0]

  const totalPnL = ordered.reduce((acc, s) => acc + parseFloat(s.pnl), 0)
  const firstSaldo = parseFloat(firstSession.saldoInicial)
  const lastSaldo = parseFloat(lastSession.saldoFinal)
  const balanceDiff = lastSaldo - firstSaldo

  const dayResult = totalPnL > 0 ? 'Día positivo' : totalPnL < 0 ? 'Día negativo' : 'Break-even'

  const formatMoney = (n) => `${n >= 0 ? '+' : ''}$${n.toLocaleString(undefined, { minimumFractionDigits: 2 })}`

  return (
    <div className='bg-[#0d1117] border border-slate-800 rounded-2xl p-4 space-y-4'>
      {/* ───── Header ───── */}
      <div className='text-center text-xs text-slate-400 tracking-widest'>{date.split('-').reverse().join('-')}</div>

      {/* ───── Summary cards ───── */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-xs'>
        <SummaryCard label='Sesiones'>{sessions.length}</SummaryCard>

        <SummaryCard label='PnL del día' valueClass={totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
          {formatMoney(totalPnL)}
        </SummaryCard>

        <SummaryCard
          label='Resultado'
          valueClass={totalPnL > 0 ? 'text-emerald-400' : totalPnL < 0 ? 'text-rose-400' : 'text-slate-400'}>
          {dayResult}
        </SummaryCard>

        <SummaryCard label='Balance' valueClass={balanceDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
          {formatMoney(balanceDiff)}
        </SummaryCard>
      </div>

      {/* ───── Sessions list (Orden descendente) ───── */}
      <div className='space-y-2'>
        {ordered.map((s) => (
          <div
            key={s.id}
            className='flex justify-between items-center text-xs bg-[#161b26] border border-slate-800 rounded-lg px-3 py-2'>
            <span className='text-slate-400'>
              {s.horaInicio} – {s.horaFin}
            </span>

            <span className={`font-mono ${parseFloat(s.pnl) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatMoney(parseFloat(s.pnl))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SummaryCard({ label, children, valueClass = '' }) {
  return (
    <div className='bg-[#161b26] border border-slate-800 rounded-xl p-3 text-center'>
      <div className='text-[10px] text-slate-400 uppercase tracking-wider'>{label}</div>
      <div className={`mt-1 font-semibold ${valueClass}`}>{children}</div>
    </div>
  )
}
