'use client'

import { useMemo, useState } from 'react'
import DaySummary from './DaySummary'

export default function SessionsCalendar({ sesiones }) {
  const groupedByDate = useMemo(() => {
    return sesiones.reduce((acc, ses) => {
      acc[ses.fecha] = acc[ses.fecha] || []
      acc[ses.fecha].push(ses)
      return acc
    }, {})
  }, [sesiones])

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []

  const [selectedDate, setSelectedDate] = useState(null)

  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  // Función para convertir "10:31 p. m." a minutos totales (0-1440)
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0

    // Extraemos los números y el periodo (a o p)
    const match = timeStr.match(/(\d+):(\d+)\s*([ap])/i)
    if (!match) return 0

    let [, hours, minutes, period] = match
    hours = parseInt(hours, 10)
    minutes = parseInt(minutes, 10)
    const isPM = period.toLowerCase() === 'p'

    // Ajuste para formato 24 horas
    if (isPM && hours !== 12) hours += 12
    if (!isPM && hours === 12) hours = 0

    return hours * 60 + minutes
  }

  return (
    <>
      <div className='grid grid-cols-7 gap-2 text-xs'>
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, index) => (
          <div key={`${d}-${index}`} className='text-center text-slate-500 font-semibold'>
            {d}
          </div>
        ))}

        {cells.map((day, i) => {
          if (!day) return <div key={i} />

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
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
