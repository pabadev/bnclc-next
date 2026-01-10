'use client'

import { useEffect, useRef, useState } from 'react'

export function useDropdown({ closeDelay = 80 } = {}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const timeoutRef = useRef(null)

  const openMenu = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, closeDelay)
  }

  const toggleMenu = () => setOpen((p) => !p)

  // Click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return {
    ref,
    open,
    setOpen,
    openMenu,
    closeMenu,
    toggleMenu,

    // Accesibilidad
    triggerProps: {
      'aria-haspopup': 'menu',
      'aria-expanded': open
    },

    menuProps: {
      role: 'menu'
    }
  }
}
