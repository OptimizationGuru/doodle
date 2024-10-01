import React, { useState, useEffect, useRef } from 'react'

const screenSizes = [
  { id: 1, label: 'A4 Portrait', width: 595, height: 842 },
  { id: 2, label: 'A4 Landscape', width: 842, height: 595 },
  { id: 3, label: 'Instagram Story', width: 1080, height: 1920 },
  { id: 4, label: 'Instagram Post', width: 1080, height: 1080 },
  { id: 5, label: 'Facebook Cover', width: 820, height: 312 },
  { id: 6, label: 'Twitter Header', width: 1500, height: 500 },
  { id: 7, label: 'YouTube Thumbnail', width: 1280, height: 720 },
  { id: 8, label: 'LinkedIn Cover', width: 1584, height: 396 },
  { id: 9, label: 'Poster 18x24', width: 1728, height: 1152 },
  { id: 10, label: 'Letter 8.5x11', width: 612, height: 792 },
  { id: 11, label: 'Legal 8.5x14', width: 612, height: 1008 },
]

const BannerSizeSelector = ({ onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const dropdownRef = useRef(null)

  const handleSelectChange = (size) => {
    setSelectedSize(size)
    onSelect(size.width, size.height)
    setDropdownOpen(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false)
    }
  }
  useEffect(() => {
    handleSelectChange(screenSizes[1])
  }, [])

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
        {selectedSize ? selectedSize.label : 'Banner Size'}
      </button>

      {dropdownOpen && (
        <div className='absolute mt-2 bg-white border shadow-lg w-full z-10'>
          <ul className='max-h-60 overflow-y-auto'>
            {screenSizes.map((size) => (
              <li
                key={size.id}
                onClick={() => handleSelectChange(size)}
                className='p-2 cursor-pointer bg-black text-white hover:bg-opacity-85'
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

export default BannerSizeSelector
