import { create } from 'zustand'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ChatSession {
  sessionId: string
  history: Message[]
}

interface ChatStore {
  userName: string | null
  session: ChatSession | null
  messages: Message[]
  isChatOpen: boolean
  showNameDialog: boolean
  isLoading: boolean
  
  // Actions
  setUserName: (name: string) => void
  setSession: (session: ChatSession | null) => void
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  setChatOpen: (open: boolean) => void
  setShowNameDialog: (show: boolean) => void
  setLoading: (loading: boolean) => void
  clearChat: () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  userName: null,
  session: null,
  messages: [],
  isChatOpen: false,
  showNameDialog: false,
  isLoading: false,

  setUserName: (name) => set({ userName: name }),
  
  setSession: (session) => set({ session }),
  
  setMessages: (messages) => set({ messages }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  
  setChatOpen: (open) => set({ isChatOpen: open }),
  
  setShowNameDialog: (show) => set({ showNameDialog: show }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  clearChat: () => set({
    userName: null,
    session: null,
    messages: [],
    isChatOpen: false,
    showNameDialog: false,
    isLoading: false
  })
}))