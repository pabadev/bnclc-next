'use client'
import { useState } from 'react'
import ConfirmDialog from '@/components/ConfirmDialog'

export default function SessionsHistory({ sesiones, onDelete, onUpdateNotes, onDeleteMany }) {
  const [editingId, setEditingId] = useState(null)
  const [tempNote, setTempNote] = useState('')
  const [selected, setSelected] = useState([])
  const [savedId, setSavedId] = useState(null)

  /* ───────────── Confirm Dialog state ───────────── */
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [confirmAction, setConfirmAction] = useState(null)

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

  const saveEdit = (id) => {
    onUpdateNotes(id, tempNote)
    setSavedId(id)

    setTimeout(() => {
      setSavedId(null)
      setEditingId(null)
    }, 1200)
  }

  /* ───────────── Delete handlers (modal) ───────────── */
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

  return (
    <>
      <div className='flex-1 bg-[#161b26] rounded-2xl border border-slate-800 p-4 flex flex-col min-h-0 shadow-xl'>
        <h3 className='text-sm font-normal text-slate-300 mb-4 border-b border-slate-700 pb-2 text-center uppercase tracking-widest'>
          HISTORIAL DE SESIONES
        </h3>

        {/* Acciones masivas */}
        {selected.length > 0 && (
          <div className='flex items-center justify-between mb-3'>
            <button onClick={selectAll} className='text-xs text-slate-400'>
              {selected.length === sesiones.length ? 'Deseleccionar todo' : 'Seleccionar todo'}
            </button>

            <button onClick={confirmDeleteMany} className='text-xs text-rose-400'>
              Eliminar seleccionadas ({selected.length})
            </button>
          </div>
        )}

        <div className='flex-1 overflow-y-auto custom-scrollbar space-y-3'>
          {sesiones.length > 0 ? (
            sesiones.map((ses) => (
              <div
                key={ses.id}
                className='bg-[#0d1117] px-5 py-2 rounded-xl border border-slate-800 flex flex-col gap-2 hover:border-slate-600 transition-colors'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <input type='checkbox' checked={selected.includes(ses.id)} onChange={() => toggleSelect(ses.id)} />

                    <span className='text-[12px] text-slate-200 font-semibold'>
                      {ses.fecha.split('-').reverse().join('-')} | {ses.horaInicio} a {ses.horaFin}
                    </span>
                  </div>

                  <span
                    className={`text-[15px] font-mono ${
                      parseFloat(ses.pnl) >= 0 ? 'text-emerald-500' : 'text-rose-800'
                    }`}>
                    <span className='tracking-normal hidden md:inline'>
                      {parseFloat(ses.pnl) >= 0 ? 'Ganancia ' : 'Pérdida '}
                    </span>
                    ({parseFloat(ses.pnl) >= 0 ? '+' : ''}
                    {ses.pnl})
                  </span>
                </div>

                <div className='flex gap-4 text-[11px] text-slate-300 font-semibold border-t border-slate-800/50 pt-1 tracking-wide items-center'>
                  <span>Inicial: ${ses.saldoInicial}</span>
                  <span>Final: ${ses.saldoFinal}</span>

                  {/* Acciones */}
                  <div className='ml-auto flex items-center gap-3'>
                    {editingId !== ses.id && (
                      <button onClick={() => startEdit(ses)} className='text-slate-400 text-xs'>
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

                    <button onClick={() => confirmDeleteOne(ses.id)} className='text-slate-400 text-xs'>
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
                      value={tempNote}
                      onChange={(e) => setTempNote(e.target.value)}
                      className='flex-1 bg-[#161b26] text-xs text-cyan-200 p-2 rounded'
                    />

                    <button onClick={() => saveEdit(ses.id)} className='text-slate-400'>
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
                          className='w-4 h-4'>
                          <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' />
                          <path d='M17 21v-8H7v8' />
                          <path d='M7 3v5h8' />
                        </svg>
                      )}
                    </button>
                  </div>
                ) : (
                  ses.notas && (
                    <p
                      onDoubleClick={() => startEdit(ses)}
                      className='text-xs text-cyan-200 bg-[#161b26] p-2 rounded tracking-widest cursor-pointer'>
                      "{ses.notas}"
                    </p>
                  )
                )}
              </div>
            ))
          ) : (
            <div className='h-64 flex flex-col items-center justify-center text-slate-500 italic text-sm border border-dashed border-slate-800 rounded-xl'>
              No hay registros aún.
            </div>
          )}
        </div>
      </div>

      {/* Confirmación */}
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
