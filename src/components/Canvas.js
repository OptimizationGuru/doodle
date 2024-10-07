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
        setGalleryImages(data?.photos)
      })
    }
  }, [pageNumber, imgCategory, galleryImages])

  return (
    <div className='w-full h-full pb-[95px] min-h-screen bg-[#121212] flex flex-col justify-center items-center overflow-y-hidden'>
      <div
        className={`grid fixed top-0 z-20 right-0  bg-black h-auto justify-center items-center border-white border-[1px] xs:flex xs:flex-col xs:justify-center  xs:w-full sm:grid-cols-12 sm:w-full sm:-mb-[1000px] md:grid-cols-12  lg:grid-cols-8 xl:grid-cols-12 2xl:grid-cols-12`}
      >
        <div className='flex justify-center items-center h-auto  py-2  gap-3  px-2 sm:col-span-12 md:col-span-6 lg:col-span-3 lg:ml-[250px]  xl:col-span-2 xl:ml-8 2xl:ml-24 2xl:col-span-2 '>
          <div className='w-auto h-auto relative' ref={textPickerRef}>
            <button
              onClick={toggleTextColorPicker}
              className='text-white  font-medium py-2 px-4  shadow-xl rounded-md border-white border-[1px] h-full bg-black'
            >
              A
            </button>
            {textShadePicker && (
              <div className='mt-4 absolute'>
                <FontColorPicker />
              </div>
            )}
          </div>

          <div className='w-auto h-auto  relative' ref={bgPickerRef}>
            <button
              onClick={toggleBgColorPicker}
              className='text-white text-2xl font-medium shadow-xl py-2 px-3 rounded-md border-white border-[1px] h-full bg-black'
            >
              <BiSolidColorFill />
            </button>

            {bgShadePicker && (
              <div className='mt-4 absolute py-2' onClick={toggleBgColorPicker}>
                <BgShadePicker />
              </div>
            )}
          </div>

          <div className='w-auto h-auto relative'>
            <div>
              <input
                type='file'
                onChange={(e) => handleImgUpload(e)}
                className='text-white absolute inset-0 py-2 opacity-0 cursor-pointer'
              />
            </div>
            <button className='text-white py-2 text-2xl font-medium shadow-xl  px-3 rounded-md border-white border-[1px] h-full bg-black'>
              <LuUploadCloud />
            </button>
          </div>

          <div className='w-auto h-auto'>
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

        <div className='flex items-center justify-center gap-2  px-2  py-1 sm:col-span-12 md:col-span-6 lg:col-span-3 lg:ml-[120px] xl:col-span-4  2xl:col-span-4 '>
          <div className='w-auto h-auto flex justify-center py-1 '>
            <FontSizeSelector onSelect={handleFontSizeSelect} />
          </div>

          <div className='w-auto h-auto flex justify-center py-1 '>
            <FontStyleSelector onSelect={handleFontStyleSelect} />
          </div>

          <div className='w-auto h-auto flex justify-center py-1 '>
            <FontFamilySelector onSelect={handleFontFamilySelect} />
          </div>
        </div>

        <div className='flex gap-2 items-center justify-center px-2 py-1  xs:flex-wrap xs:justify-evenly xs:gap-0 sm:col-span-12 md:col-span-8 md:ml-[250px] lg:col-span-8 xl:col-span-5 xl:ml-24 2xl:w-[auto] 2xl:col-span-5 '>
          <div className='w-auto h-auto flex justify-center items-center py-1'>
            <div className='w-auto h-auto flex justify-center items-center py-1 mx-1'>
              <BannerSizeSelector onSelect={handleBannerSizeSelect} />
            </div>

            {imgUrls && showGallery && (
              <div className='w-auto h-auto flex justify-center items-center py-1 mx-1 xs:grid-cols-12'>
                <ImageSizeSelector imageSizeUrls={imgUrls} onSelect={handleImgSizeSelect} />
              </div>
            )}
          </div>

          {imgUrls && showGallery && (
            <div className='w-auto h-auto flex items-center justify-center mx-1 py-1 xs:grid-cols-12'>
              <InputBox onCategorySubmit={changeCategorySubmit} />
            </div>
          )}

          <div className='w-auto h-auto flex gap-2 items-center justify-center py-1 xs:grid-cols-12'>
            <div>
              <button
                onClick={handleImgDownload}
                className='text-white  flex py-1 px-3 rounded-md border-white border-[1px]  bg-black'
              >
                <span className='my-[6px]'>
                  <FaDownload size={20} />
                </span>
              </button>
            </div>

            <div>
              <a href={github_repo_link} target='_blank'>
                <button className='text-white  flex gap-1 py-1 px-3  rounded-md border-white border-[1px]  bg-black'>
                  <span className='my-[6px]'>
                    <FaGithub size={20} />
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className='flex items-center overflow-y-hidden justify-center w-auto h-full xs:mt-[220px] sm:mt-[180px] md:mt-[100px] lg:mt-[150px] xl:mt-[130px] 2xl:mt-[100px]'
        style={{
          width: !selectedImage && width ? `${width}px` : 'auto',
          height: !selectedImage && height ? `${height}px` : 'auto',
        }}
      >
        {!showGallery ? ( //white text
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
            className={`font-bold text-white text-center outline-none border-none resize-none -mt-[80px] ${
              textEntered ? 'py-6' : 'py-[200px]'
            } `}
            onChange={(e) => {
              setText(e.target.value), setTextEntered(true)
            }}
          />
        ) : (
          //banner
          <div className='flex flex-col gap-4 w-full h-full item-center justify-center sm:mt-[100px] md:mt-[10px]'>
            {!selectedImage && showGallery && (
              <div className='w-auto justify-center  text-center text-wrap p-4 rounded-lg shadow-md h-auto xs:text-sm xs:w-1/2 xs:mt-32 xs:mx-auto xs:text-wrap sm:w-2/3 sm:mt-32 sm:mx-auto sm:text-wrap'>
                <p className='text-white text-center text-lg xs:text-sm xs:w-1/2 xs:mt-12 xs:mx-auto xs:text-wrap'>
                  {galleryImages.length > 0 ? displayText : display_sorry_msg}
                </p>
              </div>
            )}
            {selectedImage && (
              <div className='flex flex-col items-center justify-center w-full h-full px-4 py-2  xs:mt-[270px] sm:mt-[100px] md:mt-[150px] lg:mt-[150px] xl:mt-[130px] 2xl:mt-[50px]'>
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

      <div
        className={`w-auto p-2 my-4 flex items-center gap-4 text-center justify-center overflow-y-hidden   ${
          !selectedImage ? 'hidden' : ''
        }`}
      >
        <label className='text-white text-lg '>Opacity</label>
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

      <div className=' w-full h-auto flex items-center justify-center  ml-12 px-4 overflow-x-auto gap-4 mt-4 '>
        {showGallery &&
          galleryImages.map((image) => (
            <img
              key={image.id}
              src={image.src.small}
              alt='Gallery'
              className='w-28 h-28 cursor-pointer'
              onClick={() => fixSelectedImage(image.src)}
            />
          ))}
      </div>

      {showGallery && (
        <div className='overflow-x-auto flex gap-8 mt-4'>
          <span className='text-white w-[30px] '>
            <button
              onClick={() => togglePage('prev')}
              disabled={pageNumber === 1}
              className={`text-white text-2xl font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black ${
                galleryImages.length < 1 || pageNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaChevronLeft size={20} />{' '}
            </button>
          </span>
          <span className='text-white'>
            <button
              onClick={() => togglePage('next')}
              className={`text-white text-2xl font-medium shadow-xl py-1 px-3 rounded-md border-white border-[1px] h-full bg-black ${
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
