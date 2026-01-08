'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import CalculatorForm from '@/components/CalculatorForm'
import ResultsList from '@/components/ResultsList'
import BitacoraForm from '@/components/BitacoraForm'
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

              <button
                onClick={() => setActiveTab(activeTab === 'calculadora' ? 'bitacora' : 'calculadora')}
                className='bg-[#0d1117] border border-emerald-700 p-1 rounded-lg hover:border-cyan-500 transition-colors'>
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
                    Bit
                  </span>
                </div>
              </button>
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
            <div className='font-semibold grid grid-cols-2 md:grid-cols-4 gap-3 flex-none'>
              {[
                {
                  label: 'Hoy',
                  val: pnlHoy,
                  color: parseFloat(pnlHoy) >= 0 ? 'text-emerald-400' : 'text-rose-300',
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

                  <p className={`text-sm md:text-base font-mono font-semibold ${card.color}`}>
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
                    className='bg-transparent font-mono font-semibold text-sm md:text-base text-white outline-none focus:border-b border-cyan-500 text-center transition-all'
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
                          className={`text-[15px] font-mono ${
                            parseFloat(ses.pnl) >= 0 ? 'text-emerald-500' : 'text-rose-300'
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
