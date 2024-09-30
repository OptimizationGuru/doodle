import React, { useState, useEffect, useRef } from 'react'

const fontStyles = [
  { label: 'Normal', value: 'normal' },
  { label: 'Italic', value: 'italic' },
  { label: 'Oblique', value: 'oblique' },
]

const FontStyleSelector = ({ onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const dropdownRef = useRef(null)

  const handleFontSelectChange = (style) => {
    setSelectedStyle(style)
    onSelect(style.value)
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
        className='border p-2 w-[120px] rounded-md bg-black text-white '
      >
        {selectedStyle ? selectedStyle.label : 'Font Style'}
      </button>

      {dropdownOpen && (
        <div className='absolute mt-2 bg-white border shadow-lg w-full z-10'>
          <ul className='max-h-60 overflow-y-auto'>
            {fontStyles.map((style, index) => (
              <li
                key={index}
                onClick={() => handleFontSelectChange(style)}
                className='p-2 hover:bg-opacity-80 cursor-pointer  bg-black text-white'
              >
                {style.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FontStyleSelector
