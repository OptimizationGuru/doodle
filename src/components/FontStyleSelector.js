import React, { useState, useEffect, useRef } from 'react'

const fontStyles = [
  { id: 1, label: 'Normal', value: 'normal' },
  { id: 2, label: 'Italic', value: 'italic' },
  { id: 3, label: 'Oblique', value: 'oblique' },
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
        className='border p-2 w-[100px] rounded-md bg-black text-white'
      >
        {selectedStyle ? selectedStyle.label : 'Font Style'}
      </button>

      {dropdownOpen && (
        <div className='absolute mt-2 bg-white border shadow-lg w-full z-10'>
          <ul className='max-h-60 overflow-y-auto'>
            {fontStyles.map((style) => (
              <li
                key={style.id}
                onClick={() => handleFontSelectChange(style)}
                className='p-2 hover:bg-opacity-80 cursor-pointer bg-black text-white'
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
