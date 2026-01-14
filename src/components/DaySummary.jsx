'use client'

export default function DaySummary({ date, sessions }) {
  if (!sessions || sessions.length === 0) return null

  // ───── Utils ─────
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

  const sessionDuration = (start, end) => {
    const diff = toMinutes(end) - toMinutes(start)
    if (diff <= 0) return null
    const h = Math.floor(diff / 60)
    const m = diff % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const formatMoney = (n) => `$${Number(n).toLocaleString(undefined, { minimumFractionDigits: 2 })}`

  // ───── Orden ─────
  const ordered = [...sessions].sort((a, b) => toMinutes(b.horaInicio) - toMinutes(a.horaInicio))

  const firstSession = ordered[ordered.length - 1]
  const lastSession = ordered[0]

  const totalPnL = ordered.reduce((acc, s) => acc + parseFloat(s.pnl), 0)
  const firstSaldo = parseFloat(firstSession.saldoInicial)
  const lastSaldo = parseFloat(lastSession.saldoFinal)

  const dayIsPositive = totalPnL > 0
  const dayIsNegative = totalPnL < 0

  // ───── Fecha larga ─────
  const [y, m, d] = date.split('-').map(Number)
  const localDate = new Date(y, m - 1, d)

  const formattedDate = localDate.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

  return (
    <div className='bg-[#0d1117] border border-slate-800 rounded-2xl p-4 space-y-4'>
      {/* ───── Header ───── */}
      <div className='text-center text-xs text-slate-400 tracking-widest'>{capitalizedDate}</div>

      {/* ───── Summary cards ───── */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-xs'>
        <SummaryCard label='Sesiones'>
          <div className='flex items-center justify-center gap-2'>
            <span>{sessions.length}</span>
            <span
              className={`w-2 h-2 rounded-full ${
                dayIsPositive ? 'bg-emerald-400' : dayIsNegative ? 'bg-rose-400' : 'bg-slate-400'
              }`}
            />
          </div>
        </SummaryCard>

        <SummaryCard label='Gan/Per' valueClass={totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
          {totalPnL >= 0 ? '+' : ''}
          {formatMoney(totalPnL)}
        </SummaryCard>

        <SummaryCard label='Saldo inicial'>{formatMoney(firstSaldo)}</SummaryCard>

        <SummaryCard label='Saldo final' valueClass={lastSaldo >= firstSaldo ? 'text-emerald-200' : 'text-rose-200'}>
          {formatMoney(lastSaldo)}
        </SummaryCard>
      </div>

      {/* ───── Sessions list ───── */}
      <div className='space-y-2'>
        {ordered.map((s) => {
          const pnl = parseFloat(s.pnl)
          const saldoIni = parseFloat(s.saldoInicial)
          const saldoFin = parseFloat(s.saldoFinal)
          const duration = sessionDuration(s.horaInicio, s.horaFin)

          return (
            <div key={s.id} className='bg-[#161b26] border border-slate-800 rounded-lg px-3 py-2 text-xs space-y-1'>
              {/* Fila superior */}
              <div className='flex justify-between items-center'>
                <span className='text-slate-400'>
                  {s.horaInicio} – {s.horaFin}
                </span>

                <span className={`font-mono ${pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pnl >= 0 ? '+' : ''}
                  {formatMoney(pnl)}
                </span>
              </div>

              {/* Fila inferior */}
              <div className='flex justify-between text-[10px] text-slate-500'>
                <span>
                  {formatMoney(saldoIni)} → {formatMoney(saldoFin)}
                </span>
                {duration && <span>{duration}</span>}
              </div>
            </div>
          )
        })}
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
