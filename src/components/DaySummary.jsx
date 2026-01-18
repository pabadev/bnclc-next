'use client'

import { LaunchIcon } from '@/components/icons'

export default function DaySummary({ date, sessions }) {
  if (!sessions || sessions.length === 0) return null

  // ───── Utils ─────
  const toMinutes = (timeStr) => {
    if (!timeStr) return null

    const clean = timeStr.trim().toLowerCase()

    // 24h format HH:mm
    if (/^\d{1,2}:\d{2}$/.test(clean)) {
      const [h, m] = clean.split(':').map(Number)
      return h * 60 + m
    }

    // 12h format hh:mm am/pm
    const match = clean.match(/^(\d{1,2}):(\d{2})\s?(am|pm)$/)
    if (!match) return null

    let [, h, m, period] = match
    h = Number(h)
    m = Number(m)

    if (period === 'pm' && h !== 12) h += 12
    if (period === 'am' && h === 12) h = 0

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

  // ───── Navegación a sesión ─────
  const goToSession = (id) => {
    const el = document.getElementById(`session-${id}`)
    if (!el) return

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })

    // highlight temporal
    el.classList.add('ring-2', 'ring-cyan-400')
    setTimeout(() => {
      el.classList.remove('ring-2', 'ring-cyan-400')
    }, 1500)
  }

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
      <div className='text-center text-xs text-slate-300 tracking-widest'>{capitalizedDate}</div>

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
          {totalPnL >= 0 ? '+' : '-'}
          {formatMoney(totalPnL >= 0 ? totalPnL : totalPnL * -1)}
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
            <div key={s.id} className='bg-[#161b26] border border-slate-800 rounded-lg px-3 py-2 text-xs'>
              <div className='flex justify-between items-stretch gap-3'>
                {/* ───── Columna izquierda ───── */}
                <div className='flex flex-col justify-between'>
                  {/* Fila hora */}
                  <span className='text-slate-300'>
                    {s.horaInicio} – {s.horaFin}
                  </span>

                  {/* Fila saldo */}
                  <span className='text-[10px] text-slate-400'>
                    {formatMoney(saldoIni)} → {formatMoney(saldoFin)}
                  </span>

                  {duration && <span className='text-[10px] text-slate-400'>{duration}</span>}
                </div>

                {/* ───── Columna derecha (centrada verticalmente) ───── */}
                <div className='flex items-center gap-2'>
                  <span className={`font-mono ${pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {pnl >= 0 ? '+' : '-'}
                    {formatMoney(pnl >= 0 ? pnl : pnl * -1)}
                  </span>

                  {/* Botón ir a sesión */}
                  <div className='relative group/tooltip'>
                    <button
                      type='button'
                      onClick={() => goToSession(s.id)}
                      className='flex items-center text-slate-500 hover:text-cyan-400 transition-colors'
                      aria-label='Ver sesión en historial'>
                      <LaunchIcon size={16} />
                    </button>

                    <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-bold text-white bg-slate-800 rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-slate-700'>
                      Ver sesión
                      <span className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800'></span>
                    </span>
                  </div>
                </div>
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
      <div className='text-[10px] text-slate-300 uppercase tracking-wider'>{label}</div>
      <div className={`mt-1 font-semibold ${valueClass}`}>{children}</div>
    </div>
  )
}
