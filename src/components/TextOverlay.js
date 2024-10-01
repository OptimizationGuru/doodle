import React, { useEffect, useRef, useState } from 'react'

const TextOverlay = ({
  bgImage,
  text,
  setText,
  textColor,
  textSize,
  textStyle,
  bgOpacity,
  textOpacity,
  width,
  height,
}) => {
  const textRef = useRef(null)

  const [textEnteredImg, setTextEnteredImg] = useState(true)

  useEffect(() => {
    setTextEnteredImg(!textEnteredImg)
  }, [text])

  useEffect(() => {
    if (textRef.current) textRef.current.style.color = textColor
  }, [textColor])

  return (
    <div
      className='relative flex justify-center items-center'
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {/* Background with opacity */}
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: bgOpacity,
          position: 'absolute',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Text area with independent opacity */}
      <textarea
        ref={textRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`absolute text-center outline-none border-none resize-none w-full h-full px-2 ${
          textEnteredImg ? 'py-[50px]' : 'py-[250px]'
        }`}
        style={{
          fontFamily: 'ABeeZee',
          fontStyle: textStyle,
          fontSize: textSize,
          fontColor: textColor,
          opacity: textOpacity,
          pointerEvents: 'auto',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          zIndex: 1,
        }}
      />
    </div>
  )
}

export default TextOverlay
