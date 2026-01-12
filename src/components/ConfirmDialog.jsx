'use client'

import { useEffect, useRef } from 'react'

export default function ConfirmDialog({
  open,
  title = 'Confirmar acción',
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel
}) {
  const dialogRef = useRef(null)
  const cancelBtnRef = useRef(null)

  /* ─────────────────────────────
     Foco + teclado
  ───────────────────────────── */
  useEffect(() => {
    if (!open) return

    cancelBtnRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='confirm-title'
      aria-describedby='confirm-description'
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div
        ref={dialogRef}
        className='
          w-full max-w-sm
          bg-[#0d1117]
          border border-slate-800
          rounded-2xl
          shadow-2xl
          p-5
          flex flex-col gap-4
        '>
        <h2 id='confirm-title' className='text-sm text-slate-200 font-semibold uppercase tracking-wider text-center'>
          {title}
        </h2>

        {description && (
          <p id='confirm-description' className='text-xs text-slate-400 text-center'>
            {description}
          </p>
        )}

        <div className='flex gap-3 mt-2'>
          <button
            ref={cancelBtnRef}
            onClick={onCancel}
            className='
              flex-1 py-2 rounded-lg
              bg-slate-800 hover:bg-slate-700
              text-slate-300 text-sm font-semibold
              transition-colors
            '>
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className='
              flex-1 py-2 rounded-lg
              bg-rose-600 hover:bg-rose-500
              text-white text-sm font-bold
              transition-colors
            '>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
