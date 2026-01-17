'use client'

import { useState } from 'react'
import { CopyIcon, CheckIcon } from '@/components/icons'

export default function ResultsList({ resultados, copiedIndex, onCopy }) {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className='flex-1 lg:overflow-y-auto pr-2 custom-scrollbar space-y-2'>
      {resultados.map((op, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`group rounded-xl flex justify-between items-center
      border border-slate-800/50 transition-all
      hover:bg-[#1f2635]
      ${activeIndex === index ? 'bg-[#1f2635] ring-1 ring-inset ring-cyan-400' : 'bg-[#161b26]/60'}
      p-3
  `}>
          <div className='flex items-center gap-2'>
            <div className='bg-[#0d1117] text-slate-300 group-hover:text-cyan-400 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border border-slate-800'>
              {index + 1}
            </div>

            <div>
              <p className='text-[12px] text-slate-300 font-semibold'>Monto Inv.</p>
              <div className='flex items-center gap-0.5 md:gap-2'>
                <p className='font-mono text-[15px] md:text-lg text-blue-300'>${op.inversion}</p>

                {/* Contenedor del botón con Tooltip */}
                <div className='relative flex items-center group/tooltip'>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation()
                      onCopy(op.inversion, index)
                    }}
                    className={`p-0 rounded transition-all cursor-pointer ${
                      copiedIndex === index ? 'text-emerald-400' : 'text-slate-500 hover:text-white'
                    }`}>
                    {copiedIndex === index ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                  </button>

                  {/* Tooltip */}
                  <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-bold text-white bg-slate-800 rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-slate-700'>
                    {copiedIndex === index ? 'Copiado' : 'Copiar'}
                    <span className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800'></span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex gap-0 md:gap-3'>
            <div className='text-right'>
              <p className='text-[11px] text-slate-300 font-semibold'>Ganancia</p>
              <p className='flex font-mono justify-end text-[12px] md:text-lg text-emerald-500'>
                <span className='hidden md:block'>$</span>
                {op.ganancia}
              </p>
            </div>

            <div className='text-right pl-2 md:pl-4'>
              <p className='text-[11px] text-slate-300 font-semibold min-w-[70px] md:min-w-[120px]'>Requerido</p>
              <p className='flex font-mono justify-end text-[12px] md:text-lg text-blue-500'>
                <span className='hidden md:block'>$</span>
                {op.acumulado}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
