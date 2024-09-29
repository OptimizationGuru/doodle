export const resizeTextArea = (id, minWidth, minHeight) => {
  const textarea = document.getElementById(id)
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }
}
