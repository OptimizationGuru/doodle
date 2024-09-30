import React, { useContext, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { BannerStyleContext } from '../components/BannerStyle'

const BgShadePicker = () => {
  const { toggleStyle } = useContext(BannerStyleContext)
  const [bgShade, setBgShade] = useState('')

  const handleColorChange = (newColor) => {
    setBgShade(newColor)
    toggleStyle({ newBgColor: newColor })
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <HexColorPicker color={bgShade} onChange={handleColorChange} />
    </div>
  )
}

export default BgShadePicker
