import React, { useState, useRef, useEffect, useEffect } from 'react'
import { API_KEY } from '../constant' // Import your API key from constants
import { font_url } from '../constant'

const FontFamilySelector = ({ onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedFontFamily, setSelectedFontFamily] = useState(null)
  const [fontFamilies, setFontFamilies] = useState([])
  const dropdownRef = useRef(null)

  useEffect(() => {
    const fetchFonts = async () => {
      const response = await fetch(font_url + API_KEY)
      const data = await response.json()
      const families = data.items.map((item) => ({
        label: item.family,
        value: item.family,
      }))
      setFontFamilies(families)
    }

    fetchFonts()
  }, [])

  const handleFontSelectChange = (font) => {
    setSelectedFontFamily(font)
    onSelect(font.value)
    setDropdownOpen(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className='border p-2 rounded w-[150px] bg-black text-white'
      >
        {selectedFontFamily ? selectedFontFamily.label : 'Choose Font Style'}
      </button>

      {dropdownOpen && (
        <div className='absolute mt-2 bg-white border shadow-lg w-full z-10'>
          <ul className='max-h-60 overflow-y-auto'>
            {fontFamilies.map((font, index) => (
              <li
                key={index}
                onClick={() => handleFontSelectChange(font)}
                className='p-2 cursor-pointer hover:bg-opacity-90 bg-black text-white'
              >
                {font.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FontFamilySelector
