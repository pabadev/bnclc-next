'use client'

import { useState, useEffect } from 'react'
import { calcularInversionesLocal } from '@/lib/localCalculations'
import { getFechaLocal, copyToClipboard as copyToClipboardUtil } from '@/lib/pageUtils'
import { validateCalculatorForm } from '@/lib/validators'
import { saveSesion } from '@/lib/bitacora'

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
  const [lastSubmittedValues, setLastSubmittedValues] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState('calculadora')
  const [sesiones, setSesiones] = useState([])
  const [saldoGlobal, setSaldoGlobal] = useState('0.00')
  const [bitacoraForm, setBitacoraForm] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: '',
    saldoInicial: '',
    saldoFinal: '',
    notas: ''
  })

  // --- MONTAJE E HIDRATACIÓN (SOLUCIÓN AL ERROR DE CONSOLA) ---

  useEffect(() => {
    setIsMounted(true)

    const hoy = getFechaLocal()

    const savedSesiones = localStorage.getItem('binacalc_sesiones')

    const savedSaldo = localStorage.getItem('binacalc_saldo_global')

    if (savedSesiones) setSesiones(JSON.parse(savedSesiones))

    if (savedSaldo) setSaldoGlobal(savedSaldo)

    setBitacoraForm((prev) => ({ ...prev, fecha: hoy }))
  }, [])

  useEffect(() => {
    if (isMounted) localStorage.setItem('binacalc_sesiones', JSON.stringify(sesiones))
  }, [sesiones, isMounted])

  useEffect(() => {
    if (isMounted) localStorage.setItem('binacalc_saldo_global', saldoGlobal)
  }, [saldoGlobal, isMounted])

  useEffect(() => {
    if (result) {
      setIsPulsing(true)

      const timer = setTimeout(() => setIsPulsing(false), 10000)

      return () => clearTimeout(timer)
    }
  }, [result])

  if (!isMounted) return <div className='min-h-screen bg-[#0a0f18]' />

  const hoyStr = getFechaLocal()

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

  const copyToClipboard = async (value, index) => {
    await copyToClipboardUtil(value)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const sesionesHoy = sesiones.filter((s) => s.fecha === hoyStr)

  const pnlHoy = sesionesHoy.reduce((acc, s) => acc + parseFloat(s.pnl), 0).toFixed(2)

  const pnlTotal = sesiones.reduce((acc, s) => acc + parseFloat(s.pnl), 0).toFixed(2)

  return (
    <div
      className='min-h-screen lg:h-screen flex flex-col bg-[#0a0f18] text-slate-200 font-sans lg:overflow-hidden'
      suppressHydrationWarning>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0f18;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;

          border-radius: 10px;
        }

        input[type='number'],
        input[type='time'],
        input[type='date'] {
          color-scheme: dark;
        }

        button,
        [role='button'] {
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
        }
      `}</style>

      <header className='flex-none h-16 flex items-center justify-center border-b border-slate-800 bg-[#0a0f18]'>
        <h1 className='text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>
          BINACALC
        </h1>
      </header>

      <div className='flex-1 w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 lg:min-h-0 max-w-2xl lg:max-w-[1600px]'>
        {/* PANEL IZQUIERDO: FORMULARIOS */}

        <aside className='lg:col-span-3 h-full min-h-0'>
          <div className='bg-[#161b26] p-6 rounded-2xl border border-slate-800 shadow-xl h-full flex flex-col'>
            <div className='flex items-center justify-between mb-6 border-b border-slate-700 pb-2'>
              <h2 className='text-lg font-semibold text-cyan-500'>
                {activeTab === 'calculadora' ? 'Calculadora' : 'Bitácora de sesiones'}
              </h2>

              <button
                onClick={() => setActiveTab(activeTab === 'calculadora' ? 'bitacora' : 'calculadora')}
                className='bg-[#0d1117] border border-slate-700 p-1 rounded-lg hover:border-cyan-500 transition-colors'>
                <div className='flex items-center gap-1.5 px-2 py-0.5'>
                  <span
                    className={`text-[10px] font-bold ${
                      activeTab === 'calculadora' ? 'text-cyan-400' : 'text-slate-500'
                    }`}>
                    Calc
                  </span>

                  <div className='w-4 h-2 bg-slate-700 rounded-full relative'>
                    <div
                      className={`absolute top-0 w-2 h-2 bg-cyan-500 rounded-full transition-all ${
                        activeTab === 'calculadora' ? 'left-0' : 'left-2'
                      }`}></div>
                  </div>

                  <span
                    className={`text-[10px] font-bold ${
                      activeTab === 'bitacora' ? 'text-emerald-400' : 'text-slate-500'
                    }`}>
                    Bitac
                  </span>
                </div>
              </button>
            </div>

            {activeTab === 'calculadora' ? (
              <form
                onSubmit={(e) => {
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
                }}
                className='flex-1 flex flex-col gap-3 lg:overflow-y-auto pr-1 custom-scrollbar'>
                {[
                  { label: 'Saldo Actual', name: 'saldoActual', min: '1' },

                  { label: 'Inversión Inicial', name: 'inversionInicial', min: '1' },

                  {
                    label: 'Porcentaje Broker (%)',

                    name: 'porcentajeGanancia',

                    placeholder: 'Ej: 80',

                    max: '99',

                    min: '50'
                  },

                  { label: 'Ganancia Esperada', name: 'gananciaEsperada', min: '0' }
                ].map((field) => (
                  <div key={field.name} className='space-y-1'>
                    <div className='flex justify-between items-center'>
                      <label className='text-[15px] text-slate-300 font-semibold'>{field.label}</label>

                      {errors[field.name] && (
                        <span className='text-[11px] text-rose-400 font-bold animate-pulse'>{errors[field.name]}</span>
                      )}
                    </div>

                    <input
                      name={field.name}
                      type='number'
                      step='any'
                      min={field.min}
                      max={field.max}
                      required
                      value={formValues[field.name]}
                      onChange={(e) => {
                        if (errors[field.name]) setErrors({ ...errors, [field.name]: null })

                        handleChange(e)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === '-' || e.key === 'e' || e.key === 'E') e.preventDefault()
                      }}
                      className={`w-full bg-[#0d1117] border ${
                        errors[field.name] ? 'border-rose-500/50' : 'border-slate-700'
                      } rounded-lg p-2 focus:border-cyan-500 outline-none text-white font-mono transition-colors`}
                      placeholder='0.00'
                    />
                  </div>
                ))}

                <button
                  type='submit'
                  disabled={loading || JSON.stringify(formValues) === JSON.stringify(lastSubmittedValues)}
                  className='w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl mt-4 disabled:opacity-40 transition-all active:scale-[0.98]'>
                  {loading ? 'Procesando...' : 'Calcular'}
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleGuardarSesion}
                className='flex-1 flex flex-col gap-2.5 lg:overflow-y-auto pr-1 custom-scrollbar'>
                <div className='flex items-center justify-between py-1'>
                  <label className='text-[13px] text-slate-300 font-semibold'>Fecha</label>

                  <input
                    name='fecha'
                    type='date'
                    required
                    max={hoyStr}
                    value={bitacoraForm.fecha}
                    onChange={handleBitacoraChange}
                    className='w-36 bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1.5 text-white text-sm outline-none focus:border-emerald-500'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4 py-1'>
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-[12px] text-slate-300 font-bold'>Hora inicio</label>

                    <input
                      name='horaInicio'
                      type='time'
                      required
                      value={bitacoraForm.horaInicio}
                      onChange={handleBitacoraChange}
                      className='w-full bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1.5 text-white text-sm outline-none focus:border-emerald-500'
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label className='text-[12px] text-slate-300 font-bold'>Hora fin</label>

                    <input
                      name='horaFin'
                      type='time'
                      required
                      value={bitacoraForm.horaFin}
                      onChange={handleBitacoraChange}
                      className='w-full bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1.5 text-white text-sm outline-none focus:border-emerald-500'
                    />
                  </div>
                </div>

                <div className='flex items-center justify-between py-2 border-b border-slate-800/50'>
                  <label className='text-[13px] text-slate-300 font-semibold'>Saldo inicial</label>

                  <input
                    name='saldoInicial'
                    type='number'
                    step='any'
                    min='0'
                    required
                    value={bitacoraForm.saldoInicial}
                    onChange={handleBitacoraChange}
                    className='w-28 bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-sm text-right outline-none focus:border-emerald-500'
                    placeholder='0.00'
                  />
                </div>

                <div className='flex items-center justify-between py-2 border-b border-slate-800/50'>
                  <label className='text-[13px] text-slate-300 font-semibold'>Saldo final</label>

                  <input
                    name='saldoFinal'
                    type='number'
                    step='any'
                    min='0'
                    required
                    value={bitacoraForm.saldoFinal}
                    onChange={handleBitacoraChange}
                    className='w-28 bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-sm text-right outline-none focus:border-emerald-500'
                    placeholder='0.00'
                  />
                </div>

                <div className='space-y-1.5 mt-1'>
                  <label className='text-[13px] text-slate-300 font-semibold'>Notas</label>

                  <textarea
                    name='notas'
                    value={bitacoraForm.notas}
                    onChange={handleBitacoraChange}
                    className='w-full bg-[#0d1117] border border-slate-700 rounded-lg p-2 text-white text-sm h-12 resize-none outline-none focus:border-emerald-500'
                    placeholder='Comentarios de la sesión...'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl mt-4 text-sm transition-colors shadow-lg active:scale-[0.98]'>
                  Guardar Sesión
                </button>
              </form>
            )}
          </div>
        </aside>

        {/* PANEL CENTRAL: RESULTADOS / HISTORIAL */}

        <main className='lg:col-span-6 flex flex-col h-full min-h-0 space-y-4'>
          {activeTab === 'bitacora' && (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 flex-none'>
              {[
                {
                  label: 'Hoy',
                  val: pnlHoy,
                  color: parseFloat(pnlHoy) >= 0 ? 'text-emerald-400' : 'text-rose-400',
                  prefix: parseFloat(pnlHoy) >= 0 ? '+$' : '$'
                },

                {
                  label: 'Histórico',
                  val: pnlTotal,
                  color: parseFloat(pnlTotal) >= 0 ? 'text-cyan-400' : 'text-rose-400',
                  prefix: parseFloat(pnlTotal) >= 0 ? '+$' : '$'
                },

                { label: 'Sesiones hoy', val: sesionesHoy.length, color: 'text-blue-400', prefix: '' }
              ].map((card, i) => (
                <div key={i} className='bg-[#161b26] p-3 rounded-xl border border-slate-800 text-center shadow-lg'>
                  <p className='text-[14px] text-slate-300 font-semibold tracking-wider mb-1'>{card.label}</p>

                  <p className={`text-sm md:text-base font-mono font-bold ${card.color}`}>
                    {card.prefix}
                    {card.val}
                  </p>
                </div>
              ))}

              <div className='bg-[#161b26] p-3 rounded-xl border border-slate-800 text-center shadow-lg'>
                <p className='text-[14px] text-slate-300 font-semibold tracking-wider mb-1'>Saldo</p>

                <div className='flex items-center justify-center gap-1'>
                  <span className='text-xs text-white'>$</span>

                  <input
                    type='number'
                    step='any'
                    value={saldoGlobal}
                    onChange={(e) => setSaldoGlobal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e' || e.key === 'E') e.preventDefault()
                    }}
                    style={{ width: `${Math.max(4, (saldoGlobal || '').toString().length + 2)}ch` }}
                    className='bg-transparent font-mono font-bold text-sm md:text-base text-white outline-none focus:border-b border-cyan-500 text-center transition-all'
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
                  <p className='text-xs md:text-sm text-slate-100 font-medium text-center'>
                    Calma, solo necesitas acertar una de {result.counter}.
                  </p>
                </div>

                <div className='flex-1 lg:overflow-y-auto pr-2 custom-scrollbar space-y-2'>
                  {result.resultados.map((op, index) => (
                    <div
                      key={index}
                      className='group bg-[#161b26]/60 hover:bg-[#1f2635] p-3 rounded-xl border border-slate-800/50 flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        <div className='bg-[#0d1117] text-slate-300 group-hover:text-cyan-400 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border border-slate-800'>
                          {index + 1}
                        </div>

                        <div>
                          <p className='text-[9px] text-slate-500 uppercase font-bold mb-0.5'>Monto Inv.</p>

                          <div className='flex items-center gap-2'>
                            <p className='font-mono text-lg text-blue-300'>${op.inversion}</p>

                            {/* Contenedor del botón con Tooltip */}

                            <div className='relative flex items-center group/tooltip'>
                              <button
                                type='button'
                                onClick={() => copyToClipboard(op.inversion, index)}
                                className={`p-1 rounded transition-all ${
                                  copiedIndex === index ? 'text-emerald-400' : 'text-slate-500 hover:text-white'
                                }`}>
                                {copiedIndex === index ? (
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='14'
                                    height='14'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'>
                                    <polyline points='20 6 9 17 4 12'></polyline>
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='14'
                                    height='14'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'>
                                    <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>

                                    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
                                  </svg>
                                )}
                              </button>

                              {/* Etiqueta flotante (Tooltip) */}

                              <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-bold text-white bg-slate-800 rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-slate-700'>
                                {copiedIndex === index ? 'Copiado' : 'Copiar'}

                                {/* Triangulito del tooltip */}

                                <span className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800'></span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='flex gap-2 md:gap-8'>
                        <div className='text-right'>
                          <p className='text-[11px] text-slate-300 font-bold'>Ganancia</p>

                          <p className='font-mono text-[12px] md:text-base text-emerald-500'>${op.ganancia}</p>
                        </div>

                        <div className='text-right pl-2 md:pl-4'>
                          <p className='text-[11px] text-slate-300 font-bold'>Acumulado</p>

                          <p className='font-mono text-[12px] md:text-base text-blue-500'>${op.acumulado}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className='flex-1 border-2 border-dashed border-slate-800 rounded-3xl flex items-center justify-center text-slate-600 text-center px-6 min-h-[200px]'>
                Ingresa los parámetros para ver la secuencia
              </div>
            )
          ) : (
            <div className='flex-1 bg-[#161b26] rounded-2xl border border-slate-800 p-4 flex flex-col min-h-0 shadow-xl'>
              <h3 className='text-sm font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2 text-center uppercase tracking-widest'>
                HISTORIAL DE SESIONES
              </h3>

              <div className='flex-1 overflow-y-auto custom-scrollbar space-y-3'>
                {sesiones.length > 0 ? (
                  sesiones.map((ses) => (
                    <div
                      key={ses.id}
                      className='bg-[#0d1117] px-5 py-3 rounded-xl border border-slate-800 flex flex-col gap-2 hover:border-slate-600 transition-colors'>
                      <div className='flex justify-between items-center'>
                        <span className='text-[12px] text-slate-200 font-bold'>
                          {ses.fecha.split('-').reverse().join('-')} | {ses.horaInicio} a {ses.horaFin}
                        </span>

                        <span
                          className={`text-[15px] font-black font-mono ${
                            parseFloat(ses.pnl) >= 0 ? 'text-emerald-500' : 'text-rose-500'
                          }`}>
                          <span className='hidden md:inline'>
                            {parseFloat(ses.pnl) >= 0 ? 'Ganancia ' : 'Pérdida '}
                          </span>
                          ({parseFloat(ses.pnl) >= 0 ? '+' : ''}
                          {ses.pnl})
                        </span>
                      </div>

                      <div className='flex gap-4 text-[11px] text-slate-300 font-semibold border-t border-slate-800/50 pt-1'>
                        <span>Inicial: ${ses.saldoInicial}</span>

                        <span>Final: ${ses.saldoFinal}</span>
                      </div>

                      {ses.notas && (
                        <p className='text-xs text-slate-300 italic bg-[#161b26] p-2 rounded'>"{ses.notas}"</p>
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
          )}
        </main>

        <aside className='lg:col-span-3 h-full min-h-0'>
          <div className='bg-[#161b26] p-6 rounded-2xl border border-slate-800 shadow-xl h-full flex flex-col'>
            <h2 className='text-lg text-center font-semibold mb-6 border-b border-slate-700 pb-2 text-cyan-500'>
              Brokers recomendados
            </h2>
            <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 flex flex-col'>
              {/* BLOQUE IQ OPTION */}
              <div className='w-full rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] min-h-[140px] relative group'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://affiliate.iqoption.net/redir/?aff=251189&aff_model=revenue&afftrack=binacalc'
                  className='w-full h-full flex flex-col items-center justify-center p-4'>
                  <div className='absolute inset-0 flex items-center justify-center bg-[#0d1117] group-hover:bg-[#161b26] transition-colors'>
                    <span className='text-orange-500 font-bold text-xl'>IQ Option</span>
                  </div>
                  <img
                    alt='IQ Option'
                    src='https://static.cdnaffs.com/files/storage/public/5d/88/e858a04005i8f0c5d0.gif'
                    className='w-full h-auto relative z-10'
                  />
                </a>
              </div>
              {/* BLOQUE OLYMP TRADE */}
              <div className='w-full rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] min-h-[140px] relative group'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://static.olymptrade.com/lands/GA-LPL65-01-02es/index.html?af_siteid=GA-LPL65-01-02es&affiliate_id=2246874'
                  className='w-full h-full flex flex-col items-center justify-center p-4'>
                  <div className='absolute inset-0 flex items-center justify-center bg-[#0d1117] group-hover:bg-[#161b26] transition-colors'>
                    <span className='text-blue-500 font-bold text-xl'>Olymp Trade</span>
                  </div>
                  <img
                    alt='Olymp Trade'
                    src='https://promo.kingfin.com/banners/82374_92dd9e573ee3d930cdb8e88d32a110c2.png'
                    className='w-full h-auto relative z-10'
                  />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
