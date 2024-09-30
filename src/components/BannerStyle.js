import React, { createContext, useState } from 'react'

export const BannerStyleContext = createContext()

const BannerStyle = ({ children }) => {
  const [fontSize, setFontSize] = useState('24')
  const [fontStyle, setFontStyle] = useState('normal')
  const [familyFont, setFontFamily] = useState('sans-serif')
  const [fontColor, setFontColor] = useState('black')
  const [bgColor, setBgColor] = useState('white')

  const toggleStyle = ({ size, style, family, textColor, newBgColor }) => {
    // console.log(size, 'size')

    if (size) setFontSize(size)
    if (family) setFontFamily(family)
    if (style) setFontStyle(style)
    if (textColor) setFontColor(textColor)
    if (newBgColor) setBgColor(newBgColor)
  }

  return (
    <BannerStyleContext.Provider
      value={{ fontSize, fontStyle, fontColor, familyFont, bgColor, toggleStyle }}
    >
      {children}
    </BannerStyleContext.Provider>
  )
}

export default BannerStyle
