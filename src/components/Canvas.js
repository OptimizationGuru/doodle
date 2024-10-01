import React, { useEffect, useState, useContext, useRef } from 'react'
import { BiSolidColorFill, MdOutlinePhotoSizeSelectActual, LuUploadCloud } from '../utils/icons'
import { BannerStyleContext } from './BannerStyle'
import { downloadDOMImage } from '../utils/downloadCanvas'
import { uploadImage } from '../utils/imageUpload'
import FontColorPicker from '../utils/FontColorPicker'
import BgShadePicker from '../utils/BgColorPicker'
import BannerSizeSelector from './BannerSizeSelector'
import FontSizeSelector from './FontSizeSelector'
import FontStyleSelector from './FontStyleSelector'
import { BsCloudDownload } from 'react-icons/bs'
import FontFamilySelector from './FontFamilySelector'
import { fetchPexelsImages } from '../resources/PexelsPhotos'
import { FaChevronLeft, FaChevronRight, FaDownload, FaGithub } from 'react-icons/fa'
import { SiCanva } from 'react-icons/si'
import ImageSizeSelector from './ImageSizeSelector'
import InputBox from './ImgCategory'
import TextOverlay from './TextOverlay'
import { display_msg, display_sorry_msg, github_repo_link } from '../constant'

const Canvas = () => {
  const [textEntered, setTextEntered] = useState(false)
  const [displayText, setDisplayText] = useState(display_msg)
  const [text, setText] = useState('Your ideas, your canvas, your creation..!')
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [currentFamilyFont, setCurrentFamilyFont] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [showGallery, setShowGallery] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imgCategory, setImgCategory] = useState('Mountains')
  const [opacity, setOpacity] = useState(0.5)
  const [imgUrls, setImgUrls] = useState([])
  const [bgShadePicker, showBgShadePicker] = useState(false)
  const [textShadePicker, showTextShadePicker] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [refresh, setRefresh] = useState(0)
  const bgPickerRef = useRef(null)
  const textPickerRef = useRef(null)

  const { fontSize, fontStyle, fontColor, bgColor, toggleStyle } = useContext(BannerStyleContext)

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

  const handleFontSizeSelect = (textSize) => {
    toggleStyle({ size: textSize })
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
      setSelectedImage(false)
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
      fetchPexelsImages(imgCategory, pageNumber).then((data) => {
        setGalleryImages(data.photos)
      })
    }
  }, [pageNumber, imgCategory, galleryImages])

  return (
    <div className='w-full h-full pb-[35px] min-h-screen bg-[#121212] flex flex-col  justify-center items-center gap-2  border-[1px]  overflow-y-hidden'>
      <div
        className={`fixed top-0 z-20  right-0 bg-black h-auto flex justify-center items-center py-1 border-white border-[1px] gap-2 ${
          showGallery ? 'w-[95%] left-[2.5%]' : 'w-[75%] left-[12%]'
        }`}
      >
        <div className='w-full h-[auto] flex justify-center items-center py-2 px-2 mx-2 gap-3'>
          {/* Font Color Selector */}
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

          {/* Bg Color Selector */}
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

          {/* File Upload Selector Selector */}
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

          {/* Toggler text/image Selector */}
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

        {/* Font Size Selector */}
        <div className='w-full h-[auto] flex justify-center py-2'>
          <FontSizeSelector onSelect={handleFontSizeSelect} />
        </div>

        {/* Font Style Selector */}
        <div className='w-full h-[auto] flex justify-center py-2'>
          <FontStyleSelector onSelect={handleFontStyleSelect} />
        </div>

        {/* Font Family Selector */}
        <div className='w-full h-[auto] flex justify-center py-2'>
          <FontFamilySelector onSelect={handleFontFamilySelect} />
        </div>

        {/*  Size Selectors */}
        <div className='w-full h-[auto] flex justify-center py-2'>
          {/*  Textarea Size Selector */}
          {
            <div className='w-full h-[auto] flex justify-center py-2'>
              <BannerSizeSelector onSelect={handleBannerSizeSelect} />
            </div>
          }

          {/*  Image Size Selector */}
          {imgUrls && showGallery && (
            <div className='w-full h-[auto] flex justify-center py-2 mx-2'>
              <ImageSizeSelector imageSizeUrls={imgUrls} onSelect={handleImgSizeSelect} />
            </div>
          )}
        </div>

        {/*  Search Image by Category */}
        {imgUrls && showGallery && (
          <div className='w-full h-[auto] flex justify-center py-2 mx-2'>
            <InputBox onCategorySubmit={changeCategorySubmit} />
          </div>
        )}

        {/* Download btn */}
        <div className='w-full h-[auto] flex gap-3 justify-center py-2'>
          <div>
            <button
              onClick={handleImgDownload}
              className='text-white  flex gap-2 my-2  py-2 px-3 rounded-md border-white border-[1px]  bg-black'
            >
              <span className='my-1'>
                <FaDownload size={20} />
              </span>
            </button>
          </div>
          <div>
            <a href={github_repo_link} target='_blank'>
              <button className='text-white  flex gap-1 my-2   py-2 px-3  rounded-md border-white border-[1px]  bg-black'>
                <span className='my-1'>
                  <FaGithub size={20} />
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col items-center  overflow-y-hidden relative ${
          !selectedImage ? 'hidden' : ''
        }`}
        style={{ marginTop: '90px', zIndex: 5 }}
      >
        <label className='text-white text-lg'>Opacity</label>
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

      <div
        id='canvas-container'
        className='flex items-center overflow-y-hidden justify-center overflow-auto w-full h-full'
        style={{
          width: !selectedImage && width ? `${width}px` : 'auto',
          height: !selectedImage && height ? `${height}px` : 'auto',
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
              width: '100%',
              height: '100%',
            }}
            className={`font-bold text-white text-center outline-none border-none resize-none mt-[300px] ${
              textEntered ? 'py-6' : 'py-[200px]'
            }`}
            onChange={(e) => {
              setText(e.target.value), setTextEntered(true)
            }}
          />
        ) : (
          <div className='flex flex-col gap-4 w-full h-full item-center justify-center relative'>
            {!selectedImage && showGallery && (
              <div className=' p-4 rounded-lg shadow-md w-auto h-auto -my-[48]'>
                <p className='text-white  text-center text-lg'>
                  {galleryImages.length > 0 ? displayText : display_sorry_msg}
                </p>
              </div>
            )}
            {selectedImage && (
              <div className='flex flex-col items-center justify-center w-full h-full p-4'>
                <TextOverlay
                  bgImage={selectedImage}
                  text={text}
                  setText={setText}
                  textColor={fontColor}
                  textSize={fontSize}
                  textStyle={fontStyle}
                  bgOpacity={1}
                  textOpacity={opacity}
                  width={width}
                  height={height}
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
                galleryImages.length < 1 || pageNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaChevronLeft size={20} />{' '}
            </button>
          </span>
          <span className='text-white'>
            <button
              onClick={() => togglePage('next')}
              className={`text-white text-2xl font-medium shadow-xl py-2 px-3 rounded-md border-white border-[1px] h-full bg-black ${
                galleryImages.length < 10 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
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
