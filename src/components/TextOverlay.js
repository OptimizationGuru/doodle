import React, { useEffect, useRef } from 'react'

const TextOverlay = ({
  bgImage,
  text,
  setText,
  fontColor,
  bgOpacity,
  textOpacity,
  width,
  height,
}) => {
  const textRef = useRef(null)

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.color = fontColor
    }
  }, [fontColor, text])

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
        }}
      />

      {/* Text area with independent opacity */}
      <textarea
        ref={textRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='absolute text-center outline-none border-none resize-none w-full h-full px-2 py-2'
        style={{
          fontFamily: 'ABeeZee',
          fontSize: '24px',
          opacity: textOpacity,
          pointerEvents: 'auto',
        }}
      />
    </div>
  )
}

export default TextOverlay
