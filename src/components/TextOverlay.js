import React, { useEffect, useRef } from 'react'

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

      <div
        className='absolute w-full h-full'
        style={{
          backgroundColor: `rgba(0, 0, 0, ${0.5})`,
          opacity: 1,
          pointerEvents: 'none',
        }}
      />

      <textarea
        ref={textRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='absolute text-center outline-none border-none resize-none w-full h-full px-2 py-2'
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
