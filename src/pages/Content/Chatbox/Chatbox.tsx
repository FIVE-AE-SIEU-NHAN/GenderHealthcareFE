// src/components/ChatWidget.tsx
import React, { useState, useEffect, useRef } from 'react'
import { BotMessageSquare } from 'lucide-react' // replaced logo1 with BotMessageSquare icon
import { Input } from '@/components/ui/input'
import { X, Send } from 'lucide-react'

interface Message {
  id: string
  user: 'me' | 'ai'
  text: string
  createdAt: string
}

// Mẫu tin nhắn đầu
const initialMessages: Message[] = [
  {
    id: 'welcome',
    user: 'ai',
    text: `Welcome! I'm here to help you with questions about: https://code2tutorial.com/. What would you like to know?`,
    createdAt: new Date().toISOString(),
  },
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => initialMessages)
  const [newMsg, setNewMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Cuộn xuống cuối mỗi khi messages thay đổi
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, loading])

  const sendMessage = () => {
    if (!newMsg.trim()) return
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), user: 'me', text: newMsg.trim(), createdAt: new Date().toISOString() },
    ])
    setNewMsg('')
    setLoading(true)
    // TODO: integrate AI response, then setLoading(false) and setMessages([...])
  }

  const resetChat = () => {
    setMessages(initialMessages.map(msg => ({ ...msg, createdAt: new Date().toISOString() })))
    setLoading(false)
  }

  // Khi đóng, hiển thị nút mở chat dạng icon
  if (!open) {
    return (
      <button
        className="fixed bottom-4 right-4 w-20 h-20 p-4 rounded-full shadow-lg bg-[#1977cc]"
        onClick={() => setOpen(true)}
      >
        <BotMessageSquare className="w-full h-full text-white" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-[400px] h-[600px] flex flex-col bg-white shadow-xl rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500' : 'bg-green-500'}`} />
        </div>
        <h1 className="text-lg font-medium">Got Questions?</h1>
        <button className="p-2 rounded-full hover:bg-gray-100 transition" onClick={() => setOpen(false)}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Subheader */}
      <div className="px-4 py-1 text-sm text-gray-600 bg-gray-50">
        This chatbot is open source
      </div>

      {/* Chat Content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-4 flex flex-col"
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`max-w-[70%] p-2 rounded-xl ${
              msg.user === 'me' ? 'self-end bg-blue-100' : 'self-start bg-gray-100'
            }`}
          >
            <p className="text-sm text-gray-800">{msg.text}</p>
            <span className="block text-xs text-gray-500 mt-1 text-right">
              {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </span>
          </div>
        ))}

        {/* Thinking Indicator */}
        {loading && (
          <div className="self-start p-2 italic text-gray-500 flex items-center space-x-1">
            <span>Assistant is thinking</span>
            <span className="animate-pulse">...</span>
          </div>
        )}
      </div>

      {/* Enhanced Input */}
      <div className="flex items-center px-4 py-3 bg-white border-t">
        <div className="flex items-center flex-1 rounded-full border-2 border-blue-500 focus-within:border-blue-600 transition-colors px-4 py-2">
          <Input
            placeholder="Ask a question..."
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-transparent border-none focus:ring-0 placeholder-blue-300 text-gray-700"
          />
          <button
            onClick={sendMessage}
            disabled={!newMsg.trim()}
            className={`ml-2 p-2 rounded-full transition ${
              newMsg.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <span className="ml-3 text-sm text-gray-500">{newMsg.length}/1000</span>
      </div>
    </div>
  )
}
