'use client'

export default function ViewToggle({ options = [], value, onChange }) {
  if (options.length !== 2) return null

  const [left, right] = options

  const isLeftActive = value === left.value
  const isRightActive = value === right.value

  return (
    <button
      onClick={() => onChange(isLeftActive ? right.value : left.value)}
      className='active:scale-95 bg-[#0d1117] border border-emerald-700 p-1 rounded-lg hover:border-cyan-500 transition-colors'
      aria-label='Cambiar vista'>
      <div className='flex items-center gap-1.5 px-2 py-0.5'>
        <span className={`text-[10px] font-bold ${isLeftActive ? 'text-cyan-400' : 'text-slate-500'}`}>
          {left.label}
        </span>

        <div className='w-4 h-2 bg-slate-700 rounded-full relative'>
          <div
            className={`absolute top-0 w-2 h-2 bg-cyan-500 rounded-full transition-all ${
              isLeftActive ? 'left-0' : 'left-2'
            }`}
          />
        </div>

        <span className={`text-[10px] font-bold ${isRightActive ? 'text-emerald-400' : 'text-slate-500'}`}>
          {right.label}
        </span>
      </div>
    </button>
  )
}
