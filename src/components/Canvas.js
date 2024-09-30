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
import FontSizeSelector from './FontSizeSelector'
import FontStyleSelector from './FontStyleSelector'
import { BsCloudDownload } from 'react-icons/bs'
import FontFamilySelector from './FontFamilySelector'
import { fetchPexelsImages } from '../resources/PexelsPhotos'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { SiCanva } from 'react-icons/si'
import ImageSizeSelector from './ImageSizeSelector'
import InputBox from './ImgCategory'

const Canvas = () => {
  const [text, setText] = useState('Write your content here')
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [currentFamilyFont, setCurrentFamilyFont] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imgCategory, setImgCategory] = useState('happy')
  const [opacity, setOpacity] = useState(1)

  const [textSize, setTextSize] = useState('24')
  const [imgUrls, setImgUrls] = useState([])
  const [bgShadePicker, showBgShadePicker] = useState(false)
  const [textShadePicker, showTextShadePicker] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [refresh, setRefresh] = useState(0)
  const bgPickerRef = useRef(null)
  const textPickerRef = useRef(null)

  const { fontSize, fontStyle, fontColor, familyFont, bgColor, toggleStyle } =
    useContext(BannerStyleContext)

  const handleImgDownload = () => {
    downloadDOMImage('canvas-container')
  }
  const handleImgUpload = (e) => {
    uploadImage(e)
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

  const handleImgSizeSelect = (url) => {
    setSelectedImage(url)
  }

  const fixSelectedImage = (src) => {
    setSelectedImage(src.large)
    setImgUrls(src)
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
  const changeCategorySubmit = (category) => {
    setImgCategory(category)
  }

  const handlePreviousPage = () => {
    if (pageNumber === 0) setPageNumber(1)
    if (pageNumber > 1) setPageNumber(pageNumber - 1)
  }
  const handleNextPage = () => {
    if (pageNumber >= 1) setPageNumber(pageNumber + 1)
  }

  const togglePage = async (direction) => {
    if (direction === 'next') handleNextPage()
    if (direction === 'prev') handlePreviousPage()

    if (direction === 'gallery') {
      const images = await fetchPexelsImages(imgCategory, 1)
      setPageNumber(1)
      setShowGallery(true)
    }
    if (direction === 'canvas') {
      setShowGallery(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (pageNumber !== 0) {
      fetchPexelsImages(imgCategory, pageNumber).then((data) => setGalleryImages(data.photos))
    }
  }, [pageNumber, imgCategory])

  return (
    <div className='w-full h-full pb-[35px] min-h-screen bg-[#121212] flex flex-col  justify-center items-center gap-2  border-[1px]'>
      <div className='w-[90%] h-auto flex justify-center items-center mt-12 py-1  border-white border-[1px] gap-2'>
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
            {!showGallery && (
              <button
                onClick={() => togglePage('gallery')}
                className='text-white text-2xl font-medium shadow-xl py-2 px-3 rounded-md border-white border-[1px] h-full bg-black'
              >
                <MdOutlinePhotoSizeSelectActual />
              </button>
            )}
            {showGallery && (
              <button
                onClick={() => togglePage('canvas')}
                className='text-white text-2xl font-medium shadow-xl py-2 px-3 rounded-md border-white border-[1px] h-full bg-black'
              >
                <SiCanva />
              </button>
            )}
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
          {!showGallery && <BannerSizeSelector onSelect={handleBannerSizeSelect} />}
          {imgUrls && showGallery && (
            <ImageSizeSelector imageSizeUrls={imgUrls} onSelect={handleImgSizeSelect} />
          )}
        </div>
        <div className='w-full h-[auto] flex justify-center py-2'>
          {imgUrls && showGallery && <InputBox onCategorySubmit={changeCategorySubmit} />}
          InputBox
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

      {selectedImage && (
        <div className='flex flex-col items-center relative'>
          <div className='justify-items-end'>
            <input
              type='range'
              min='0'
              max='1'
              step='0.01'
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
              className='mt-2'
            />
          </div>
        </div>
      )}

      <div
        id='canvas-container'
        className='flex items-center justify-center overflow-auto w-full h-full'
        style={{
          width: !selectedImage && width ? `${width}px` : '842px',
          height: !selectedImage && height ? `${height}px` : '595px',
        }}
      >
        {!showGallery ? (
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
            className='font-bold text-white text-center w-full  px-8 py-24  outline-none border-none resize-none'
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <div className='flex flex-col items-center relative'>
            {selectedImage && (
              <div className='w-full flex justify-center'>
                <img
                  id='resizable-image'
                  src={selectedImage}
                  alt='Selected'
                  style={{ width: `${width}px`, height: `${height}px`, opacity: opacity }}
                  className='object-contain'
                />
              </div>
            )}
          </div>
        )}
      </div>
      {showGallery && (
        <div className='overflow-x-auto flex gap-2 mt-4'>
          {galleryImages.map((image) => (
            <img
              key={image.id}
              src={image.src.small}
              alt='Gallery'
              className='w-28 h-28 cursor-pointer'
              onClick={() => fixSelectedImage(image.src)}
            />
          ))}
        </div>
      )}
      {showGallery && (
        <div className='overflow-x-auto flex gap-8 mt-4'>
          <span className='text-white w-[30px] '>
            <button
              onClick={() => togglePage('prev')}
              disabled={pageNumber === 1}
              className={`text-white text-2xl font-medium shadow-xl py-2 px-3 rounded-md border-white border-[1px] h-full bg-black ${
                pageNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaChevronLeft size={20} />{' '}
            </button>
          </span>
          <span className='text-white'>
            <button
              onClick={() => togglePage('next')}
              className={`text-white text-2xl font-medium shadow-xl py-2 px-3 rounded-md border-white border-[1px] h-full bg-black `}
            >
              <FaChevronRight size={20} />
            </button>
          </span>
        </div>
      )}
    </div>
  )
}

export default Canvas
