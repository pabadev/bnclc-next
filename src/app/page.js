'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import BrokersPanel from '@/components/BrokersPanel'
import CalculatorForm from '@/components/CalculatorForm'
import ResultsList from '@/components/ResultsList'
import BitacoraForm from '@/components/BitacoraForm'
import SessionsHistory from '@/components/SessionsHistory'
import { calcularInversionesLocal } from '@/lib/localCalculations'
import { getFechaLocal, copyToClipboard as copyToClipboardUtil } from '@/lib/pageUtils'
import { validateCalculatorForm } from '@/lib/validators'
import { saveSesion } from '@/lib/bitacora'
import ViewToggle from '@/components/ViewToggle'

export default function Dashboard() {
  // --- LÓGICA DE FECHA LOCAL ---
  // Usamos la utilidad externa `getFechaLocal`

  // --- ESTADOS ---

  const [isMounted, setIsMounted] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [formValues, setFormValues] = useState({
    saldoActual: '',
    inversionInicial: '',
    porcentajeGanancia: '',
    gananciaEsperada: ''
  })

  const [errors, setErrors] = useState({})
  const [lastSubmittedValues, setLastSubmittedValues] = useState({})
  const [activeTab, setActiveTab] = useState('calculadora')

  const [hoyStr, setHoyStr] = useState('')

  const [bitacoraForm, setBitacoraForm] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: '',
    saldoInicial: '',
    saldoFinal: '',
    notas: ''
  })

  const [sesiones, setSesiones] = useState([])
  const [saldoGlobal, setSaldoGlobal] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [sessionsView, setSessionsView] = useState('list') // 'list' | 'calendar'

  // --- TU LÓGICA ORIGINAL DE CALCULATION.JS (FRONTEND) ---

  const handleLocalCalculate = () => {
    setLoading(true)

    // Simulamos un pequeño delay para el feedback visual del botón
    setTimeout(() => {
      const { saldoActual, inversionInicial, porcentajeGanancia, gananciaEsperada } = formValues
      const { inversiones, saldoFaltante, saldoSobrante, counter } = calcularInversionesLocal(
        saldoActual,
        inversionInicial,
        porcentajeGanancia,
        gananciaEsperada
      )

      setResult({
        resultados: inversiones,
        saldoFaltante: String(saldoFaltante),
        saldoSobrante: String(saldoSobrante),
        counter
      })

      setLoading(false)
    }, 300)
  }

  // --- MANEJADORES DE EVENTOS ---

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleFieldChange = (e) => {
    const { name } = e.target
    if (errors[name]) setErrors({ ...errors, [name]: null })
    handleChange(e)
  }

  const handleCalculatorSubmit = (e) => {
    e.preventDefault()

    if (JSON.stringify(formValues) === JSON.stringify(lastSubmittedValues)) return

    const newErrors = validateCalculatorForm(formValues)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLastSubmittedValues({ ...formValues })
    handleLocalCalculate()
  }

  const handleBitacoraChange = (e) => {
    const { name, value } = e.target
    setBitacoraForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleGuardarSesion = (e) => {
    e.preventDefault()

    if (bitacoraForm.fecha > hoyStr) {
      alert('No puedes registrar sesiones en fechas futuras.')
      return
    }

    const { nuevasSesiones, nuevoSaldoGlobal } = saveSesion(bitacoraForm, sesiones, hoyStr)

    if (nuevoSaldoGlobal !== null) setSaldoGlobal(nuevoSaldoGlobal)

    setSesiones(nuevasSesiones)

    setBitacoraForm({ fecha: hoyStr, horaInicio: '', horaFin: '', saldoInicial: '', saldoFinal: '', notas: '' })
  }

  // --- NUEVOS MANEJADORES PARA HISTORIAL DE SESIONES ---

  const handleDeleteSesion = (id) => {
    setSesiones((prev) => prev.filter((s) => s.id !== id))
  }

  const handleDeleteManySesiones = (ids) => {
    setSesiones((prev) => prev.filter((s) => !ids.includes(s.id)))
  }

  const handleUpdateSesionNotes = (id, notas) => {
    setSesiones((prev) => prev.map((s) => (s.id === id ? { ...s, notas } : s)))
  }

  const copyToClipboard = async (value, index) => {
    await copyToClipboardUtil(value)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const sesionesHoy = sesiones.filter((s) => s.fecha === hoyStr)

  const pnlHoy = sesionesHoy.reduce((acc, s) => acc + parseFloat(s.pnl), 0).toFixed(2)

  const pnlTotal = sesiones.reduce((acc, s) => acc + parseFloat(s.pnl), 0).toFixed(2)

  // --- MONTAJE E HIDRATACIÓN: cargar desde localStorage sólo en cliente ---
  useEffect(() => {
    setIsMounted(true)

    const hoy = getFechaLocal()
    setHoyStr(hoy)

    try {
      const savedSesiones = localStorage.getItem('binacalc_sesiones')
      const savedSaldo = localStorage.getItem('binacalc_saldo_global')

      if (savedSesiones) setSesiones(JSON.parse(savedSesiones))
      if (savedSaldo) setSaldoGlobal(savedSaldo)
    } catch (err) {
      console.warn('No se pudo acceder a localStorage:', err)
    }

    setBitacoraForm((prev) => ({ ...prev, fecha: hoy }))
  }, [])

  // Persistir sesiones en localStorage cuando cambian (y sólo en cliente)
  useEffect(() => {
    if (!isMounted) return
    try {
      localStorage.setItem('binacalc_sesiones', JSON.stringify(sesiones))
    } catch (err) {
      console.warn('Error guardando sesiones en localStorage:', err)
    }
  }, [sesiones, isMounted])

  // Persistir saldoGlobal en localStorage
  useEffect(() => {
    if (!isMounted) return
    try {
      localStorage.setItem('binacalc_saldo_global', saldoGlobal)
    } catch (err) {
      console.warn('Error guardando saldoGlobal en localStorage:', err)
    }
  }, [saldoGlobal, isMounted])

  // Efecto visual al recibir resultados
  useEffect(() => {
    if (result) {
      setIsPulsing(true)
      const timer = setTimeout(() => setIsPulsing(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [result])

  if (!isMounted) return <div className='min-h-screen bg-[#0a0f18]' />

  return (
    <div
      className='min-h-screen lg:h-screen flex flex-col bg-[#0a0f18] text-slate-200 font-sans lg:overflow-hidden'
      suppressHydrationWarning>
      {/* global styles moved to src/app/globals.css to avoid styled-jsx hydration issues */}

      {/* Header moved to component to keep page.js clean; styles intact */}
      {}
      <Header />

      <div className='flex-1 w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 lg:min-h-0 max-w-2xl lg:max-w-[1600px]'>
        {/* PANEL IZQUIERDO: FORMULARIOS */}

        <aside className='lg:col-span-3 h-full min-h-0'>
          <div className='bg-[#161b26] p-6 rounded-2xl border border-slate-800 shadow-xl h-full flex flex-col'>
            <div className='flex items-center justify-between mb-6 border-b border-slate-700 pb-2'>
              <h2 className='text-lg font-semibold text-cyan-500'>
                {activeTab === 'calculadora' ? 'Calculadora' : 'Bitácora de sesiones'}
              </h2>

              <ViewToggle
                options={[
                  { value: 'calculadora', label: 'Calc' },
                  { value: 'bitacora', label: 'Bit' }
                ]}
                value={activeTab}
                onChange={setActiveTab}
              />
            </div>

            {activeTab === 'calculadora' ? (
              <CalculatorForm
                formValues={formValues}
                errors={errors}
                onFieldChange={handleFieldChange}
                onSubmit={handleCalculatorSubmit}
                loading={loading}
                lastSubmittedValues={lastSubmittedValues}
              />
            ) : (
              <BitacoraForm
                bitacoraForm={bitacoraForm}
                onChange={handleBitacoraChange}
                onSubmit={handleGuardarSesion}
                hoyStr={hoyStr}
              />
            )}
          </div>
        </aside>

        {/* PANEL CENTRAL: RESULTADOS / HISTORIAL */}

        <main className='lg:col-span-6 flex flex-col h-full min-h-0 space-y-4'>
          {activeTab === 'bitacora' && (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 flex-none font-semibold'>
              {[
                {
                  label: 'Gan/Per Hoy',
                  val: pnlHoy,
                  color: parseFloat(pnlHoy) >= 0 ? 'text-emerald-200' : 'text-rose-300',
                  prefix: parseFloat(pnlHoy) >= 0 ? '+$' : '$'
                },

                {
                  label: 'Gan/Per Gral.',
                  val: pnlTotal,
                  color: parseFloat(pnlTotal) >= 0 ? 'text-cyan-400' : 'text-rose-400',
                  prefix: parseFloat(pnlTotal) >= 0 ? '+$' : '$'
                },

                { label: 'Sesiones hoy', val: sesionesHoy.length, color: 'text-blue-400', prefix: '' }
              ].map((card, i) => (
                <div key={i} className='bg-[#161b26] p-3 rounded-xl border border-slate-800 text-center shadow-lg'>
                  <p className='text-[12px] text-slate-300 font-semibold tracking-wider mb-1'>{card.label}</p>

                  <p className={`text-sm md:text-base font-mono font-semibold ${card.color}`}>
                    {card.prefix}
                    {card.val}
                  </p>
                </div>
              ))}

              <div className='bg-[#161b26] p-3 rounded-xl border border-slate-800 text-center shadow-lg'>
                <p className='text-[12px] text-slate-300 font-semibold tracking-wider mb-1'>Saldo actual</p>

                <div className='flex items-center justify-center gap-0'>
                  <span className='text-xs text-emerald-400'>$</span>

                  <input
                    type='number'
                    step='any'
                    value={saldoGlobal}
                    onChange={(e) => setSaldoGlobal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e' || e.key === 'E') e.preventDefault()
                    }}
                    style={{ width: `${Math.max(4, (saldoGlobal || '').toString().length + 2)}ch` }}
                    className='bg-transparent font-mono font-semibold text-sm md:text-base text-emerald-400 outline-none focus:border-b border-cyan-500 text-center transition-all'
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calculadora' ? (
            result ? (
              <>
                <div className='flex-none flex items-center justify-between bg-[#161b26] p-2 rounded-2xl border border-slate-800 shadow-xl'>
                  <div className='text-center border-r border-slate-700 flex-1'>
                    <p className='text-[14px] text-slate-300 font-semibold'>Operaciones</p>
                    <p className='text-base font-bold text-emerald-400'>{result.counter}</p>
                  </div>

                  <div className='text-center border-r border-slate-700 flex-1'>
                    <p className='text-[14px] text-slate-300 font-semibold'>Sobrante</p>
                    <p className='text-base font-mono text-blue-400'>${result.saldoSobrante}</p>
                  </div>

                  <div className='text-center flex-1'>
                    <p className='text-[14px] text-slate-300 font-semibold tracking-tighter'>
                      Faltante op. {result.counter + 1}
                    </p>
                    <p className='text-base font-mono text-rose-400'>${result.saldoFaltante}</p>
                  </div>
                </div>

                <div
                  className={`flex-none bg-cyan-950/20 border border-cyan-800/30 px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    isPulsing ? 'animate-pulse' : ''
                  }`}>
                  <span className='text-xs md:text-sm text-slate-100 font-medium text-center hidden md:block'>
                    ¡Calma!...
                  </span>
                  <p className='text-xs md:text-sm text-slate-100 font-medium text-center'>
                    Solo necesitas acertar 1 de {result.counter}.
                  </p>
                  <span className='text-xs md:text-sm font-medium text-cyan-400'>
                    ({+((1 / result.counter) * 100).toFixed(2)}% de acierto)
                  </span>
                </div>

                <ResultsList resultados={result.resultados} copiedIndex={copiedIndex} onCopy={copyToClipboard} />
              </>
            ) : (
              <div className='flex flex-1 border-2 border-dashed border-slate-800 rounded-3xl flex items-center justify-center text-slate-600 text-center px-6 min-h-[200px]'>
                Ingresa los parámetros para ver la secuencia
              </div>
            )
          ) : (
            <SessionsHistory
              sesiones={sesiones}
              onDelete={handleDeleteSesion}
              onDeleteMany={handleDeleteManySesiones}
              onUpdateNotes={handleUpdateSesionNotes}
              viewMode={sessionsView}
              onChangeView={setSessionsView}
            />
          )}
        </main>

        <BrokersPanel />
      </div>
    </div>
  )
}
