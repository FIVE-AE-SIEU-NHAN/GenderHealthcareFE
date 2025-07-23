import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Send, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { BsRobot } from 'react-icons/bs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useSocket } from '@/contexts/SocketContext'
import { useAuth } from '@/contexts/AuthContext'
import ReactMarkdown from 'react-markdown'

const typingIndicatorStyles = `
  .typing-indicator span { height: 8px; width: 8px; background-color: #9E9EA1; border-radius: 50%; display: inline-block; animation: bounce 1.4s infinite ease-in-out both; }
  .typing-indicator span:nth-of-type(2) { animation-delay: -0.32s; }
  .typing-indicator span:nth-of-type(3) { animation-delay: -0.16s; }
  @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
`

interface Message {
  id: string
  user: 'me' | 'ai'
  text: string
  createdAt: string
}

const CHATBOT_HISTORY_KEY = 'chatbot_session_history'

const initialMessages: Message[] = [
  {
    id: 'welcome',
    user: 'ai',
    text: 'Hello! How can I assist you today? You can ask me to:\n- **Summarize** our main services.\n- Explain the difference between `basic` and `advanced` packages.\n- Provide a link to our [Privacy Policy](/terms-and-privacy).',
    createdAt: new Date().toISOString()
  }
]

interface ChatWidgetProps {
  onChatToggle: (isOpen: boolean) => void
}

