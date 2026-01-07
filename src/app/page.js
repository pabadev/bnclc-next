'use client'

import { useState, useEffect } from 'react'
<<<<<<< HEAD
import Link from 'next/link'

export default function Dashboard() {
  // --- LÓGICA DE FECHA LOCAL ---
=======

export default function Dashboard() {
  // --- LÓGICA DE FECHA LOCAL ---

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
  const getFechaLocal = () => {
    const hoy = new Date()

    return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(
      2,

      '0'
    )}`
  }

  // --- ESTADOS ---
<<<<<<< HEAD
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
=======

  const [isMounted, setIsMounted] = useState(false)

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
  const [result, setResult] = useState(null)

  const [loading, setLoading] = useState(false)

  const [isPulsing, setIsPulsing] = useState(false)

  const [formValues, setFormValues] = useState({
    saldoActual: '',

    inversionInicial: '',

    porcentajeGanancia: '',
<<<<<<< HEAD
    gananciaExtra: ''
=======

    gananciaEsperada: ''
>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
  })

  const [lastSubmittedValues, setLastSubmittedValues] = useState(null)

  const [copiedIndex, setCopiedIndex] = useState(null)

  const [errors, setErrors] = useState({})
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
  const [activeTab, setActiveTab] = useState('calculadora')

  const [sesiones, setSesiones] = useState([])

  const [saldoGlobal, setSaldoGlobal] = useState('0.00')

  const [bitacoraForm, setBitacoraForm] = useState({
    fecha: '',
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
    horaInicio: '',

    horaFin: '',

    saldoInicial: '',

    saldoFinal: '',

    notas: ''
  })

  // --- MONTAJE E HIDRATACIÓN (SOLUCIÓN AL ERROR DE CONSOLA) ---
<<<<<<< HEAD
  useEffect(() => {
    setIsMounted(true)
    const hoy = getFechaLocal()
=======

  useEffect(() => {
    setIsMounted(true)

    const hoy = getFechaLocal()

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
    const savedSesiones = localStorage.getItem('binacalc_sesiones')

    const savedSaldo = localStorage.getItem('binacalc_saldo_global')

    if (savedSesiones) setSesiones(JSON.parse(savedSesiones))

    if (savedSaldo) setSaldoGlobal(savedSaldo)
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
  const handleLocalCalculate = () => {
    setLoading(true)

    // Simulamos un pequeño delay para el feedback visual del botón
<<<<<<< HEAD
    setTimeout(() => {
      const { saldoActual, inversionInicial, porcentajeGanancia, gananciaExtra } = formValues

      const saldoNum = parseFloat(saldoActual)
      const inversionIniNum = parseFloat(inversionInicial)
      const porcentajeNum = parseFloat(porcentajeGanancia)
      const gananciaEspNum = parseFloat(gananciaExtra)

      let inversiones = []
=======

    setTimeout(() => {
      const { saldoActual, inversionInicial, porcentajeGanancia, gananciaEsperada } = formValues

      const saldoNum = parseFloat(saldoActual)

      const inversionIniNum = parseFloat(inversionInicial)

      const porcentajeNum = parseFloat(porcentajeGanancia)

      const gananciaEspNum = parseFloat(gananciaEsperada)

      let inversiones = []

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
      let acumulado = 0

      for (let i = 0; i < 20; i++) {
        let inversion = i === 0 ? inversionIniNum : (acumulado + gananciaEspNum) / (porcentajeNum / 100)
<<<<<<< HEAD
        let ganancia = inversion * (porcentajeNum / 100)
=======

        let ganancia = inversion * (porcentajeNum / 100)

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
        let siguienteAcumulado = acumulado + inversion

        if (siguienteAcumulado > saldoNum) {
          const saldoFaltante = (siguienteAcumulado - saldoNum).toFixed(2)
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
          const saldoSobrante = (saldoNum - acumulado).toFixed(2)

          setResult({
            resultados: inversiones, // Mantenemos el nombre 'resultados' para el map del JSX
<<<<<<< HEAD
            saldoFaltante,
            saldoSobrante,
            counter: inversiones.length
          })
          setLoading(false)
=======

            saldoFaltante,

            saldoSobrante,

            counter: inversiones.length
          })

          setLoading(false)

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
          return
        }

        acumulado = siguienteAcumulado
<<<<<<< HEAD
        inversiones.push({
          numero: i + 1,
          inversion: inversion.toFixed(2),
          porcentaje: porcentajeNum.toFixed(2),
          ganancia: ganancia.toFixed(2),
=======

        inversiones.push({
          numero: i + 1,

          inversion: inversion.toFixed(2),

          porcentaje: porcentajeNum.toFixed(2),

          ganancia: ganancia.toFixed(2),

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
          acumulado: acumulado.toFixed(2)
        })
      }

      setResult({
        resultados: inversiones,
<<<<<<< HEAD
        saldoFaltante: '0.00',
        saldoSobrante: (saldoNum - acumulado).toFixed(2),
        counter: inversiones.length
      })
=======

        saldoFaltante: '0.00',

        saldoSobrante: (saldoNum - acumulado).toFixed(2),

        counter: inversiones.length
      })

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
      setLoading(false)
    }, 300)
  }

  // --- MANEJADORES DE EVENTOS ---
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
    if (bitacoraForm.fecha > hoyStr) {
      alert('No puedes registrar sesiones en fechas futuras.')

      return
    }
    const pnl = parseFloat(bitacoraForm.saldoFinal) - parseFloat(bitacoraForm.saldoInicial)

    const timestampFinNueva = new Date(`${bitacoraForm.fecha}T${bitacoraForm.horaFin}`).getTime()
<<<<<<< HEAD
    const nuevaSesion = { ...bitacoraForm, id: Date.now(), pnl: pnl.toFixed(2), timestampFin: timestampFinNueva }
=======

    const nuevaSesion = { ...bitacoraForm, id: Date.now(), pnl: pnl.toFixed(2), timestampFin: timestampFinNueva }

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
    const esLaMasReciente =
      sesiones.length === 0 || timestampFinNueva > Math.max(...sesiones.map((s) => s.timestampFin))

    if (esLaMasReciente) setSaldoGlobal(bitacoraForm.saldoFinal)
    const nuevasSesiones = [...sesiones, nuevaSesion].sort((a, b) => b.timestampFin - a.timestampFin)

    setSesiones(nuevasSesiones)
<<<<<<< HEAD
    setBitacoraForm({ fecha: hoyStr, horaInicio: '', horaFin: '', saldoInicial: '', saldoFinal: '', notas: '' })
  }

  const copyToClipboard = async (value, index) => {
    const textToCopy = value.toString().replace('.', ',')
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      const textArea = document.createElement('textarea')
      textArea.value = textToCopy
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  const sesionesHoy = sesiones.filter((s) => s.fecha === hoyStr)
  const pnlHoy = sesionesHoy.reduce((acc, s) => acc + parseFloat(s.pnl), 0).toFixed(2)
=======

    setBitacoraForm({ fecha: hoyStr, horaInicio: '', horaFin: '', saldoInicial: '', saldoFinal: '', notas: '' })
  }

  const copyToClipboard = async (value, index) => {
    const textToCopy = value.toString().replace('.', ',')

    try {
      await navigator.clipboard.writeText(textToCopy)

      setCopiedIndex(index)

      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      const textArea = document.createElement('textarea')

      textArea.value = textToCopy

      document.body.appendChild(textArea)

      textArea.select()

      document.execCommand('copy')

      document.body.removeChild(textArea)

      setCopiedIndex(index)

      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  const sesionesHoy = sesiones.filter((s) => s.fecha === hoyStr)

  const pnlHoy = sesionesHoy.reduce((acc, s) => acc + parseFloat(s.pnl), 0).toFixed(2)

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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

      <header className='flex-none border-b border-slate-800 bg-[#0a0f18] relative z-50'>
        {/* Contenedor con ancho máximo alineado con el body */}
        <div className='max-w-[1600px] mx-auto h-16 flex items-center justify-between px-2 md:px-4'>
          {/* LOGO CONTAINER (Convertido en Link) */}
          <Link
            href='/'
            className='flex-shrink-0 bg-slate-950/50 border border-slate-800/60 px-4 py-2 rounded-xl backdrop-blur-sm shadow-inner group transition-all hover:border-cyan-500/30 active:scale-95 cursor-pointer outline-none'>
            <div className='flex flex-col items-start'>
              {/* Título Principal */}
              <h1 className='text-xl md:text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-none'>
                BINACALC
              </h1>

              {/* Slogan alineado */}
              <p className='text-[8px] md:text-[10px] uppercase font-medium text-slate-300 tracking-[0.15em] md:tracking-[0.12em] leading-none mt-1.5 select-none group-hover:text-slate-200 transition-colors'>
                Trading bajo control
              </p>
            </div>
          </Link>

          {/* NAVEGACIÓN (Derecha - Escritorio) */}
          <div className='hidden md:flex items-center gap-6'>
            {/* Navegación dentro del Header */}
            <nav className='hidden md:flex items-center gap-6'>
              {/* Opción Simple */}
              <a href='#' className='text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
                Blog
              </a>

              {/* Menú Desplegable de Herramientas */}
              <div className='relative group/menu'>
                <button className='flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
                  Herramientas
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </button>

                {/* Dropdown al hacer Hover */}
                <div className='absolute top-full left-0 mt-2 w-56 bg-[#161b26] border border-slate-800 rounded-xl shadow-2xl py-3 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-[70]'>
                  <a href='#' className='flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors'>
                    <div className='p-1.5 bg-amber-500/10 rounded-lg text-amber-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'>
                        <rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
                        <line x1='16' x2='16' y1='2' y2='6' />
                        <line x1='8' x2='8' y1='2' y2='6' />
                        <line x1='3' x2='21' y1='10' y2='10' />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm text-white font-bold'>Calendario Económico</p>
                      <p className='text-[10px] text-slate-500'>Evita noticias volátiles</p>
                    </div>
                  </a>

                  <a href='#' className='flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors'>
                    <div className='p-1.5 bg-cyan-500/10 rounded-lg text-cyan-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'>
                        <circle cx='12' cy='12' r='10' />
                        <polyline points='12 6 12 12 16 14' />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm text-white font-bold'>Sesiones de Mercado</p>
                      <p className='text-[10px] text-slate-500'>Londres / NY / Tokio</p>
                    </div>
                  </a>
                </div>
              </div>

              <a href='#' className='text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
                Telegram
              </a>
              <a href='#' className='text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
                Ingresar
              </a>
              <button className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-900/20'>
                Registrarse
              </button>
            </nav>

            {/* DIVISOR */}
            <div className='h-8 w-px bg-slate-800 mx-2'></div>

            {/* PERFIL DE USUARIO */}
            <div className='relative'>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='w-10 h-10 rounded-full border-2 border-slate-700 hover:border-cyan-500 transition-all overflow-hidden bg-slate-800 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-slate-400'>
                  <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                  <circle cx='12' cy='7' r='4'></circle>
                </svg>
              </button>

              {/* Dropdown de Perfil */}
              {isProfileOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-[#161b26] border border-slate-800 rounded-xl shadow-2xl py-2 overflow-hidden'>
                  <div className='px-4 py-2 border-b border-slate-800 mb-1'>
                    <p className='text-xs text-slate-500 font-bold uppercase'>Usuario</p>
                    <p className='text-sm text-white truncate'>trader@binacalc.com</p>
                  </div>
                  <button className='w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors'>
                    Mi Perfil
                  </button>
                  <button className='w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors'>
                    Configuración
                  </button>
                  <button className='w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-slate-800 mt-1'>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BOTÓN MENÚ MÓVIL */}
          <div className='md:hidden flex items-center gap-4'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-2 text-slate-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                {isMenuOpen ? (
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                ) : (
                  <line x1='3' y1='12' x2='21' y2='12'></line>
                )}
                {!isMenuOpen && <line x1='3' y1='6' x2='21' y2='6'></line>}
                {!isMenuOpen && <line x1='3' y1='18' x2='21' y2='18'></line>}
              </svg>
            </button>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL (Ancho completo o contenido limitado) */}
        {isMenuOpen && (
          <div className='absolute top-full left-0 w-full bg-[#0d1117] border-b border-slate-800 flex flex-col p-4 gap-4 md:hidden shadow-2xl'>
            <a href='#' className='text-lg font-medium text-slate-300'>
              Blog
            </a>
            {/* Menú Desplegable de Herramientas */}
            <div className='relative group/menu'>
              <button className='flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
                Herramientas
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='m6 9 6 6 6-6' />
                </svg>
              </button>

              {/* Dropdown al hacer Hover */}
              <div className='absolute top-full left-0 mt-2 w-56 bg-[#161b26] border border-slate-800 rounded-xl shadow-2xl py-3 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-[70]'>
                <a href='#' className='flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors'>
                  <div className='p-1.5 bg-amber-500/10 rounded-lg text-amber-500'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'>
                      <rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
                      <line x1='16' x2='16' y1='2' y2='6' />
                      <line x1='8' x2='8' y1='2' y2='6' />
                      <line x1='3' x2='21' y1='10' y2='10' />
                    </svg>
                  </div>
                  <div>
                    <p className='text-sm text-white font-bold'>Calendario Económico</p>
                    <p className='text-[10px] text-slate-500'>Evita noticias volátiles</p>
                  </div>
                </a>

                <a href='#' className='flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors'>
                  <div className='p-1.5 bg-cyan-500/10 rounded-lg text-cyan-500'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'>
                      <circle cx='12' cy='12' r='10' />
                      <polyline points='12 6 12 12 16 14' />
                    </svg>
                  </div>
                  <div>
                    <p className='text-sm text-white font-bold'>Sesiones de Mercado</p>
                    <p className='text-[10px] text-slate-500'>Londres / NY / Tokio</p>
                  </div>
                </a>
              </div>
            </div>

            <a href='#' className='text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors'>
              Telegram
            </a>
            <a href='#' className='text-lg font-medium text-slate-300'>
              Ingresar
            </a>
            <a href='#' className='text-lg font-medium text-blue-400'>
              Registrarse
            </a>
          </div>
        )}
      </header>

      <div className='flex-1 w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 lg:min-h-0 max-w-2xl lg:max-w-[1600px]'>
        {/* PANEL IZQUIERDO: FORMULARIOS */}
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
        <aside className='lg:col-span-3 h-full min-h-0'>
          <div className='bg-[#161b26] p-6 rounded-2xl border border-slate-800 shadow-xl h-full flex flex-col'>
            <div className='flex items-center justify-between mb-6 border-b border-slate-700 pb-2'>
              <h2 className='text-lg font-semibold text-cyan-500'>
<<<<<<< HEAD
                {activeTab === 'calculadora' ? 'Calculadora' : 'Bitácora'}
=======
                {activeTab === 'calculadora' ? 'Calculadora' : 'Bitácora de sesiones'}
>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
              </h2>

              <button
                onClick={() => setActiveTab(activeTab === 'calculadora' ? 'bitacora' : 'calculadora')}
                className='bg-[#0d1117] border border-emerald-700 p-0 rounded-lg hover:border-cyan-500 transition-colors'>
                <div className='flex items-center gap-1.5 px-2 py-0.5'>
                  <span
                    className={`text-[12px] font-bold ${
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
                    className={`text-[12px] font-bold ${
                      activeTab === 'bitacora' ? 'text-emerald-400' : 'text-slate-500'
                    }`}>
                    Bit
                  </span>
                </div>
              </button>
            </div>

            {activeTab === 'calculadora' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
<<<<<<< HEAD
                  if (JSON.stringify(formValues) === JSON.stringify(lastSubmittedValues)) return
=======

                  if (JSON.stringify(formValues) === JSON.stringify(lastSubmittedValues)) return

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
                  const newErrors = {}

                  const saldo = parseFloat(formValues.saldoActual)

                  const inversion = parseFloat(formValues.inversionInicial)
<<<<<<< HEAD
                  if (inversion < 1) newErrors.inversionInicial = 'Mínimo $1.00'
                  if (inversion > saldo) newErrors.inversionInicial = 'No puede superar el saldo'
=======

                  if (inversion < 1) newErrors.inversionInicial = 'Mínimo $1.00'

                  if (inversion > saldo) newErrors.inversionInicial = 'No puede superar el saldo'

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
                  if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors)

                    return
                  }
<<<<<<< HEAD
                  setErrors({})
                  setLastSubmittedValues({ ...formValues })
=======

                  setErrors({})

                  setLastSubmittedValues({ ...formValues })

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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
<<<<<<< HEAD
                  { label: 'Ganancia Extra', name: 'gananciaExtra', min: '0' }
=======

                  { label: 'Ganancia Esperada', name: 'gananciaEsperada', min: '0' }
>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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
<<<<<<< HEAD
                  <p className={`text-sm md:text-base font-mono ${card.color}`}>
=======

                  <p className={`text-sm md:text-base font-mono font-bold ${card.color}`}>
>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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
                    className='bg-transparent font-mono text-sm md:text-base text-white outline-none focus:border-b border-cyan-500 text-center transition-all'
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
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
                    <p className='text-base font-mono text-blue-400'>${result.saldoSobrante}</p>
                  </div>

                  <div className='text-center flex-1'>
                    <p className='text-[14px] text-slate-300 font-semibold tracking-tighter'>
                      Faltante op. {result.counter + 1}
                    </p>
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
                    <p className='text-base font-mono text-rose-400'>${result.saldoFaltante}</p>
                  </div>
                </div>

                <div
                  className={`flex-none bg-cyan-950/20 border border-cyan-800/30 px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    isPulsing ? 'animate-pulse' : ''
                  }`}>
                  <p className='text-xs md:text-sm text-slate-100 font-medium text-center'>
                    Solo necesitas acertar 1 de {result.counter}.
                  </p>
                  <span className='text-xs md:text-sm font-medium text-cyan-400'>
                    ({+((1 / result.counter) * 100).toFixed(2)}% de acierto)
                  </span>
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
<<<<<<< HEAD
                          <p className='text-[11px] text-slate-300 font-semibold mb-0.5'>Monto Inv.</p>
                          <div className='flex items-center gap-1 md:gap-2'>
                            <p className='font-mono text-[14px] md:text-lg text-blue-300'>${op.inversion}</p>

                            {/* Contenedor del botón con Tooltip */}
=======
                          <p className='text-[9px] text-slate-500 uppercase font-bold mb-0.5'>Monto Inv.</p>

                          <div className='flex items-center gap-2'>
                            <p className='font-mono text-lg text-blue-300'>${op.inversion}</p>

                            {/* Contenedor del botón con Tooltip */}

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
                            <div className='relative flex items-center group/tooltip'>
                              <button
                                type='button'
                                onClick={() => copyToClipboard(op.inversion, index)}
<<<<<<< HEAD
                                className={`p-0 rounded transition-all ${
=======
                                className={`p-1 rounded transition-all ${
>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
                                    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
                                  </svg>
                                )}
                              </button>

                              {/* Etiqueta flotante (Tooltip) */}
<<<<<<< HEAD
                              <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-bold text-white bg-slate-800 rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-slate-700'>
                                {copiedIndex === index ? 'Copiado' : 'Copiar'}
                                {/* Triangulito del tooltip */}
=======

                              <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-bold text-white bg-slate-800 rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-slate-700'>
                                {copiedIndex === index ? 'Copiado' : 'Copiar'}

                                {/* Triangulito del tooltip */}

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
                                <span className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800'></span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='flex gap-2 md:gap-8'>
                        <div className='text-right'>
<<<<<<< HEAD
                          <p className='text-[11px] text-slate-300 font-semibold'>Ganancia</p>
=======
                          <p className='text-[11px] text-slate-300 font-bold'>Ganancia</p>

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
                          <p className='font-mono text-[12px] md:text-base text-emerald-500'>${op.ganancia}</p>
                        </div>

                        <div className='text-right pl-2 md:pl-4'>
<<<<<<< HEAD
                          <p className='text-[11px] text-slate-300 font-semibold'>Acumulado</p>
=======
                          <p className='text-[11px] text-slate-300 font-bold'>Acumulado</p>

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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
<<<<<<< HEAD
=======

>>>>>>> 64daaad9dbfaaa1a313f076eb8d4ab73ed647824
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
