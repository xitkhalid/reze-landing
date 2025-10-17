'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '@/lib/chat-store'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ChatSession {
  sessionId: string
  history: Message[]
}

interface ChatInterfaceProps {
  showChat?: boolean
  onChatClose?: () => void
}

export default function ChatInterface({ showChat: externalShowChat, onChatClose }: ChatInterfaceProps = {}) {
  const {
    userName,
    session,
    messages,
    isChatOpen,
    showNameDialog,
    isLoading,
    setUserName,
    setSession,
    setMessages,
    addMessage,
    setChatOpen,
    setShowNameDialog,
    setLoading,
    clearChat
  } = useChatStore()

  const [inputMessage, setInputMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isOpen = externalShowChat !== undefined ? externalShowChat : isChatOpen
  const setIsOpen = externalShowChat !== undefined ? onChatClose : (open: boolean) => setChatOpen(open)

  useEffect(() => {
    if (externalShowChat && !showNameDialog && !session) {
      setShowNameDialog(true)
    }
  }, [externalShowChat, showNameDialog, session, setShowNameDialog])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleChatWithReze = () => {
    if (externalShowChat === undefined) {
      setShowNameDialog(true)
    } else {
      setShowNameDialog(true)
    }
  }

  const createSession = async (name: string) => {
    try {
      const response = await fetch('https://api.team-ax.top/reze-ai/sessionID?action=create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: [{
            role: 'user',
            content: `Hello, my name is ${name}`
          }]
        })
      })

      const data = await response.json()
      if (data.success) {
        setSession({
          sessionId: data.session_id,
          history: data.history || []
        })
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to create session:', error)
      return false
    }
  }

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userName?.trim()) {
      setNameError('Name is required to start chatting')
      return
    }

    if (userName.trim().length < 2) {
      setNameError('Name must be at least 2 characters long')
      return
    }

    setLoading(true)
    const sessionCreated = await createSession(userName.trim())
    
    if (sessionCreated) {
      setShowNameDialog(false)
      if (externalShowChat === undefined) {
        setChatOpen(true)
      }
      // Add welcome message from Reze
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `Hello ${userName.trim()}! I'm Reze, your AI assistant. How can I help you today?`,
        timestamp: new Date().toISOString()
      }
      setMessages([welcomeMessage])
    } else {
      setNameError('Failed to create session. Please try again.')
    }
    
    setLoading(false)
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !session || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    addMessage(userMessage)
    setInputMessage('')
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
    
    setLoading(true)

    try {
      const response = await fetch(`https://api.team-ax.top/reze-ai/${session.sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage.trim(),
          session_id: session.sessionId,
          history: [...messages, userMessage]
        })
      })

      const data = await response.json()
      
      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: data.timestamp
        }
        addMessage(assistantMessage)
        
        // Update session history
        setSession({
          ...session,
          history: [...session.history, userMessage, assistantMessage]
        })
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }
      addMessage(errorMessage)
    }

    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setInputMessage(newValue)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showNameDialog) {
      e.preventDefault()
      handleNameSubmit(e)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={handleChatWithReze}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 border border-amber-200 hover:border-amber-300 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-5 h-5" />
        Chat With Reze
      </motion.button>

      {/* Name Dialog */}
      <AnimatePresence>
        {showNameDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 max-w-md w-full border border-amber-200 shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-amber-800" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">Welcome to Reze AI</h3>
                <p className="text-amber-700">What's your name?</p>
              </div>

              <form onSubmit={handleNameSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={userName || ''}
                    onChange={(e) => {
                      setUserName(e.target.value)
                      setNameError('')
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-amber-200 bg-white/80 backdrop-blur-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    autoFocus
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm mt-1">{nameError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNameDialog(false)
                      setUserName('')
                      setNameError('')
                    }}
                    className="flex-1 px-4 py-3 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Start Chatting'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 w-96 h-[600px] bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl border border-amber-200 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-t-2xl border-b border-amber-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900">Reze AI</h3>
                    <p className="text-xs text-amber-700">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen?.(false)}
                  className="text-amber-600 hover:text-amber-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-amber-800" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white'
                        : 'bg-white/80 backdrop-blur-sm text-amber-900 border border-amber-200'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-amber-800" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm text-amber-900 border border-amber-200 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 rounded-b-2xl">
              <div className="flex gap-2">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={handleInputChange}
                  placeholder="Type your message... (Press Enter for new line)"
                  className="flex-1 px-4 py-2 rounded-lg border border-amber-200 bg-white/80 backdrop-blur-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent resize-none"
                  maxLength={2000}
                  rows={1}
                  style={{
                    minHeight: '40px',
                    maxHeight: '120px',
                    overflowY: 'auto'
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg hover:from-amber-500 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-amber-600 mt-2 text-center">
                {inputMessage.length}/2000 characters
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}