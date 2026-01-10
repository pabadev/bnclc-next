// API endpoint para subida de fotos
export async function POST(request) {
  try {
    const formData = await request.formData()
    // TODO: Implementar lógica de carga de fotos
    return Response.json({ success: true, message: 'Foto subida correctamente' })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
