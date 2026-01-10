'use client'

import Link from 'next/link'

export default function MobileMenu({ isOpen, setIsOpen }) {
  if (!isOpen) return null

  return (
    <div className='absolute top-full right-0 w-64 bg-[#0d1117] border-b border-slate-600 flex flex-col p-4 gap-4 lg:hidden shadow-2xl'>
      <a href='#' className='text-lg font-medium text-slate-300'>
        Blog
      </a>

      <div className='relative group/menu'>
        <button className='flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
          Herramientas
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='m6 9 6 6 6-6' />
          </svg>
        </button>

        <div className='absolute top-full left-0 mt-2 w-56 bg-[#161b26] border border-slate-800 rounded-xl shadow-2xl py-3 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-[70]'>
          <a href='#' className='flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors'>
            <div className='p-1.5 bg-amber-500/10 rounded-lg text-amber-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
                <line x1='16' x2='16' y1='2' y2='6' />
                <line x1='8' x2='8' y1='2' y2='6' />
                <line x1='3' x2='21' y1='10' y2='10' />
              </svg>
            </div>
            <div>
              <p className='text-sm text-white font-bold'>Calendario Económico</p>
              <p className='text-[10px] text-slate-500'>Evita noticias volátiles</p>
            </div>
          </a>

          <a href='#' className='flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors'>
            <div className='p-1.5 bg-cyan-500/10 rounded-lg text-cyan-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <circle cx='12' cy='12' r='10' />
                <polyline points='12 6 12 12 16 14' />
              </svg>
            </div>
            <div>
              <p className='text-sm text-white font-bold'>Sesiones de Mercado</p>
              <p className='text-[10px] text-slate-500'>Londres / NY / Tokio</p>
            </div>
          </a>
        </div>
      </div>

      <a href='#' className='text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
        Telegram
      </a>
      <a href='#' className='text-lg font-medium text-slate-300'>
        Ingresar
      </a>
      <a href='#' className='text-lg font-medium text-blue-400'>
        Registrarse
      </a>
    </div>
  )
}
