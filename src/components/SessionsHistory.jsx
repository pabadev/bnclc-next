'use client'
import { useState, useRef, useEffect } from 'react'
import ConfirmDialog from '@/components/ConfirmDialog'
import ViewToggle from '@/components/ViewToggle'
import SessionsCalendar from '@/components/SessionsCalendar'
import { EditIcon, DeleteIcon, SaveIcon, CheckIcon } from '@/components/icons'

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

  // Formatea a fecha larga o corta según si es pantalla movil o no
  const formatSessionDateShort = (dateStr) => {
    const shortDate = dateStr.split('-').reverse().join('-')
    return shortDate
  }

  const formatSessionDateLong = (dateStr) => {
    // desktop → fecha larga
    const [y, m, d] = dateStr.split('-').map(Number)
    const localDate = new Date(y, m - 1, d)

    const formatted = localDate.toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    const longDate = formatted.charAt(0).toUpperCase() + formatted.slice(1)
    return longDate
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
                    id={`session-${ses.id}`}
                    className='bg-[#0d1117] px-5 py-2 rounded-xl border border-slate-800 flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          checked={selected.includes(ses.id)}
                          onChange={() => toggleSelect(ses.id)}
                        />
                        <span className='md:hidden text-[12px] text-slate-200 font-base'>
                          {formatSessionDateShort(ses.fecha)}| {ses.horaInicio} a {ses.horaFin}
                        </span>
                        <span className='hidden md:block text-[12px] text-slate-200 font-base'>
                          {formatSessionDateLong(ses.fecha)}| {ses.horaInicio} a {ses.horaFin}
                        </span>
                      </div>

                      <span
                        className={`text-[15px] font-mono ${
                          parseFloat(ses.pnl) >= 0 ? 'text-emerald-500' : 'text-rose-400'
                        }`}>
                        {parseFloat(ses.pnl) >= 0 ? '+$' : '-$'}
                        {ses.pnl >= 0 ? ses.pnl : ses.pnl.slice(1)}
                      </span>
                    </div>

                    <div className='flex items-center gap-4 text-[11px] text-slate-300 border-t border-slate-800/50 pt-1'>
                      <span className='flex md:hidden'>inicial: ${ses.saldoInicial}</span>
                      <span className='hidden md:block'>Saldo inicial: ${ses.saldoInicial}</span>
                      <span className='hidden md:block'>Saldo final: ${ses.saldoFinal}</span>
                      <span className='flex md:hidden'>final: ${ses.saldoFinal}</span>

                      <div className='ml-auto flex gap-3'>
                        {editingId !== ses.id && (
                          <button onClick={() => startEdit(ses)} className='text-slate-400 hover:text-cyan-400'>
                            <EditIcon size={16} />
                          </button>
                        )}

                        <button onClick={() => confirmDeleteOne(ses.id)} className='text-slate-400 hover:text-rose-400'>
                          <DeleteIcon size={16} />
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
                                <CheckIcon size={14} className='text-emerald-400' />
                              ) : (
                                <SaveIcon size={16} className='text-slate-400 hover:text-cyan-400' />
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
