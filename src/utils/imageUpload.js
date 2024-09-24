export const uploadImage = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = function (event) {
    const imgElement = new Image()
    imgElement.src = event.target.result
    document.getElementById('canvas-container').appendChild(imgElement)
  }
  reader.readAsDataURL(file)
}
