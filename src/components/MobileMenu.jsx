'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useDropdown } from '@/hooks/useDropdown'

export default function MobileMenu({ isOpen, setIsOpen }) {
  const tools = useDropdown()
  const toolsRef = useRef(null)
  const menuRef = useRef(null)

  /* ─────────────────────────────
     Cerrar menú móvil al click fuera
  ───────────────────────────── */
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        tools.setOpen(false)
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen, setIsOpen, tools])

  /* ─────────────────────────────
     Teclado submenu herramientas
  ───────────────────────────── */
  useEffect(() => {
    if (!tools.open || !toolsRef.current) return

    const items = toolsRef.current.querySelectorAll('[role="menuitem"]')
    if (!items.length) return

    let index = 0
    items[0].focus()

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          tools.setOpen(false)
          toolsRef.current.querySelector('button')?.focus()
          break

        case 'ArrowDown':
          e.preventDefault()
          index = (index + 1) % items.length
          items[index].focus()
          break

        case 'ArrowUp':
          e.preventDefault()
          index = (index - 1 + items.length) % items.length
          items[index].focus()
          break

        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [tools.open, tools])

  if (!isOpen) return null

  return (
    <nav
      ref={menuRef}
      role='navigation'
      aria-label='Menú principal móvil'
      className='
        absolute top-full right-4 mt-2
        maxw-64
        bg-[#0d1117]
        border border-slate-800
        rounded-2xl
        shadow-2xl
        p-4
        flex flex-col gap-4
        lg:hidden
        transition-all duration-200 ease-out
      '>
      {/* Item */}
      <a href='#' className='text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors'>
        Blog
      </a>

      {/* Herramientas */}
      <div ref={toolsRef} className='flex flex-col'>
        <button
          type='button'
          onClick={tools.toggleMenu}
          aria-haspopup='menu'
          aria-expanded={tools.open}
          aria-controls='mobile-tools-menu'
          className='
            flex items-center justify-between
            text-base font-medium text-slate-300
            hover:text-cyan-400 transition-colors
          '>
          Herramientas
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className={`transition-transform ${tools.open ? 'rotate-180' : ''}`}>
            <path d='m6 9 6 6 6-6' />
          </svg>
        </button>

        {/* Submenu */}
        <div
          id='mobile-tools-menu'
          role='menu'
          aria-hidden={!tools.open}
          className={`
            bg-[#161b26]
            border border-slate-800
            rounded-xl
            shadow-xl
            overflow-hidden
            transition-all duration-200 ease-out
            ${
              tools.open
                ? 'mt-2 opacity-100 scale-100 translate-y-0 py-2'
                : 'opacity-0 scale-[0.98] -translate-y-1 py-0 h-0 border-transparent'
            }
          `}>
          {/* Item */}
          <Link
            href='#'
            role='menuitem'
            tabIndex={tools.open ? 0 : -1}
            onClick={() => {
              tools.setOpen(false)
              setIsOpen(false)
            }}
            className='
              mx-2 rounded-lg
              flex items-center gap-3 px-3 py-2
              hover:bg-[#0d1117] transition-colors
            '>
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

          {/* Item */}
          <Link
            href='#'
            role='menuitem'
            tabIndex={tools.open ? 0 : -1}
            onClick={() => {
              tools.setOpen(false)
              setIsOpen(false)
            }}
            className='
              mx-2 rounded-lg
              flex items-center gap-3 px-3 py-2
              hover:bg-[#0d1117] transition-colors
            '>
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

      <a href='#' className='text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors'>
        Telegram
      </a>

      <a href='#' className='text-base font-medium text-slate-300'>
        Ingresar
      </a>

      <a href='#' className='text-base font-medium text-blue-400'>
        Registrarse
      </a>
    </nav>
  )
}
