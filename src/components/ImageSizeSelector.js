import React, { useState, useEffect, useRef } from 'react'

const ImageSizeSelector = ({ imageSizeUrls, onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const dropdownRef = useRef(null)

  const sizes = [
    { label: 'Large', url: imageSizeUrls?.large },
    { label: 'Large2X', url: imageSizeUrls?.large2x },
    { label: 'Medium', url: imageSizeUrls?.medium },
    { label: 'Original', url: imageSizeUrls?.original },
    { label: 'Small', url: imageSizeUrls?.small },
    { label: 'Portrait', url: imageSizeUrls?.portrait },
    { label: 'Landscape', url: imageSizeUrls?.landscape },
    { label: 'Tiny', url: imageSizeUrls?.tiny },
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
        {selectedSize ? selectedSize.label : 'Image Size'}
      </button>

      {dropdownOpen && (
        <div className='absolute mt-2 bg-white border shadow-lg w-full z-10'>
          <ul className='max-h-60 overflow-y-auto'>
            {sizes.map((size, index) => (
              <li
                key={index}
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
