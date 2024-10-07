import React, { useState, useRef, useEffect } from 'react'
import { API_KEY } from '../constant'
import { font_url } from '../constant'

const FontFamilySelector = ({ onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedFontFamily, setSelectedFontFamily] = useState(null)
  const [fontFamilies, setFontFamilies] = useState([])
  const dropdownRef = useRef(null)

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch(`${font_url}${API_KEY}`)
        const data = await response.json()
        const families = data.items.map((item, index) => ({
          id: index,
          label: item.family,
          value: item.family,
        }))
        setFontFamilies(families)
      } catch (error) {
        console.error('Error fetching fonts:', error)
      }
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
    const handleDocumentClick = (event) => handleClickOutside(event)
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className='border p-2 rounded w-[120px] bg-black text-white'
      >
        {selectedFontFamily ? selectedFontFamily.label : 'Font Family'}
      </button>

      {dropdownOpen && (
        <div className='absolute mt-2 bg-white border shadow-lg w-full z-10'>
          <ul className='max-h-60 overflow-y-auto'>
            {fontFamilies.map((font) => (
              <li
                key={font.id}
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
