'use client'

export default function CalculatorForm({ formValues, errors, onFieldChange, onSubmit, loading, lastSubmittedValues }) {
  return (
    <form onSubmit={onSubmit} className='flex-1 flex flex-col gap-3 lg:overflow-y-auto pr-1 custom-scrollbar'>
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
            onChange={(e) => onFieldChange(e)}
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
  )
}
