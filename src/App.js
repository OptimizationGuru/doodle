import React from 'react'
import Canvas from './components/Canvas'
import BannerStyle from './components/BannerStyle'

const App = () => {
  return (
    <BannerStyle>
      <div className='bg-[#121212] flex items-center justify-center -py-4 min-h-screen'>
        <div className='relative'>
          <Canvas />
        </div>
      </div>
    </BannerStyle>
  )
}

export default App
