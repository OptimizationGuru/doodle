import React, { useState, useEffect, useRef } from 'react'

const ImageSizeSelector = ({ imageSizeUrls, onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const dropdownRef = useRef(null)

  const sizes = [
    { id: 1, label: 'Large', url: imageSizeUrls?.large },
    { id: 2, label: 'Large2X', url: imageSizeUrls?.large2x },
    { id: 3, label: 'Medium', url: imageSizeUrls?.medium },
    { id: 4, label: 'Original', url: imageSizeUrls?.original },
    { id: 5, label: 'Small', url: imageSizeUrls?.small },
    { id: 6, label: 'Portrait', url: imageSizeUrls?.portrait },
    { id: 7, label: 'Landscape', url: imageSizeUrls?.landscape },
    { id: 8, label: 'Tiny', url: imageSizeUrls?.tiny },
  ]

  const handleSelectChange = (size) => {
    setSelectedSize(size)
    onSelect(size.url)
    setDropdownOpen(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (sizes.length > 0) {
      handleSelectChange(sizes[0])
    }
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
        {selectedSize ? selectedSize.label : 'Image Layout'}
      </button>

      {dropdownOpen && (
        <div className='absolute mt-2 bg-white border shadow-lg w-full z-10'>
          <ul className='max-h-60 overflow-y-auto'>
            {sizes.map((size) => (
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

export default ImageSizeSelector
