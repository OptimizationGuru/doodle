import React, { useContext, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { BannerStyleContext } from '../components/BannerStyle'

const FontColorPicker = () => {
  const { fontColor, toggleStyle } = useContext(BannerStyleContext)
  const [textShade, setTextShade] = useState('')

  const setProperty = (color) => {
    setTextShade(color)
    toggleStyle({ textColor: color })
  }
  return <HexColorPicker color={textShade} onChange={setProperty} className='py-1' />
}

export default FontColorPicker