export default function ChatWidget({ onChatToggle }: ChatWidgetProps) {
  const [open, setOpen] = useState(false)

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const storedHistory = sessionStorage.getItem(CHATBOT_HISTORY_KEY)
      return storedHistory ? JSON.parse(storedHistory) : initialMessages
    } catch (error) {
      console.error('Failed to parse chat history from sessionStorage:', error)
      return initialMessages
    }
  })

  const [newMsg, setNewMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const socket = useSocket()
  const { user } = useAuth()

  const chatRoomId = useMemo(() => {
    if (!user?.user_id) return null
    return user.user_id.split('-')[0]
  }, [user?.user_id])

  useEffect(() => {
    // Only save if there's more than the initial welcome message
    if (messages.length > 1) {
      sessionStorage.setItem(CHATBOT_HISTORY_KEY, JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket.connected && user?.user_id) {
        socket.emit('chatbot:session:end', { user_id: user.user_id })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [socket, user?.user_id])

  useEffect(() => {
    if (!open || !chatRoomId || !socket.connected) {
      return
    }

    socket.emit('chatbot:joinRoom', chatRoomId)

    const handleReply = (data: { reply: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          user: 'ai',
          text: data.reply,
          createdAt: new Date().toISOString()
        }
      ])
      setLoading(false)
    }

    const handleError = (data: { error: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          user: 'ai',
          text: data.error,
          createdAt: new Date().toISOString()
        }
      ])
      setLoading(false)
    }

    socket.on('chatbot:reply', handleReply)
    socket.on('chatbot:message:error', handleError)

    return () => {
      socket.off('chatbot:reply', handleReply)
      socket.off('chatbot:message:error', handleError)
    }
  }, [open, chatRoomId, socket])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  useEffect(() => {
    onChatToggle(open)
  }, [open, onChatToggle])

  const sendMessage = () => {
    const trimmedMsg = newMsg.trim()
    if (!trimmedMsg || !chatRoomId || !user) return

    setMessages((prev) => [
      ...prev,
      { id: `me-${Date.now()}`, user: 'me', text: trimmedMsg, createdAt: new Date().toISOString() }
    ])

    socket.emit('chatbot:message', {
      room_id: chatRoomId,
      user_id: user.user_id,
      message: trimmedMsg
    })

    setNewMsg('')
    setLoading(true)
  }

  useEffect(() => {
    const chatContainer = chatContainerRef.current
    const handleMouseEnter = () => {
      document.body.style.overflow = 'hidden'
    }
    const handleMouseLeave = () => {
      document.body.style.overflow = 'auto'
    }

    if (open && chatContainer) {
      chatContainer.addEventListener('mouseenter', handleMouseEnter)
      chatContainer.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      document.body.style.overflow = 'auto'
      if (chatContainer) {
        chatContainer.removeEventListener('mouseenter', handleMouseEnter)
        chatContainer.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [open])

  return (
    <TooltipProvider delayDuration={100}>
      <style>{typingIndicatorStyles}</style>

      {/* --- Chat Window --- */}
      <div
        ref={chatContainerRef}
        className={cn(
          'fixed right-6 bottom-6 z-50 flex h-[600px] w-[400px] flex-col rounded-2xl bg-white shadow-2xl transition-all duration-500 ease-in-out',
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        {/* Header */}
        <div className='bg-semi-dark-blue flex items-center justify-between rounded-t-2xl px-4 py-3 text-white'>
          <div className='flex items-center space-x-2'>
            <div className='relative flex h-8 w-8 items-center justify-center rounded-full bg-white/90'>
              <BsRobot className='text-semi-dark-blue h-5 w-5' />
              <span
                className={cn(
                  'border-semi-dark-blue absolute right-0 bottom-0 h-2 w-2 rounded-full border-2',
                  loading ? 'bg-yellow-400' : 'bg-green-400'
                )}
              />
            </div>
            <h1 className='text-lg font-semibold'>AI Assistant</h1>
          </div>
          <button
            className='rounded-full p-2 transition-colors hover:bg-white/20'
            onClick={() => setOpen(false)}
            aria-label='Close chat'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* --- Chat Content --- */}
        <div ref={scrollRef} className='flex-1 space-y-6 overflow-y-auto bg-gray-50 p-4'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn('flex items-end gap-2', msg.user === 'me' ? 'justify-end' : 'justify-start')}
            >
              {msg.user === 'ai' && (
                <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200'>
                  <BsRobot className='h-5 w-5 text-slate-600' />
                </div>
              )}

              <div
                className={cn(
                  'max-w-[75%] rounded-2xl p-3 shadow-sm',
                  msg.user === 'me'
                    ? 'bg-semi-dark-blue rounded-br-lg text-white'
                    : 'rounded-bl-lg bg-slate-100 text-slate-800'
                )}
              >
                {msg.user === 'me' ? (
                  <p className='text-sm'>{msg.text}</p>
                ) : (
                  <div
                    className={cn(
                      'prose prose-sm max-w-none',
                      'prose-p:text-slate-800',
                      'prose-a:text-blue-600 prose-a:font-medium hover:prose-a:underline',
                      'prose-strong:text-slate-900',
                      'prose-ul:list-disc prose-ul:pl-4 prose-li:marker:text-slate-500',
                      'prose-ol:list-decimal prose-ol:pl-4 prose-li:marker:text-slate-500',
                      'prose-code:bg-slate-200/60 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono'
                    )}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className='flex items-end gap-2'>
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200'>
                <BsRobot className='h-5 w-5 text-slate-600' />
              </div>
              <div className='rounded-2xl rounded-bl-lg bg-slate-100 p-3 shadow-sm'>
                <div className='typing-indicator'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className='rounded-b-2xl border-t bg-white px-4 py-3'>
          <div className='flex items-center rounded-full bg-gray-100 px-2 py-1'>
            <Input
              placeholder='Type your message...'
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className='flex-1 border-none bg-transparent p-5 text-gray-800 placeholder-gray-500 focus:ring-0!'
            />
            <button
              onClick={sendMessage}
              disabled={!newMsg.trim() || loading}
              className='bg-semi-dark-blue enabled:hover:bg-semi-dark-blue cursor-pointer rounded-full p-2 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-300'
              aria-label='Send message'
            >
              <Send className='h-4 w-4 -translate-x-0.5 rotate-45' />
            </button>
          </div>
        </div>
      </div>

      {/* --- Open Chat Button --- */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'group bg-light-blue flex h-[54px] w-[54px] cursor-pointer items-center justify-center rounded-full shadow-xl transition-all duration-300 ease-in-out',
          'hover:bg-semi-dark-blue hover:-translate-y-[2.5px] active:translate-y-[1.5px]',
          open ? 'pointer-events-none scale-75 opacity-0' : 'scale-100 opacity-100'
        )}
        aria-label='Open chat widget'
      >
        <BsRobot className='size-7 text-white' />
      </button>
    </TooltipProvider>
  )
}
