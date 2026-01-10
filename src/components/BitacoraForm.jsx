'use client'

export default function BitacoraForm({ bitacoraForm, onChange, onSubmit, hoyStr }) {
  return (
    <form onSubmit={onSubmit} className='flex-1 flex flex-col gap-2.5 lg:overflow-y-auto pr-1 custom-scrollbar'>
      <div className='flex items-center justify-between py-1'>
        <label className='text-[13px] text-slate-300 font-semibold'>Fecha</label>

        <input
          name='fecha'
          type='date'
          required
          max={hoyStr}
          value={bitacoraForm.fecha}
          onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          className='w-28 bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-sm text-right outline-none focus:border-emerald-500'
          placeholder='0.00'
        />
      </div>

      <div className='space-y-1.5 mt-1'>
        <label className='text-[13px] text-slate-300 font-semibold'>Notas</label>

        <textarea
          name='notas'
          value={bitacoraForm.notas}
          onChange={onChange}
          className='w-full bg-[#0d1117] border border-slate-700 rounded-lg p-2 text-white text-sm h-12 resize-none outline-none focus:border-emerald-500'
          placeholder='Comentarios de la sesión...'
        />
      </div>

      <button
        type='submit'
        className='w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold py-3 rounded-xl mt-4 text-sm transition-colors shadow-lg active:scale-[0.98]'>
        Guardar Sesión
      </button>
    </form>
  )
}
