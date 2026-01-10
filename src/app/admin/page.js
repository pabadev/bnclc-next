'use client'

export default function AdminPage() {
  return (
    <main className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold text-gray-900 mb-6'>Panel de Administración</h1>
        {/* TODO: Implementar panel de admin - Solo para administradores */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Usuarios</h2>
            <p className='text-gray-500'>Gestión de usuarios - en construcción</p>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Estadísticas</h2>
            <p className='text-gray-500'>Estadísticas del sistema - en construcción</p>
          </div>
        </div>
      </div>
    </main>
  )
}
