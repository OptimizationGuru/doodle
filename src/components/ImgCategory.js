import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

const InputBox = ({ onCategorySubmit }) => {
  const [category, setCategory] = useState('')

  const handleInputChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (category.trim()) {
      onCategorySubmit(category)
      setCategory('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 '>
      <input
        type='text'
        value={category}
        onChange={handleInputChange}
        placeholder='Search Image...'
        className='bg-black text-white border border-white rounded p-2 w-[180px]'
      />
      <button
        type='submit'
        className='bg-black text-white border border-white rounded p-2 flex items-center'
      >
        <BiSearch size={20} />
      </button>
    </form>
  )
}

export default InputBox
