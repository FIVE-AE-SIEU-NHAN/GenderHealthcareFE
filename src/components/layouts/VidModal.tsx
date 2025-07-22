import React, { useState, useEffect } from 'react'
import { FaPlay } from 'react-icons/fa'
import VidOverlay from '@/assets/images/overlay.webp'

const VideoPopup = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click is on the backdrop itself, not inside the modal
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  return (
    <>
      {/* Image with play icon */}
      <div
        onClick={() => setIsOpen(true)}
        className='relative h-full w-full cursor-pointer overflow-hidden rounded-lg shadow-md'
      >
        <img src={VidOverlay} alt='Video preview' className='h-full w-full object-cover' />
        <div className='absolute inset-0 flex items-center justify-center bg-black/40 transition hover:bg-black/60'>
          <FaPlay className='text-4xl text-white' />
        </div>
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div onClick={handleBackdropClick} className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'>
          <div className='relative w-[90%] overflow-hidden rounded-lg bg-white md:w-[720px]'>
            <button
              onClick={() => setIsOpen(false)}
              className='absolute top-2 right-2 z-[1000] text-2xl font-bold text-black hover:text-red-600'
            >
              &times;
            </button>
            <div className='aspect-video w-full'>
              <video src='/videos/test.mp4' controls autoPlay className='h-full w-full' />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VideoPopup
