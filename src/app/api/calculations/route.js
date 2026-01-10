// API endpoint para cálculos
export async function POST(request) {
  try {
    const data = await request.json()
    // TODO: Implementar lógica de cálculos
    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
