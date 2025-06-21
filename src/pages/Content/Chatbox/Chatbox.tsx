// src/pages/ChatPage.tsx
import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Maximize2, RefreshCw, X, Send } from 'lucide-react'

interface Message {
  id: string
  user: 'me' | 'ai'
  text: string
  createdAt: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      user: 'ai',
      text: `Welcome! I'm here to help you with questions about: https://code2tutorial.com/. What would you like to know?`,
      createdAt: new Date().toISOString(),
    },
  ])
  const [newMsg, setNewMsg] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Tự động cuộn xuống cuối mỗi khi messages thay đổi
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages])

  // Gửi tin nhắn (hiện tại chỉ update local để test UI)
  const sendMessage = () => {
    if (!newMsg.trim()) return
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        user: 'me',
        text: newMsg.trim(),
        createdAt: new Date().toISOString(),
      },
    ])
    setNewMsg('')
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="p-2">
            <Maximize2 />
          </Button>
          <Button variant="ghost" className="p-2">
            <RefreshCw />
          </Button>
          <span className="w-2 h-2 bg-green-500 rounded-full" />
        </div>
        <h1 className="text-lg font-medium">Got Questions?</h1>
        <Button variant="ghost" className="p-2">
          <X />
        </Button>
      </div>

      {/* Subheader */}
      <div className="px-4 py-2 text-sm text-gray-600 bg-gray-50">
        This chatbot is open source
      </div>

      {/* Chat Content (fallback without ScrollArea) */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-4"
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`max-w-[70%] p-3 rounded-xl ${
              msg.user === 'me' ? 'self-end bg-blue-100' : 'self-start bg-gray-100'
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <span className="block text-xs text-gray-500 mt-1 text-right">
              {new Date(msg.createdAt).toLocaleTimeString('vi-VN')}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center px-4 py-3 border-t bg-white">
        <Input
          placeholder="Ask a question..."
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          className="flex-1"
        />
        <span className="ml-2 text-sm text-gray-500">{newMsg.length}/1000</span>
        <Button className="ml-2" onClick={sendMessage} disabled={!newMsg.trim()}>
          <Send />
        </Button>
      </div>
    </div>
  )
}
