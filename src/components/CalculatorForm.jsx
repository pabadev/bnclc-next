'use client'

export default function CalculatorForm({ formValues, errors, onFieldChange, onSubmit, loading, lastSubmittedValues }) {
  const fields = [
    { label: 'Saldo Actual', name: 'saldoActual', min: '1' },
    { label: 'Inversión Inicial', name: 'inversionInicial', min: '1' },
    {
      label: 'Porcentaje Broker (%)',
      name: 'porcentajeGanancia',
      placeholder: 'Ej: 80',
      min: '50',
      max: '99'
    },
    { label: 'Ganancia Esperada', name: 'gananciaEsperada', min: '0' }
  ]

  const hasEmptyFields = Object.values(formValues).some((v) => v === '')
  const isSameAsLast = JSON.stringify(formValues) === JSON.stringify(lastSubmittedValues)

  const isDisabled = loading || hasEmptyFields || isSameAsLast

  return (
    <form
      onSubmit={onSubmit}
      className='flex-1 flex flex-col gap-3 lg:overflow-y-auto pr-1 custom-scrollbar'
      noValidate>
      {fields.map((field) => {
        const hasError = Boolean(errors[field.name])
        const errorId = `${field.name}-error`

        return (
          <div key={field.name} className='space-y-1'>
            <div className='flex justify-between items-center'>
              <label htmlFor={field.name} className='text-[15px] text-slate-300 font-semibold'>
                {field.label}
              </label>

              {hasError && (
                <span id={errorId} role='alert' className='text-[11px] text-rose-400 font-bold animate-pulse'>
                  {errors[field.name]}
                </span>
              )}
            </div>

            <input
              id={field.name}
              name={field.name}
              type='number'
              step='any'
              min={field.min}
              max={field.max}
              required
              value={formValues[field.name]}
              onChange={onFieldChange}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                  e.preventDefault()
                }
              }}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              className={`w-full bg-[#0d1117] border ${
                hasError ? 'border-rose-500/50' : 'border-slate-700'
              } rounded-lg p-2 focus:border-cyan-500 outline-none text-white font-mono transition-colors`}
              placeholder='0.00'
            />
          </div>
        )
      })}

      <button
        type='submit'
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className='w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl mt-4 disabled:opacity-40 transition-all active:scale-[0.95]'>
        {loading ? 'Procesando...' : 'Calcular'}
      </button>
    </form>
  )
}
