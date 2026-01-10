'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import MobileMenu from '@/components/MobileMenu'
import { useDropdown } from '@/hooks/useDropdown'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toolsRef = useRef(null)
  const profileRef = useRef(null)
  const tools = useDropdown()

  /* ─────────────────────────────
     Click fuera
  ───────────────────────────── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        tools.setOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [tools])

  /* ─────────────────────────────
     Teclado dropdown Herramientas
  ───────────────────────────── */
  useEffect(() => {
    if (!tools.open || !toolsRef.current) return

    const menuItems = toolsRef.current.querySelectorAll('[role="menuitem"]')
    if (!menuItems.length) return

    let index = 0
    menuItems[0].focus()

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          tools.setOpen(false)
          toolsRef.current.querySelector('button')?.focus()
          break

        case 'ArrowDown':
          e.preventDefault()
          index = (index + 1) % menuItems.length
          menuItems[index].focus()
          break

        case 'ArrowUp':
          e.preventDefault()
          index = (index - 1 + menuItems.length) % menuItems.length
          menuItems[index].focus()
          break

        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [tools.open, tools])

  return (
    <header className='flex-none border-b border-slate-800 bg-[#0a0f18] relative z-50' role='banner'>
      <div className='max-w-[1600px] mx-auto h-16 flex items-center justify-between px-2 md:px-4'>
        {/* LOGO */}
        <Link
          href='/'
          aria-label='Ir al inicio'
          className='flex-shrink-0 bg-slate-950/50 border border-slate-800/60 px-4 py-2 rounded-xl backdrop-blur-sm shadow-inner group transition-all hover:border-cyan-500/30 active:scale-95 cursor-pointer outline-none'>
          <div className='flex flex-col items-start'>
            <h1 className='text-xl md:text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-none'>
              BINACALC
            </h1>
            <p className='text-[8px] md:text-[10px] uppercase font-medium text-slate-300 tracking-[0.15em] md:tracking-[0.12em] leading-none mt-1.5 select-none group-hover:text-slate-200 transition-colors'>
              Trading bajo control
            </p>
          </div>
        </Link>

        {/* NAV */}
        <div className='flex items-end gap-3 md:gap-6'>
          <div className='flex items-center gap-3 md:gap-6'>
            <nav className='hidden lg:flex items-center gap-6' role='navigation' aria-label='Navegación principal'>
              <a href='#' className='text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
                Blog
              </a>

              {/* HERRAMIENTAS */}
              <div ref={toolsRef} className='relative' onMouseEnter={tools.openMenu} onMouseLeave={tools.closeMenu}>
                <button
                  type='button'
                  onClick={tools.toggleMenu}
                  {...tools.triggerProps}
                  aria-haspopup='menu'
                  aria-expanded={tools.open}
                  aria-controls='tools-menu'
                  className='flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
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
                    strokeLinejoin='round'
                    className={`transition-transform duration-200 ${tools.open ? 'rotate-180' : ''}`}>
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </button>

                <div
                  {...tools.menuProps}
                  id='tools-menu'
                  role='menu'
                  aria-hidden={!tools.open}
                  className={`
                absolute top-full left-0 mt-2 w-56
                bg-[#161b26] border border-slate-800
                rounded-xl shadow-2xl py-2 z-[70]
                transition-all duration-200 ease-out
                ${
                  tools.open
                    ? 'opacity-100 scale-100 translate-y-0 visible'
                    : 'opacity-0 scale-[0.98] -translate-y-1 invisible'
                }
              `}>
                  {/* ITEM */}
                  <div className='mx-2 rounded-lg hover:bg-[#0d1117] transition-colors'>
                    <Link
                      href='#'
                      role='menuitem'
                      tabIndex={tools.open ? 0 : -1}
                      onClick={() => tools.setOpen(false)}
                      className='flex w-full items-center gap-3 px-3 py-2'>
                      {/* SVG intacto */}
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
                        <p className='text-sm text-white font-semibold'>Calendario Económico</p>
                        <p className='text-[10px] text-slate-500'>Evita noticias volátiles</p>
                      </div>
                    </Link>
                  </div>

                  {/* ITEM */}
                  <div className='mx-2 rounded-lg hover:bg-[#0d1117] transition-colors'>
                    <Link
                      href='#'
                      role='menuitem'
                      tabIndex={tools.open ? 0 : -1}
                      onClick={() => tools.setOpen(false)}
                      className='flex w-full items-center gap-3 px-3 py-2'>
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
                        <p className='text-sm text-white font-semibold'>Sesiones de Mercado</p>
                        <p className='text-[10px] text-slate-500'>Londres / NY / Tokio</p>
                      </div>
                    </Link>
                  </div>
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

            <div className='h-8 w-px bg-slate-800 mx-2'></div>

            {/* PERFIL */}
            <div ref={profileRef} className='relative'>
              <button
                onClick={() => setIsProfileOpen((p) => !p)}
                className='w-10 h-10 rounded-full border-2 border-slate-700 hover:border-cyan-500 transition-all overflow-hidden bg-slate-800 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  className='text-slate-400'>
                  <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
                  <circle cx='12' cy='7' r='4' />
                </svg>
              </button>

              {isProfileOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-[#161b26] border border-slate-800 rounded-xl shadow-2xl py-2'>
                  <div className='px-4 py-2 border-b border-slate-800 mb-1'>
                    <p className='text-xs text-slate-500 font-bold uppercase'>Usuario</p>
                    <p className='text-sm text-white truncate'>trader@binacalc.com</p>
                  </div>
                  <button className='w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-[#0d1117] transition-colors'>
                    Mi Perfil
                  </button>
                  <button className='w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-[#0d1117] transition-colors'>
                    Configuración
                  </button>
                  <button className='w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-slate-800 mt-1'>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>

            {/* BOTÓN MENÚ MÓVIL */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label='Abrir menú'
              aria-expanded={isMenuOpen}
              className='lg:hidden p-2 text-slate-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                {isMenuOpen ? <line x1='18' y1='6' x2='6' y2='18' /> : <line x1='3' y1='12' x2='21' y2='12' />}
                {!isMenuOpen && <line x1='3' y1='6' x2='21' y2='6' />}
                {!isMenuOpen && <line x1='3' y1='18' x2='21' y2='18' />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </header>
  )
}
