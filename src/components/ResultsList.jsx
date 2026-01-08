'use client'

export default function ResultsList({ resultados, copiedIndex, onCopy }) {
  return (
    <div className='flex-1 lg:overflow-y-auto pr-2 custom-scrollbar space-y-2'>
      {resultados.map((op, index) => (
        <div
          key={index}
          className='group bg-[#161b26]/60 hover:bg-[#1f2635] p-3 rounded-xl border border-slate-800/50 flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div className='bg-[#0d1117] text-slate-300 group-hover:text-cyan-400 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border border-slate-800'>
              {index + 1}
            </div>

            <div>
              <p className='text-[12px] text-slate-300 font-semibold mb-0.5'>Monto Inv.</p>
              <div className='flex items-center gap-0.5 md:gap-2'>
                <p className='font-mono text-[15px] md:text-lg text-blue-300'>${op.inversion}</p>

                {/* Contenedor del botón con Tooltip */}

                <div className='relative flex items-center group/tooltip'>
                  <button
                    type='button'
                    onClick={() => onCopy(op.inversion, index)}
                    className={`p-0 rounded transition-all ${
                      copiedIndex === index ? 'text-emerald-400' : 'text-slate-500 hover:text-white text'
                    }`}>
                    {copiedIndex === index ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='14'
                        height='14'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <polyline points='20 6 9 17 4 12'></polyline>
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='14'
                        height='14'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>

                        <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
                      </svg>
                    )}
                  </button>

                  {/* Etiqueta flotante (Tooltip) */}

                  <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-bold text-white bg-slate-800 rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-slate-700'>
                    {copiedIndex === index ? 'Copiado' : 'Copiar'}

                    {/* Triangulito del tooltip */}

                    <span className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800'></span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex gap-0 md:gap-3'>
            <div className='text-right'>
              <p className='text-[11px] text-slate-300 font-semibold'>Ganancia</p>
              <p className='font-mono text-[12px] md:text-base text-emerald-500'>{op.ganancia}</p>
            </div>

            <div className='text-right pl-2 md:pl-4'>
              <p className='text-[11px] text-slate-300 font-semibold min-w-[75px] md:min-w-[120px]'>Acumulado</p>
              <p className='font-mono text-[12px] md:text-base text-blue-500'>{op.acumulado}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
