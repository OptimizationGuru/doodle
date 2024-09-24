import React, { useEffect, useState, useContext, useRef } from 'react'
import Dropdown from './Dropdown'
import { BiSolidColorFill, MdOutlinePhotoSizeSelectActual, LuUploadCloud } from '../utils/icons'
import Fonts from '../Fonts'
import { allFontSizes } from '../constant'
import { BannerStyleContext } from './BannerStyle'
import { downloadCanvas, downloadDOMImage, downloadPngImage } from '../utils/downloadCanvas'
import { uploadImage } from '../utils/imageUpload'
import { resizeTextArea } from '../utils/resizeTextArea'
import FontColorPicker from '../utils/FontColorPicker'
import BgShadePicker from '../utils/BgColorPicker'
import YourComponent from './TextComponent'

const Canvas = () => {
  const [text, setText] = useState('Write your content here')
  const [width, setWidth] = useState(700)
  const [height, setHeight] = useState(400)
  const [fonts, setFonts] = useState([])
  const [bgShadePicker, showBgShadePicker] = useState(false)
  const [textShadePicker, showTextShadePicker] = useState(false)

  const { fontSize, fontStyle, fontColor, bgColor } = useContext(BannerStyleContext)

  const bgPickerRef = useRef(null)
  const textPickerRef = useRef(null)

  const handleImgDownload = () => {
    downloadDOMImage('canvas-container')
  }
  const handleImgUpload = (e) => {
    uploadImage(e)
  }
  const autoResize = () => {
    resizeTextArea('textarea')
  }

  const toggleTextColorPicker = () => {
    showTextShadePicker(!textShadePicker)
  }

  const toggleBgColorPicker = () => {
    showBgShadePicker(!bgShadePicker)
  }

  const handleClickOutside = (e) => {
    if (
      bgPickerRef.current &&
      !bgPickerRef.current.contains(e.target) &&
      textPickerRef.current &&
      !textPickerRef.current.contains(e.target)
    ) {
      showBgShadePicker(false)
      showTextShadePicker(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const result = await Fonts()
        setFonts(result)
      } catch (error) {
        console.error('Error fetching fonts:', error)
      }
    }

    fetchFonts()
  }, [])

  useEffect(() => {
    autoResize()
  }, [text])

  return (
    <div className='bg-[#121212] flex flex-col  items-center gap-2'>
      <div className='w-[600px] h-[50px] flex justify-center items-center py-1 gap-9'>
        <div className='w-[100px] h-[50px] flex justify-center gap-0 py-2'>
          <div className='h-full w-[100px]'>
            <label className='border-black text-md bg-white border-[1px] w-[100px] shadow-sm p-2 h-full items-center justify-center'>
              width
            </label>
          </div>
          <div className='h-full w-[100px]'>
            <input
              className='p-[5px] -mt-2 w-[100px] border-black border-[1px]'
              type='number'
              onChange={(e) => setWidth(e.target.value)}
              value={width}
            />
          </div>
        </div>
        <div className='w-[100px] h-[50px] flex justify-start gap-0 py-2'>
          <div className='h-full w-[100px]'>
            <label className='border-black text-md bg-white border-[1px] w-[100px] shadow-sm p-2'>
              height
            </label>
          </div>
          <div className='h-full w-[100px]'>
            <input
              className='p-[5px] -mt-2 w-[100px] border-black border-[1px]'
              type='number'
              onChange={(e) => setHeight(e.target.value)}
              value={height}
            />
          </div>
        </div>
      </div>

      <div className='w-[600px] h-[50px] flex justify-center items-center py-1 gap-4'>
        <div
          className='h-[40px] w-[50px] -mt-2 relative'
          onClick={toggleTextColorPicker}
          ref={textPickerRef}
        >
          <button className='text-white text-lg font-medium shadow-xl px-3 rounded-md border-white border-[1px] h-full bg-black'>
            A
          </button>
          {textShadePicker && (
            <div className='mt-4 absolute'>
              <FontColorPicker />
            </div>
          )}
        </div>

        <div className='w-[200px] h-[50px] flex justify-start rounded-none py-2 -mt-1'>
          {fonts && <Dropdown width={200} data={fonts} type={'Choose font-style'} />}
        </div>

        <div className='w-[200px] h-[50px] flex justify-start rounded-none py-2 -mt-1'>
          {fonts && <Dropdown width={200} data={allFontSizes} type={'Choose font-size'} />}
        </div>

        <div className='h-[40px] w-[100px] -mt-2 -mr-1 relative'>
          <div>
            <input
              type='file'
              onChange={(e) => handleImgUpload(e)}
              className='text-white absolute inset-0 opacity-0 cursor-pointer'
            />
          </div>
          <button className='text-white text-2xl font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black'>
            <LuUploadCloud />
          </button>
        </div>

        <div className='h-[40px] w-[100px] -mt-2 -mx-1 relative' ref={bgPickerRef}>
          <button
            onClick={toggleBgColorPicker}
            className='text-white text-2xl font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black'
          >
            <BiSolidColorFill />
          </button>

          {bgShadePicker && (
            <div className='mt-4 absolute' onClick={toggleBgColorPicker}>
              <BgShadePicker />
            </div>
          )}
        </div>

        <div className='h-[40px] w-[100px] -mt-2 -ml-1'>
          <button className='text-white text-2xl font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black'>
            <MdOutlinePhotoSizeSelectActual />
          </button>
        </div>
      </div>

      <div
        id='canvas-container'
        className=' flex items-center justify-center overflow-auto'
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <textarea
          id='textarea'
          value={text}
          style={{
            fontSize: `${fontSize || 16}px`,
            fontFamily: fontStyle || 'Arial',
            color: fontColor || '#000000',
            backgroundColor: bgColor || 'transparent',
            width: `${width}px`,
            height: `${height}px`,
          }}
          className='font-bold text-white text-center px-8 py-24 overflow-auto outline-none border-none resize-none bg-red-500'
          onChange={(e) => {
            setText(e.target.value)
            autoResize()
          }}
        />
      </div>

      <button
        onClick={handleImgDownload}
        className='text-white text-2xl my-2 font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black'
      >
        Download
      </button>
    </div>
  )
}

export default Canvas
