export const getFechaLocal = () => {
  const hoy = new Date()
  return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`
}

export const copyToClipboard = async (value) => {
  const textToCopy = value.toString().replace('.', ',')

  try {
    await navigator.clipboard.writeText(textToCopy)
    return true
  } catch (err) {
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return true
  }
}
