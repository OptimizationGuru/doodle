// Dropdown.js
import React, { useContext, useState } from 'react'
import { BannerStyleContext } from './BannerStyle'
import { FaChevronDown } from 'react-icons/fa'

export default function CustomDropdown({ data, width, type }) {
  const { fontsize, fontStyle, toggleStyle } = useContext(BannerStyleContext)

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (item) => {
    setSelected(item)
    setIsOpen(false)
    toggleStyle({ size: item.name, family: item.url })
  }

  return (
    <div className={`relative w-[${width}px]`}>
      <div
        onClick={toggleDropdown}
        className='w-full py-2 px-3 flex gap-4 justify-between border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-200 text-black'
      >
        <span> {selected ? selected.name : type}</span>{' '}
        <span>
          <FaChevronDown size={20} />
        </span>
      </div>

      {isOpen && (
        <ul className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto'>
          {data.map((el) => (
            <li
              key={el.id}
              onClick={() => handleSelect(el)}
              className='cursor-pointer py-2 px-3 text-black hover:bg-indigo-500 hover:text-white'
            >
              {el.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
