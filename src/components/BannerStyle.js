import React, { createContext, useState } from 'react'

export const BannerStyleContext = createContext()

const BannerStyle = ({ children }) => {
  const [fontSize, setFontSize] = useState('24')
  const [fontStyle, setFontStyle] = useState('sans-serif')
  const [fontColor, setFontColor] = useState('black')
  const [bgColor, setBgColor] = useState('white')

  const toggleStyle = ({ size, family, textColor, newBgColor }) => {
    if (size) setFontSize(size)
    if (family) setFontStyle(family)
    if (textColor) setFontColor(textColor)
    if (newBgColor) setBgColor(newBgColor)
  }

  return (
    <BannerStyleContext.Provider value={{ fontSize, fontStyle, fontColor, bgColor, toggleStyle }}>
      {children}
    </BannerStyleContext.Provider>
  )
}

export default BannerStyle
