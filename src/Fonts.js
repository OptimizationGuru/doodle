import React from 'react'
import { API_KEY } from './constant'

const Fonts = async () => {
  const fonts = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
  const data = await fonts.json()

  const usefulData = data.items.map((item, idx) => ({
    id: idx,
    name: item.family,
    url: item.files.regular,
  }))

  return usefulData
}

export default Fonts
