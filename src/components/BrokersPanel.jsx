'use client'

export default function BrokersPanel() {
  return (
    <aside className='lg:col-span-3 h-full min-h-0'>
      <div className='bg-[#161b26] p-6 rounded-2xl border border-slate-800 shadow-xl h-full flex flex-col'>
        <h2 className='text-lg text-center font-semibold mb-6 border-b border-slate-700 pb-2 text-cyan-500'>
          Brokers recomendados
        </h2>
        <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 flex flex-col'>
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
  )
}
