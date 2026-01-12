'use client'

export default function BitacoraForm({ bitacoraForm, onChange, onSubmit, hoyStr }) {
  return (
    <form
      onSubmit={onSubmit}
      className='flex-1 flex flex-col gap-2.5 lg:overflow-y-auto pr-1 custom-scrollbar'
      aria-labelledby='bitacora-title'>
      <h2 id='bitacora-title' className='sr-only'>
        Registro de sesión de trading
      </h2>

      {/* Fecha */}
      <div className='flex items-center justify-between py-1'>
        <label htmlFor='fecha' className='text-[13px] text-slate-300 font-semibold'>
          Fecha
        </label>

        <input
          id='fecha'
          name='fecha'
          type='date'
          required
          max={hoyStr}
          value={bitacoraForm.fecha}
          onChange={onChange}
          aria-describedby='fecha-help'
          className='w-36 bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1.5 text-white text-sm outline-none focus:border-emerald-500'
        />
      </div>

      <p id='fecha-help' className='sr-only'>
        Selecciona la fecha de la sesión. No puede ser posterior a hoy.
      </p>

      {/* Horas */}
      <fieldset className='grid grid-cols-2 gap-4 py-1'>
        <legend className='sr-only'>Horario de la sesión</legend>

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='horaInicio' className='text-[12px] text-slate-300 font-bold'>
            Hora inicio
          </label>

          <input
            id='horaInicio'
            name='horaInicio'
            type='time'
            required
            value={bitacoraForm.horaInicio}
            onChange={onChange}
            className='w-full bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1.5 text-white text-sm outline-none focus:border-emerald-500'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='horaFin' className='text-[12px] text-slate-300 font-bold'>
            Hora fin
          </label>

          <input
            id='horaFin'
            name='horaFin'
            type='time'
            required
            value={bitacoraForm.horaFin}
            onChange={onChange}
            className='w-full bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1.5 text-white text-sm outline-none focus:border-emerald-500'
          />
        </div>
      </fieldset>

      {/* Saldo inicial */}
      <div className='flex items-center justify-between py-2 border-b border-slate-800/50'>
        <label htmlFor='saldoInicial' className='text-[13px] text-slate-300 font-semibold'>
          Saldo inicial
        </label>

        <input
          id='saldoInicial'
          name='saldoInicial'
          type='number'
          step='any'
          min='0'
          required
          value={bitacoraForm.saldoInicial}
          onChange={onChange}
          inputMode='decimal'
          aria-describedby='saldo-inicial-help'
          className='w-28 bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-sm text-right outline-none focus:border-emerald-500'
          placeholder='0.00'
        />
      </div>

      <p id='saldo-inicial-help' className='sr-only'>
        Saldo con el que iniciaste la sesión de trading.
      </p>

      {/* Saldo final */}
      <div className='flex items-center justify-between py-2 border-b border-slate-800/50'>
        <label htmlFor='saldoFinal' className='text-[13px] text-slate-300 font-semibold'>
          Saldo final
        </label>

        <input
          id='saldoFinal'
          name='saldoFinal'
          type='number'
          step='any'
          min='0'
          required
          value={bitacoraForm.saldoFinal}
          onChange={onChange}
          inputMode='decimal'
          aria-describedby='saldo-final-help'
          className='w-28 bg-[#0d1117] border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-sm text-right outline-none focus:border-emerald-500'
          placeholder='0.00'
        />
      </div>

      <p id='saldo-final-help' className='sr-only'>
        Saldo al finalizar la sesión.
      </p>

      {/* Notas */}
      <div className='space-y-1.5 mt-1'>
        <label htmlFor='notas' className='text-[13px] text-slate-300 font-semibold'>
          Notas
        </label>

        <textarea
          id='notas'
          name='notas'
          value={bitacoraForm.notas}
          onChange={onChange}
          aria-describedby='notas-help'
          className='w-full bg-[#0d1117] border border-slate-700 rounded-lg p-2 text-white text-sm h-12 resize-none outline-none focus:border-emerald-500'
          placeholder='Comentarios de la sesión...'
        />
      </div>

      <p id='notas-help' className='sr-only'>
        Campo opcional para observaciones sobre la sesión.
      </p>

      {/* Submit */}
      <button
        type='submit'
        className='w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold py-3 rounded-xl mt-4 text-sm transition-colors shadow-lg'
        aria-label='Guardar sesión de trading'>
        Guardar Sesión
      </button>
    </form>
  )
}
