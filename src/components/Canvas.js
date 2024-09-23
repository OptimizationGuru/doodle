// Canvas.js
import React, { useEffect, useState, useContext } from 'react'
import Dropdown from './Dropdown'
import { BiSolidColorFill } from 'react-icons/bi'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { LuUploadCloud } from 'react-icons/lu'
import Fonts from '../Fonts'
import { allFontSizes } from '../constant'
import { BannerStyleContext } from './BannerStyle'
import html2canvas from 'html2canvas'
import { HexColorPicker } from 'react-colorful'
import ColorPicker from '../utils/ColorPicker'

const Canvas = () => {
  const [text, setText] = useState('Write your content here')
  const [width, setWidth] = useState(700)
  const [height, setHeight] = useState(400)
  const [fonts, setFonts] = useState([])
  const [bgShadePicker, showBgShadePicker] = useState(false)
  const [textShadePicker, showTextShadePicker] = useState(false)

  const { fontSize, fontStyle, fontColor, bgColor } = useContext(BannerStyleContext)

  const handleDownload = () => {
    const canvasElement = document.getElementById('canvas-container') // The div wrapping your canvas.
    html2canvas(canvasElement).then((canvas) => {
      const link = document.createElement('a')
      link.download = 'canvas-image.png'
      link.href = canvas.toDataURL()
      link.click()
    })
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = function (event) {
      const imgElement = new Image()
      imgElement.src = event.target.result
      document.getElementById('canvas-container').appendChild(imgElement)
    }
    reader.readAsDataURL(file)
  }

  const autoResize = () => {
    const textarea = document.getElementById('textarea')
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const toggleTextColorPicker = () => {
    showTextShadePicker(!textShadePicker)
  }

  const toggleBgColorPicker = () => {
    showBgShadePicker(!bgShadePicker)
  }

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
    console.log(fontSize, fontStyle, ' fontsize, fontStyle')

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
        <div className='h-[40px] w-[50px] -mt-2'>
          <button
            onClick={toggleTextColorPicker}
            className='text-white text-lg font-medium shadow-xl px-3 rounded-md border-white border-[1px] h-full bg-black'
          >
            A
          </button>
          {textShadePicker && <ColorPicker utility={'textColor'} onClick={toggleTextColorPicker} />}
        </div>

        <div className='w-[200px] h-[50px] flex justify-start rounded-none py-2 -mt-1'>
          {fonts && <Dropdown width={200} data={fonts} type={'Choose font-style'} />}
        </div>

        <div className='w-[200px] h-[50px] flex justify-start rounded-none py-2 -mt-1'>
          {fonts && <Dropdown width={200} data={allFontSizes} type={'Choose font-size'} />}
        </div>

        <div className='h-[40px] w-[100px] -mt-2 -mr-1'>
          <button className='text-white text-2xl font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black'>
            <LuUploadCloud />
          </button>
        </div>

        <div className='h-[40px] w-[100px] -mt-2 -mx-1'>
          <button
            onClick={toggleBgColorPicker}
            className='text-white text-2xl font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black'
          >
            <BiSolidColorFill />
          </button>
          {bgShadePicker && <ColorPicker utility={'bannerColor'} onClick={toggleBgColorPicker} />}
        </div>

        <div className='h-[40px] w-[100px] -mt-2 -ml-1'>
          <button className='text-white text-2xl font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black'>
            <MdOutlinePhotoSizeSelectActual />
          </button>
        </div>
      </div>
      <div
        id='canvas-container'
        className='bg-red-500 flex items-center justify-center overflow-auto'
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
          }}
          className='w-full font-bold text-white text-center px-8 py-4 outline-none border-none resize-none bg-red-500'
          onChange={(e) => {
            setText(e.target.value)
            autoResize()
          }}
        />
      </div>
      <div>
        <input type='file' onChange={handleImageUpload} className='text-white' />
      </div>
      <button
        onClick={handleDownload}
        className='text-white text-2xl my-4 font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black'
      >
        Download
      </button>
    </div>
  )
}

export default Canvas
