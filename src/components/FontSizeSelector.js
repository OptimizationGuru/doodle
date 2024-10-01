import React, { useState, useEffect, useRef } from 'react'

const fontSizes = [
  { label: 'Small (12px)', value: '12px' },
  { label: 'Medium (16px)', value: '16px' },
  { label: 'Large (20px)', value: '20px' },
  { label: 'Extra Large (24px)', value: '24px' },
  { label: '2XL (30px)', value: '30px' },
  { label: '3XL (36px)', value: '36px' },
  { label: '4XL (48px)', value: '48px' },
  { label: '5XL (64px)', value: '64px' },
]

const FontSizeSelector = ({ onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState({ label: '3XL (36px)', value: '36px' })
  const dropdownRef = useRef(null)

  const handleFontSelectChange = (size) => {
    setSelectedSize(size)
    onSelect(size.value)
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
        className='border p-2 rounded  w-[120px] bg-black text-white'
      >
        {selectedSize ? selectedSize.label : 'Font Size'}
      </button>

      {dropdownOpen && (
        <div className='absolute mt-2 bg-white border shadow-lg w-full z-10'>
          <ul className='max-h-60 overflow-y-auto'>
            {fontSizes.map((size, index) => (
              <li
                key={index}
                onClick={() => handleFontSelectChange(size)}
                className='p-2  cursor-pointer  bg-black text-white hover:bg-opacity-80'
              >
                {size.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FontSizeSelector
