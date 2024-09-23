import React, { useContext, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { BannerStyleContext } from '../components/BannerStyle'

const ColorPicker = ({ utility }) => {
  const { fontColor, bgColor, toggleStyle } = useContext(BannerStyleContext)
  const [color, setColor] = useState('#aabbcc')

  const setProperty = () => {
    setColor(color)
    if (utility === 'textColor') toggleStyle({ textColor: color })
    else utility === 'bannerColor'
    toggleStyle({ newBgColor: color })

    console.log(utility, color, fontColor, bgColor)
  }
  return <HexColorPicker color={color} onChange={setProperty} />
}

export default ColorPicker
