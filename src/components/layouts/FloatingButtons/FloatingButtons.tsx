import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiChevronUp } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import ChatWidget from '@/components/Chats/AI Chatbot/ChatBot'
import { PiSealQuestionFill } from 'react-icons/pi'

function ScrollToTopButton({ isChatOpen }: { isChatOpen: boolean }) {
  const [isPastScrollThreshold, setIsPastScrollThreshold] = useState(false)
  const [isScrolling, setIsScrolling] = useState(true)

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsPastScrollThreshold(window.scrollY > 300)

      setIsScrolling(true)

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }

      timeoutIdRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 2000) // 2secs
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current) // Clear timeout on unmount
      }
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const shouldBeVisible = isPastScrollThreshold && !isChatOpen && isScrolling

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'group bg-light-blue flex h-[54px] w-[54px] cursor-pointer items-center justify-center rounded-full shadow-xl transition-all duration-300 ease-in-out',
        'hover:bg-semi-dark-blue hover:-translate-y-[2.5px] active:translate-y-[1.5px]',
        shouldBeVisible ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
      )}
      aria-label='Back to top'
    >
      <HiChevronUp className='upArrow size-9 font-black text-white transition-transform duration-300 group-hover:-translate-y-0.5' />
    </button>
  )
}

function AskQuestionButton({ isChatOpen }: { isChatOpen: boolean }) {
  const navigate = useNavigate()

  const handleAskQuestion = () => {
    window.scrollTo(0, 0)
    navigate('/ask-question')
  }

  return (
    <div className='z-50'>
      <button
        onClick={handleAskQuestion}
        className={cn(
          'group bg-light-blue flex h-[54px] w-[54px] cursor-pointer items-center justify-center rounded-full shadow-xl transition-all duration-300 ease-in-out',
          'hover:bg-semi-dark-blue hover:-translate-y-[2.5px] active:translate-y-[1.5px]',

          isChatOpen ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'
        )}
        aria-label='Ask a question'
      >
        {/* --- The Icon --- */}
        <PiSealQuestionFill className='size-8 font-black text-white transition-transform duration-300 group-hover:-translate-y-0.5' />
      </button>
    </div>
  )
}

export default function FloatingButtons() {
  const location = useLocation()
  const [isChatOpen, setChatOpen] = useState(false)

  const excludedPaths = ['/login', '/signup', '/unauth', '/reset-password', '/forgot-password']

  const excludedPrefixes = ['/dashboard', '/manager', '/consultant', '/doctor', '/user']

  const isPathExcluded =
    excludedPaths.includes(location.pathname) || excludedPrefixes.some((prefix) => location.pathname.startsWith(prefix))

  if (isPathExcluded) {
    return null
  }

  return (
    <>
      <div className='fixed right-6 bottom-6 z-10 flex flex-col gap-[5px]'>
        <ScrollToTopButton isChatOpen={isChatOpen} />
        <AskQuestionButton isChatOpen={isChatOpen} />
        <ChatWidget onChatToggle={setChatOpen} />
      </div>
    </>
  )
}
