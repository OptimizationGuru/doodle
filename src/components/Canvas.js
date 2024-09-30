import React, { useEffect, useState, useContext, useRef } from 'react'
import Dropdown from './Dropdown'
import { BiSolidColorFill, MdOutlinePhotoSizeSelectActual, LuUploadCloud } from '../utils/icons'
import Fonts from '../Fonts'
import { BannerStyleContext } from './BannerStyle'
import { downloadDOMImage } from '../utils/downloadCanvas'
import { uploadImage } from '../utils/imageUpload'
import { resizeTextArea } from '../utils/resizeTextArea'
import FontColorPicker from '../utils/FontColorPicker'
import BgShadePicker from '../utils/BgColorPicker'
import BannerSizeSelector from './BannerSizeSelector'
import FontSizeSelector from './fontSizeSelector'
import FontStyleSelector from './FontStyleSelector'
import { BsCloudDownload } from 'react-icons/bs'
import FontFamilySelector from './FontFamilySelector'

const Canvas = () => {
  const [text, setText] = useState('Write your content here')
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [currentFamilyFont, setCurrentFamilyFont] = useState([])
  const [textSize, setTextSize] = useState('24')
  const [bgShadePicker, showBgShadePicker] = useState(false)
  const [textShadePicker, showTextShadePicker] = useState(false)
  const [refresh, setRefresh] = useState(0)

  const { fontSize, fontStyle, fontColor, familyFont, bgColor, toggleStyle } =
    useContext(BannerStyleContext)

  const bgPickerRef = useRef(null)
  const textPickerRef = useRef(null)

  const handleImgDownload = () => {
    downloadDOMImage('canvas-container')
  }
  const handleImgUpload = (e) => {
    uploadImage(e)
  }
  // const autoResize = () => {
  //   resizeTextArea('textarea')
  // }

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
    if (bgPickerRef.current && !bgPickerRef.current.contains(e.target)) {
      showBgShadePicker(false)
    }
    if (textPickerRef.current && !textPickerRef.current.contains(e.target)) {
      showTextShadePicker(false)
    }
  }

  const handleBannerSizeSelect = (width, height) => {
    setHeight(height)
    setWidth(width)
  }
  const handleFontSizeSelect = (fontSize) => {
    setTextSize(fontSize)
    toggleStyle({ size: fontSize })
  }

  const handleFontStyleSelect = (style) => {
    toggleStyle({ style: style })
  }

  const handleFontFamilySelect = (font) => {
    setCurrentFamilyFont(font)
    toggleStyle({ family: font })
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // useEffect(() => {
  //   autoResize()
  // }, [text])

  return (
    <div className='w-full h-full pb-[35px] min-h-screen bg-[#121212] flex flex-col  justify-center items-center gap-2  border-[1px]'>
      <div className='w-[60%] h-auto flex justify-center items-center mt-12 py-1  border-white border-[1px] gap-2'>
        <div className='w-full h-[auto] flex justify-center items-center py-2 px-2 mx-2 gap-3'>
          <div className='w-full h-[auto] relative' ref={textPickerRef}>
            <button
              onClick={toggleTextColorPicker}
              className='text-white text-lg font-medium py-2 px-4  shadow-xl rounded-md border-white border-[1px] h-full bg-black'
            >
              A
            </button>
            {textShadePicker && (
              <div className='mt-4 absolute'>
                <FontColorPicker />
              </div>
            )}
          </div>

          <div className='w-full h-[auto]  relative' ref={bgPickerRef}>
            <button
              onClick={toggleBgColorPicker}
              className='text-white text-2xl font-medium shadow-xl py-2 px-3 rounded-md border-white border-[1px] h-full bg-black'
            >
              <BiSolidColorFill />
            </button>

            {bgShadePicker && (
              <div className='mt-4 absolute' onClick={toggleBgColorPicker}>
                <BgShadePicker />
              </div>
            )}
          </div>

          <div className='w-full h-[auto] relative'>
            <div>
              <input
                type='file'
                onChange={(e) => handleImgUpload(e)}
                className='text-white absolute inset-0 opacity-0 cursor-pointer'
              />
            </div>
            <button className='text-white text-2xl font-medium shadow-xl py-2 px-3 rounded-md border-white border-[1px] h-full bg-black'>
              <LuUploadCloud />
            </button>
          </div>

          <div className='w-full h-[auto]'>
            <button className='text-white text-2xl font-medium shadow-xl py-2 px-3 rounded-md border-white border-[1px] h-full bg-black'>
              <MdOutlinePhotoSizeSelectActual />
            </button>
          </div>
        </div>

        <div className='w-full h-[auto] flex justify-center py-2'>
          <FontSizeSelector onSelect={handleFontSizeSelect} />
        </div>

        <div className='w-full h-[auto] flex justify-center py-2'>
          <FontStyleSelector onSelect={handleFontStyleSelect} />
        </div>

        <div className='w-full h-[auto] flex justify-center py-2'>
          <FontFamilySelector onSelect={handleFontFamilySelect} />
        </div>

        <div className='w-full h-[auto] flex justify-center py-2'>
          <BannerSizeSelector onSelect={handleBannerSizeSelect} />
        </div>

        <div className='w-full h-[auto] flex justify-center py-2 mr-2'>
          <button
            onClick={handleImgDownload}
            className='text-white  flex gap-2  my-2  py-2 px-3 rounded-md border-white border-[1px]  bg-black'
          >
            <span>Download</span>{' '}
            <span className='my-1'>
              <BsCloudDownload />
            </span>
          </button>
        </div>
      </div>

      <div
        id='canvas-container'
        className='flex items-center justify-center overflow-auto w-full h-full  '
        style={{ width: width ? `${width}px` : '842px', height: height ? `${height}px` : '595px' }}
      >
        <textarea
          id='textarea'
          key={refresh}
          value={text}
          style={{
            fontFamily: 'ABeeZee',
            fontSize: `${fontSize}`,
            fontStyle: fontStyle,
            color: fontColor || '#000000',
            backgroundColor: bgColor || 'transparent',
            width: `${width}px`,
            height: `${height}px`,
          }}
          className='font-bold text-white text-center w-full  px-8 py-24 overflow-auto outline-none border-none resize-none'
          onChange={(e) => {
            setText(e.target.value)
            // autoResize()
          }}
        />
      </div>
    </div>
  )
}

export default Canvas
