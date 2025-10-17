'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Send, Loader2, Copy, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import './globals.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  id?: string
}

interface ChatSession {
  sessionId: string
  history: Message[]
}

const quickSuggestions = [
  "What can you help me with?",
  "How do you work?",
  "What are your capabilities?",
  "Can you help me with coding?",
  "Tell me about yourself",
  "What makes you different?"
]

export default function ChatPage() {
  const router = useRouter()
  const [showNameDialog, setShowNameDialog] = useState(true)
  const [userName, setUserName] = useState('')
  const [session, setSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [nameError, setNameError] = useState('')
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const createSession = async (name: string) => {
    try {
      const response = await fetch('https://api.team-ax.top/reze-ai/sessionID.php?action=create', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()
      if (data.success) {
        const newSession: ChatSession = {
          sessionId: data.session_id,
          history: data.history || []
        }
        setSession(newSession)
        
        // Add initial message with user's name
        const initialMessage: Message = {
          role: 'user',
          content: `Hello, my name is ${name}`,
          timestamp: new Date().toISOString(),
          id: `msg-${Date.now()}-0`
        }
        
        // Send initial message to get welcome response
        const welcomeResponse = await sendMessageToAPI(initialMessage, data.session_id, [])
        if (welcomeResponse) {
          welcomeResponse.id = `msg-${Date.now()}-1`
          setMessages([initialMessage, welcomeResponse])
        } else {
          setMessages([initialMessage])
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to create session:', error)
      return false
    }
  }

  const sendMessageToAPI = async (message: Message, sessionId: string, history: Message[]): Promise<Message | null> => {
    try {
      console.log('Sending message:', message.content)
      
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 45000) // Increased to 45 seconds for long responses
      })
      
      // Create the fetch promise
      const fetchPromise = fetch('https://api.team-ax.top/reze-ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
        },
        body: JSON.stringify({
          message: message.content,
          session_id: sessionId,
          history: history
        })
      })

      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise])

      if (!response.ok) {
        console.error('API response not OK:', response.status, response.statusText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API response received, success:', data.success)
      
      if (data.success && data.message) {
        // Ensure the message content is properly sanitized and handle long responses
        let messageContent = data.message
        
        // Handle different types of message content
        if (typeof messageContent === 'string') {
          // Clean up the message content
          messageContent = messageContent
            .trim()
            .replace(/\n{3,}/g, '\n\n') // Reduce excessive newlines
            .replace(/\s{2,}/g, ' ') // Reduce excessive spaces
        } else {
          messageContent = String(messageContent)
        }
        
        return {
          role: 'assistant',
          content: messageContent,
          timestamp: data.timestamp || new Date().toISOString()
        }
      } else {
        console.error('API returned success:false or missing message:', data)
        return null
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      if (error instanceof Error && error.message === 'Request timeout') {
        return {
          role: 'assistant',
          content: 'Sorry, the request took too long to process. This might happen with complex questions. Please try again with a shorter message.',
          timestamp: new Date().toISOString()
        }
      }
      return {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your message. Please try again.',
        timestamp: new Date().toISOString()
      }
    }
  }

  const updateSessionHistory = async (sessionId: string, history: Message[]) => {
    try {
      await fetch('https://api.team-ax.top/reze-ai/sessionID.php?action=update&session_id=' + sessionId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: history
        })
      })
    } catch (error) {
      console.error('Failed to update session history:', error)
    }
  }

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userName.trim()) {
      setNameError('Name is required to start chatting')
      return
    }

    if (userName.trim().length < 2) {
      setNameError('Name must be at least 2 characters long')
      return
    }

    setIsLoading(true)
    const sessionCreated = await createSession(userName.trim())
    
    if (sessionCreated) {
      setShowNameDialog(false)
    } else {
      setNameError('Failed to create session. Please try again.')
    }
    
    setIsLoading(false)
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !session || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
      id: `msg-${Date.now()}-user`
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputMessage('')
    setIsLoading(true)

    try {
      const assistantMessage = await sendMessageToAPI(userMessage, session.sessionId, newMessages)
      
      if (assistantMessage) {
        assistantMessage.id = `msg-${Date.now()}-assistant`
        const finalMessages = [...newMessages, assistantMessage]
        setMessages(finalMessages)
        
        // Update session history
        setSession(prev => prev ? {
          ...prev,
          history: finalMessages
        } : null)
        
        // Update session on server (don't wait for this to complete)
        updateSessionHistory(session.sessionId, finalMessages).catch(error => {
          console.error('Failed to update session history:', error)
        })
      } else {
        // Handle case where API returns null
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Sorry, I could not process your message. Please try again.',
          timestamp: new Date().toISOString(),
          id: `msg-${Date.now()}-error`
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        id: `msg-${Date.now()}-error`
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      // Always ensure loading state is cleared
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      // Only handle Enter for name dialog, not for sending messages
      if (showNameDialog) {
        handleNameSubmit(e)
      }
      // Removed sendMessage() call - only Send button should send messages
    }
  }

  const copyMessage = async (content: string, messageId: string) => {
    try {
      // Clean the content - remove any extra whitespace or hidden characters
      const cleanContent = content.trim().replace(/\s+/g, ' ')
      console.log('Copying message:', cleanContent)
      
      await navigator.clipboard.writeText(cleanContent)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = content
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopiedMessageId(messageId)
        setTimeout(() => setCopiedMessageId(null), 2000)
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError)
      }
      document.body.removeChild(textArea)
    }
  }

  const regenerateResponse = async (messageIndex: number) => {
    if (messageIndex > 0 && messages[messageIndex].role === 'assistant') {
      const userMessage = messages[messageIndex - 1]
      const previousMessages = messages.slice(0, messageIndex - 1)
      
      setIsLoading(true)
      const newResponse = await sendMessageToAPI(userMessage, session!.sessionId, previousMessages)
      
      if (newResponse) {
        const updatedMessages = [...previousMessages, userMessage, newResponse]
        setMessages(updatedMessages)
        await updateSessionHistory(session!.sessionId, updatedMessages)
      }
      
      setIsLoading(false)
    }
  }

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Name Dialog */}
      <AnimatePresence>
        {showNameDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full border border-gray-200 shadow-2xl dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <img src="/reze-logo.png" alt="Reze AI" className="w-10 h-10 rounded" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Welcome to Reze AI</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">What should I call you?</p>
              </div>

              <form onSubmit={handleNameSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value)
                      setNameError('')
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400"
                    autoFocus
                  />
                  {nameError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 text-center"
                    >
                      {nameError}
                    </motion.p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Link href="/" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full px-4 py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 transition-all dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      'Start Chatting'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      {!showNameDialog && (
        <>
          {/* Clean Header - Fixed Position */}
          <header className="flex-shrink-0 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2">
                      <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                      <img src="/reze-logo.png" alt="Reze AI" className="w-6 h-6 rounded" />
                    </div>
                    <div>
                      <h1 className="font-semibold text-gray-900 dark:text-white">Reze AI</h1>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Advanced AI Assistant</p>
                    </div>
                  </div>
                </div>
                {userName && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{userName}</span>
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Messages Area - Takes remaining space */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950"
          >
            <div className="max-w-4xl mx-auto">
              {messages.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <img src="/reze-logo.png" alt="Reze AI" className="w-10 h-10 rounded" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">What can I help with?</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">Ask anything, I'm here to assist you</p>
                  
                  {/* Quick Suggestions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickSuggestion(suggestion)}
                        className="p-4 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 hover:border-gray-300 transition-all text-sm text-gray-700 hover:text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-6 px-4 space-y-6">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                          <img src="/reze-logo.png" alt="Reze AI" className="w-5 h-5 rounded" />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] lg:max-w-[70%] group`}>
                        <div className={`rounded-lg px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className={`text-xs ${
                              message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyMessage(message.content, message.id || `msg-${index}`)}
                                className={`h-6 w-6 p-0 hover:bg-gray-100 transition-colors ${
                                  message.role === 'user' 
                                    ? 'text-blue-100 hover:bg-blue-600 hover:text-white' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                                }`}
                                title="Copy message"
                              >
                                {copiedMessageId === (message.id || `msg-${index}`) ? (
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </Button>
                              {message.role === 'assistant' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => regenerateResponse(index)}
                                  className="h-6 w-6 p-0 hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                                  title="Regenerate response"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-white text-sm font-bold">
                            {userName ? userName.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Loading Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                        <img src="/reze-logo.png" alt="Reze AI" className="w-5 h-5 rounded" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-gray-400 rounded-full dark:bg-gray-500"
                                animate={{
                                  y: [0, -4, 0],
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Reze is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="flex-shrink-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
            <div className="max-w-4xl mx-auto p-4">
              <div className="relative flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = Math.min(target.scrollHeight, 120) + 'px'
                  }}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="absolute right-2 bottom-2 w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              {/* Footer */}
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Reze can make mistakes, Please double-check responses
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}