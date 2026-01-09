'use client'

import { useState } from 'react'
import Link from 'next/link'
import MobileMenu from '@/components/MobileMenu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className='flex-none border-b border-slate-800 bg-[#0a0f18] relative z-50'>
      {/* Contenedor con ancho máximo alineado con el body */}
      <div className='max-w-[1600px] mx-auto h-16 flex items-center justify-between px-2 md:px-4'>
        {/* LOGO CONTAINER (Convertido en Link) */}
        <Link
          href='/'
          className='flex-shrink-0 bg-slate-950/50 border border-slate-800/60 px-4 py-2 rounded-xl backdrop-blur-sm shadow-inner group transition-all hover:border-cyan-500/30 active:scale-95 cursor-pointer outline-none'>
          <div className='flex flex-col items-start'>
            {/* Título Principal */}
            <h1 className='text-xl md:text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-none'>
              BINACALC
            </h1>

            {/* Slogan alineado */}
            <p className='text-[8px] md:text-[10px] uppercase font-medium text-slate-300 tracking-[0.15em] md:tracking-[0.12em] leading-none mt-1.5 select-none group-hover:text-slate-200 transition-colors'>
              Trading bajo control
            </p>
          </div>
        </Link>

        {/* NAVEGACIÓN (Derecha - Escritorio) */}
        <div className='flex items-end gap-3 md:gap-6'>
          <div className='flex items-center gap-3 md:gap-6'>
            {/* Navegación dentro del Header */}
            <nav className='hidden lg:flex items-center gap-6'>
              {/* Opción Simple */}
              <a href='#' className='text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
                Blog
              </a>

              {/* Menú Desplegable de Herramientas */}
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

                {/* Dropdown al hacer Hover */}
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
              <a href='#' className='text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
                Ingresar
              </a>
              <button className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-900/20'>
                Registrarse
              </button>
            </nav>

            {/* DIVISOR */}
            <div className='h-8 w-px bg-slate-800 mx-2'></div>

            {/* PERFIL DE USUARIO */}
            <div className='relative'>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='w-10 h-10 rounded-full border-2 border-slate-700 hover:border-cyan-500 transition-all overflow-hidden bg-slate-800 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-slate-400'>
                  <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                  <circle cx='12' cy='7' r='4'></circle>
                </svg>
              </button>

              {/* Dropdown de Perfil */}
              {isProfileOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-[#161b26] border border-slate-800 rounded-xl shadow-2xl py-2 overflow-hidden'>
                  <div className='px-4 py-2 border-b border-slate-800 mb-1'>
                    <p className='text-xs text-slate-500 font-bold uppercase'>Usuario</p>
                    <p className='text-sm text-white truncate'>trader@binacalc.com</p>
                  </div>
                  <button className='w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors'>
                    Mi Perfil
                  </button>
                  <button className='w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors'>
                    Configuración
                  </button>
                  <button className='w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-slate-800 mt-1'>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BOTÓN MENÚ MÓVIL */}
          <div className='lg:hidden flex items-center gap-4'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-2 text-slate-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                {isMenuOpen ? (
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                ) : (
                  <line x1='3' y1='12' x2='21' y2='12'></line>
                )}
                {!isMenuOpen && <line x1='3' y1='6' x2='21' y2='6'></line>}
                {!isMenuOpen && <line x1='3' y1='18' x2='21' y2='18'></line>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL (Ancho completo o contenido limitado) */}
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </header>
  )
}
