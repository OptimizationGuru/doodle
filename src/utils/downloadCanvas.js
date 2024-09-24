import html2canvas from 'html2canvas'

export const downloadCanvas = (elementId) => {
  const canvasElement = document.getElementById(elementId) // The div wrapping your canvas.
  html2canvas(canvasElement, {
    scale: 2, // Increases the quality of the image
    useCORS: true, // Allow cross-origin images
    allowTaint: false,
  }).then((canvas) => {
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'screenshot.png'
    link.click()
  })
}
