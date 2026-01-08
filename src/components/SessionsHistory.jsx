'use client'
import { useState } from 'react'

export default function SessionsHistory({ sesiones, onDelete, onUpdateNotes, onDeleteMany }) {
  const [editingId, setEditingId] = useState(null)
  const [tempNote, setTempNote] = useState('')
  const [selected, setSelected] = useState([])
  const [savedId, setSavedId] = useState(null)

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
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

  return (
    <div className='flex-1 bg-[#161b26] rounded-2xl border border-slate-800 p-4 flex flex-col min-h-0 shadow-xl'>
      <h3 className='text-sm font-normal text-slate-300 mb-4 border-b border-slate-700 pb-2 text-center uppercase tracking-widest'>
        HISTORIAL DE SESIONES
      </h3>

      {selected.length > 0 && (
        <button
          onClick={() => {
            onDeleteMany(selected)
            setSelected([])
          }}
          className='text-xs text-rose-400 mb-3 self-end'>
          Eliminar seleccionadas ({selected.length})
        </button>
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
                    parseFloat(ses.pnl) >= 0 ? 'text-emerald-500' : 'text-rose-300'
                  }`}>
                  <span className='tracking-normal hidden md:inline'>
                    {parseFloat(ses.pnl) >= 0 ? 'Ganancia ' : 'Pérdida '}
                  </span>
                  ({parseFloat(ses.pnl) >= 0 ? '+' : ''}
                  {ses.pnl})
                </span>
              </div>

              <div className='flex gap-4 text-[11px] text-slate-300 font-semibold border-t border-slate-800/50 pt-1 tracking-wide'>
                <span>Inicial: ${ses.saldoInicial}</span>
                <span>Final: ${ses.saldoFinal}</span>

                <button onClick={() => onDelete(ses.id)} className='ml-auto text-rose-400 text-xs'>
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

              {editingId === ses.id ? (
                <div className='flex gap-2'>
                  <input
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    className='flex-1 bg-[#161b26] text-xs text-cyan-200 p-2 rounded'
                  />
                  <button onClick={() => saveEdit(ses.id)} className='text-xs text-emerald-400'>
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

                    {savedId === ses.id && <span className='ml-1 text-[10px] text-emerald-300'>Guardado</span>}
                  </button>
                </div>
              ) : (
                ses.notas && (
                  <p
                    onDoubleClick={() => startEdit(ses)}
                    className='text-xs text-cyan-200 bg-[#161b26] p-2 rounded tracking-widest cursor-pointer'>
                    {'"'}
                    {ses.notas}
                    {'"'}
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
  )
}
