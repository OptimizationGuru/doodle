import html2canvas from 'html2canvas'
import { toPng } from 'html-to-image'
import domtoimage from 'dom-to-image'

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

export const downloadPngImage = (elementId) => {
  const node = document.getElementById(elementId)

  toPng(node)
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'image.png'
      link.href = dataUrl
      link.click()
    })
    .catch((error) => {
      console.error('Failed to create image:', error)
    })
}



export const downloadDOMImage = (elementId) => {
  const node = document.getElementById(elementId) // Ensure to use the correct ID

  domtoimage
    .toPng(node)
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'image.png'
      link.href = dataUrl
      link.click()
    })
    .catch((error) => {
      console.error('Oops, something went wrong!', error)
    })
}
