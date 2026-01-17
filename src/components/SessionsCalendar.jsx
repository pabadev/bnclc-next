'use client'

import { useMemo, useState } from 'react'
import DaySummary from './DaySummary'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'

export default function SessionsCalendar({ sesiones }) {
  const groupedByDate = useMemo(() => {
    return sesiones.reduce((acc, ses) => {
      acc[ses.fecha] = acc[ses.fecha] || []
      acc[ses.fecha].push(ses)
      return acc
    }, {})
  }, [sesiones])

  const today = new Date()

  // ───── Estado de mes/año visible ─────
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()) // 0-11

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const cells = []
  const [selectedDate, setSelectedDate] = useState(null)

  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  // ───── Navegación de meses ─────
  // ───── Navegación de meses (FIX DEFINITIVO) ─────
  const goPrevMonth = () => {
    setSelectedDate(null)

    const newDate = new Date(currentYear, currentMonth - 1, 1)
    setCurrentYear(newDate.getFullYear())
    setCurrentMonth(newDate.getMonth())
  }

  const goNextMonth = () => {
    setSelectedDate(null)

    const newDate = new Date(currentYear, currentMonth + 1, 1)
    setCurrentYear(newDate.getFullYear())
    setCurrentMonth(newDate.getMonth())
  }

  const monthLabel = new Date(currentYear, currentMonth).toLocaleDateString('es-CO', {
    month: 'long',
    year: 'numeric'
  })

  const capitalizedMonth = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)

  return (
    <>
      {/* ───── Header mes / año ───── */}
      <div className='flex items-center justify-between mb-3 text-xs text-slate-200'>
        <div
          onClick={goPrevMonth}
          className='px-3 py-1 rounded-md cursor-pointer hover:bg-slate-800 hover:text-cyan-400'>
          <ChevronLeftIcon size={16} />
        </div>

        <span className='uppercase tracking-widest'>{capitalizedMonth}</span>

        <div
          onClick={goNextMonth}
          className='px-3 py-1 rounded-md cursor-pointer hover:bg-slate-800 hover:text-cyan-400'>
          <ChevronRightIcon size={16} />
        </div>
      </div>

      <div className='grid grid-cols-7 gap-2 text-xs'>
        {['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'].map((d, index) => (
          <div key={`${d}-${index}`} className='text-center text-slate-400 font-semibold'>
            {d}
          </div>
        ))}

        {cells.map((day, i) => {
          if (!day) return <div key={i} />

          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasSessions = groupedByDate[dateStr]
          const isSelected = selectedDate === dateStr

          return (
            <div
              key={i}
              onClick={() => hasSessions && setSelectedDate((prev) => (prev === dateStr ? null : dateStr))}
              className={`aspect-square rounded-lg border flex flex-col items-center justify-center cursor-default
                ${hasSessions ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800'}
                ${isSelected ? 'ring-1 ring-cyan-400' : ''}
              `}>
              <span>{day}</span>

              {hasSessions && <span className='mt-1 text-[10px] text-cyan-400 font-bold'>{hasSessions.length}</span>}
            </div>
          )
        })}
      </div>

      {selectedDate && groupedByDate[selectedDate] && (
        <div className='mt-4'>
          <DaySummary date={selectedDate} sessions={groupedByDate[selectedDate]} />
        </div>
      )}
    </>
  )
}
