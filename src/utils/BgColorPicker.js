import React, { useContext, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { BannerStyleContext } from '../components/BannerStyle'

const BgShadePicker = () => {
  const { bgColor, toggleStyle } = useContext(BannerStyleContext)
  const [bgShade, setBgShade] = useState('')

  const handleColorChange = (newColor) => {
    setBgShade(newColor)
    toggleStyle({ newBgColor: newColor })
  }
  return <HexColorPicker color={bgShade} onChange={handleColorChange} />
}

export default BgShadePicker
