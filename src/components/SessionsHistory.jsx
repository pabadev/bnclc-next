'use client'

export default function SessionsHistory({ sesiones }) {
  return (
    <div className='flex-1 bg-[#161b26] rounded-2xl border border-slate-800 p-4 flex flex-col min-h-0 shadow-xl'>
      <h3 className='text-sm font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2 text-center uppercase tracking-widest'>
        HISTORIAL DE SESIONES
      </h3>

      <div className='flex-1 overflow-y-auto custom-scrollbar space-y-3'>
        {sesiones.length > 0 ? (
          sesiones.map((ses) => (
            <div
              key={ses.id}
              className='bg-[#0d1117] px-5 py-3 rounded-xl border border-slate-800 flex flex-col gap-2 hover:border-slate-600 transition-colors'>
              <div className='flex justify-between items-center'>
                <span className='text-[12px] text-slate-200 font-bold'>
                  {ses.fecha.split('-').reverse().join('-')} | {ses.horaInicio} a {ses.horaFin}
                </span>

                <span
                  className={`text-[15px] font-mono ${
                    parseFloat(ses.pnl) >= 0 ? 'text-emerald-500' : 'text-rose-300'
                  }`}>
                  <span className='hidden md:inline'>{parseFloat(ses.pnl) >= 0 ? 'Ganancia ' : 'Pérdida '}</span>(
                  {parseFloat(ses.pnl) >= 0 ? '+' : ''}
                  {ses.pnl})
                </span>
              </div>

              <div className='flex gap-4 text-[11px] text-slate-300 font-semibold border-t border-slate-800/50 pt-1'>
                <span>Inicial: ${ses.saldoInicial}</span>

                <span>Final: ${ses.saldoFinal}</span>
              </div>

              {ses.notas && <p className='text-xs text-slate-300 italic bg-[#161b26] p-2 rounded'>"{ses.notas}"</p>}
            </div>
          ))
        ) : (
          <div className='h-64 flex flex-col items-center justify-center text-slate-500 italic text-sm border border-dashed border-slate-800 rounded-xl'>
            No hay registros aún.
          </div>
        )}
      </div>
    </div>
  )
}
