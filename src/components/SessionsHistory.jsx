'use client'
import { useState, useRef, useEffect } from 'react'
import ConfirmDialog from '@/components/ConfirmDialog'
import ViewToggle from '@/components/ViewToggle'
import SessionsCalendar from '@/components/SessionsCalendar'

export default function SessionsHistory({ sesiones, onDelete, onUpdateNotes, onDeleteMany }) {
  const [editingId, setEditingId] = useState(null)
  const [tempNote, setTempNote] = useState('')
  const [selected, setSelected] = useState([])
  const [savedId, setSavedId] = useState(null)
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window === 'undefined') return 'list'
    return localStorage.getItem('sessionsView') || 'list'
  })

  const inputRef = useRef(null)

  /* ───────────── Confirm Dialog state ───────────── */
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [confirmAction, setConfirmAction] = useState(null)

  /* ───────────── Auto focus ───────────── */
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingId])

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selected.length === sesiones.length) {
      setSelected([])
    } else {
      setSelected(sesiones.map((s) => s.id))
    }
  }

  const startEdit = (ses) => {
    setEditingId(ses.id)
    setTempNote(ses.notas || '')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setTempNote('')
  }

  const saveEdit = (ses) => {
    const trimmed = tempNote.trim()
    if (!trimmed) return

    onUpdateNotes(ses.id, trimmed)
    setSavedId(ses.id)

    setTimeout(() => {
      setSavedId(null)
      setEditingId(null)
    }, 1000)
  }

  /* ───────────── Delete handlers ───────────── */
  const confirmDeleteOne = (id) => {
    setConfirmText('Esta sesión se eliminará de forma permanente. Esta acción no se puede deshacer.')
    setConfirmAction(() => () => onDelete(id))
    setConfirmOpen(true)
  }

  const confirmDeleteMany = () => {
    setConfirmText(`Se eliminarán ${selected.length} sesión(es). Esta acción no se puede deshacer.`)
    setConfirmAction(() => () => {
      onDeleteMany(selected)
      setSelected([])
    })
    setConfirmOpen(true)
  }

  const onChangeView = (value) => {
    setViewMode(value)
    console.log(value)
  }

  return (
    <>
      <div className='relative flex-1 bg-[#161b26] rounded-2xl border border-slate-800 p-4 flex flex-col min-h-0 shadow-xl'>
        <h3 className='text-sm text-slate-300 mb-4 border-b border-slate-700 pb-2 uppercase tracking-widest'>
          HISTORIAL DE SESIONES
        </h3>
        <div className='absolute right-4 top-2 z-10'>
          <ViewToggle
            options={[
              { value: 'list', label: 'List' },
              { value: 'calendar', label: 'Calen' }
            ]}
            value={viewMode}
            onChange={onChangeView}
          />
        </div>
        {selected.length > 0 && (
          <div className='flex justify-between mb-3'>
            <button onClick={selectAll} className='text-xs text-slate-400'>
              {selected.length === sesiones.length ? 'Deseleccionar todo' : 'Seleccionar todo'}
            </button>

            <button onClick={confirmDeleteMany} className='text-xs text-rose-400'>
              Eliminar seleccionadas ({selected.length})
            </button>
          </div>
        )}

        <div className='flex-1 overflow-y-auto custom-scrollbar space-y-3'>
          {viewMode === 'list' ? (
            sesiones.length > 0 ? (
              sesiones.map((ses) => {
                const isNoteValid = tempNote.trim().length > 0

                return (
                  <div
                    key={ses.id}
                    className='bg-[#0d1117] px-5 py-2 rounded-xl border border-slate-800 flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          checked={selected.includes(ses.id)}
                          onChange={() => toggleSelect(ses.id)}
                        />
                        <span className='text-[12px] text-slate-200 font-semibold'>
                          {ses.fecha.split('-').reverse().join('-')} | {ses.horaInicio} a {ses.horaFin}
                        </span>
                      </div>

                      <span
                        className={`text-[15px] font-mono ${
                          parseFloat(ses.pnl) >= 0 ? 'text-emerald-500' : 'text-rose-800'
                        }`}>
                        ({parseFloat(ses.pnl) >= 0 ? '+' : ''}
                        {ses.pnl})
                      </span>
                    </div>

                    <div className='flex items-center gap-4 text-[11px] text-slate-300 border-t border-slate-800/50 pt-1'>
                      <span>Inicial: ${ses.saldoInicial}</span>
                      <span>Final: ${ses.saldoFinal}</span>

                      <div className='ml-auto flex gap-3'>
                        {editingId !== ses.id && (
                          <button onClick={() => startEdit(ses)} className='text-slate-400'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='w-4 h-4'>
                              <path d='M12 20h9' />
                              <path d='M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z' />
                            </svg>
                          </button>
                        )}

                        <button onClick={() => confirmDeleteOne(ses.id)} className='text-slate-400'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='w-4 h-4'>
                            <path d='M3 6h18' />
                            <path d='M8 6V4h8v2' />
                            <path d='M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6' />
                            <path d='M10 11v6' />
                            <path d='M14 11v6' />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {editingId === ses.id ? (
                      <div className='flex gap-2 items-center'>
                        <input
                          ref={inputRef}
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && isNoteValid) saveEdit(ses)
                            if (e.key === 'Escape') cancelEdit()
                          }}
                          className='flex-1 bg-[#161b26] text-xs text-cyan-200 p-2 rounded'
                        />

                        {isNoteValid && (
                          <div className='relative group'>
                            <button onClick={() => saveEdit(ses)}>
                              {savedId === ses.id ? (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='14'
                                  height='14'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  strokeWidth='2.5'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  className='text-emerald-400'>
                                  <polyline points='20 6 9 17 4 12' />
                                </svg>
                              ) : (
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  className='w-4 h-4 text-slate-400'>
                                  <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' />
                                  <path d='M17 21v-8H7v8' />
                                  <path d='M7 3v5h8' />
                                </svg>
                              )}
                            </button>

                            <span className='flex flex-col pointer-events-none absolute -top-10 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-[10px] text-slate-200 px-2 py-1 rounded whitespace-nowrap'>
                              <span>Enter para guardar</span>
                              <span>Esc para cancelar</span>
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      ses.notas && (
                        <p
                          onDoubleClick={() => startEdit(ses)}
                          className='text-xs text-cyan-200 bg-[#161b26] p-2 rounded cursor-pointer'>
                          "{ses.notas}"
                        </p>
                      )
                    )}
                  </div>
                )
              })
            ) : (
              <div className='h-64 flex items-center justify-center text-slate-500 italic text-sm border border-dashed border-slate-800 rounded-xl'>
                No hay registros aún.
              </div>
            )
          ) : (
            <SessionsCalendar sesiones={sesiones} />
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title='Confirmar eliminación'
        description={confirmText}
        confirmText='Eliminar'
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          confirmAction?.()
          setConfirmOpen(false)
        }}
      />
    </>
  )
}
