import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Square, Trash2, Brain, Plus, MessageSquare, Zap, Clock } from 'lucide-react'
import { Streamdown } from 'streamdown'
import { useAIChat } from '@/lib/ai-hook'
import type { ChatMessages } from '@/lib/ai-hook'
import { getUser } from '@/lib/auth'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

// ── Types ─────────────────────────────────────────────────────────────────────

interface Session {
  id: string
  title: string
  created_at: string
  updated_at: string
}

interface DbMessage {
  id: string
  session_id: string
  role: string
  content: string
  created_at: string
}

// ── API helpers ───────────────────────────────────────────────────────────────

async function apiGetSessions(): Promise<Session[]> {
  try {
    const res = await fetch('/api/sessions')
    return res.ok ? res.json() : []
  } catch {
    return []
  }
}

async function apiCreateSession(title: string) {
  const res = await fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Session creation failed')
  }

  return data
}

async function apiDeleteSession(id: string): Promise<void> {
  await fetch(`/api/sessions?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
}

async function apiGetMessages(sessionId: string): Promise<DbMessage[]> {
  try {
    const res = await fetch(`/api/session-messages?sessionId=${encodeURIComponent(sessionId)}`)
    return res.ok ? res.json() : []
  } catch {
    return []
  }
}

async function apiSaveMessage(sessionId: string, role: string, content: string): Promise<void> {
  await fetch('/api/session-messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, role, content }),
  })
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function dbToUIMessage(msg: DbMessage): ChatMessages[number] {
  return {
    id: msg.id,
    role: msg.role as 'user' | 'assistant',
    parts: [
      {
        type: 'text',
        content: msg.content,
      },
    ],
    createdAt: new Date(msg.created_at),
  } as ChatMessages[number]
}

function getMessageText(
  msg: ChatMessages[number]
): string {
  const part = msg.parts.find(
    (p) => p.type === 'text'
  )

  return part && 'content' in part
    ? String(part.content ?? '')
    : ''
}

function formatTime(dateStr: string) {
  if (!dateStr) return 'Unknown'

  const date = new Date(dateStr + 'Z')

  if (isNaN(date.getTime()))
    return 'Invalid date'

  return date.toLocaleString()
}

// ── Constants ─────────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  'Explain how neural networks work',
  'Write a Python function to sort a list',
  'What is the difference between AI and ML?',
  'Help me understand transformers in NLP',
]

// ── Sub-components ────────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-3">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessages[number] }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
        style={
          isUser
            ? { background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))', color: '#fff' }
            : { background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))', color: '#080b14' }
        }
      >
        {isUser ? 'You' : <Brain size={14} />}
      </div>
      <div
        className={`max-w-[75%] px-4 py-3 text-sm ${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
        style={{ color: 'var(--text-primary)' }}
      >

  {message.parts.map((part, i) => {
  if (part.type === 'text') {
    return (
      <div key={i}>
        <Streamdown>
          {String(
            (part as any).content ??
            (part as any).text ??
            ''
          )}
        </Streamdown>
      </div>
    )
  }

  return null
})}

      </div>
    </div>
  )
}

// ── ChatInterface (keyed/remountable per session) ─────────────────────────────

interface ChatInterfaceProps {
  initialSessionId: string | null
  initialMessages: ChatMessages
  onSessionCreated: (session: Session) => void
  onSidebarToggle: () => void
}

function ChatInterface({
  initialSessionId,
  initialMessages,
  onSessionCreated,
  onSidebarToggle,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const sessionIdRef = useRef<string | null>(initialSessionId)
  const creatingRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)


const onFinish = useCallback(
  async (message: ChatMessages[number]) => {
    const sid = sessionIdRef.current

    if (!sid) return

    const text = getMessageText(message)

    if (text) {
      await apiSaveMessage(
        sid,
        'assistant',
        text
      )
    }
  },
  []
)


const [displayMessages, setDisplayMessages] =
  useState<ChatMessages>(initialMessages)

const {
  messages,
  sendMessage,
  isLoading,
  stop,
  clearMessages,
} = useAIChat({
  onFinish,
})

console.log(
  "HOOK MESSAGES:",
  messages
)

useEffect(() => {
  setDisplayMessages(initialMessages)
}, [initialMessages])

useEffect(() => {
  if (messages.length > 0) {
    setDisplayMessages(messages)
  }
}, [messages])

useEffect(() => {
  console.log(
    "LIVE MESSAGES",
    JSON.stringify(messages, null, 2)
  )
}, [messages])

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: 'smooth',
  })
}, [messages])

useEffect(() => {
  console.log("MESSAGES CHANGED", messages)
}, [messages])

useEffect(() => {
  console.log("LOADING CHANGED", isLoading)
}, [isLoading])

useEffect(() => {
  console.log(
    "INITIAL MESSAGES:",
    initialMessages
  )
}, [initialMessages])

const handleSend = async () => {

  const text = input.trim()

  if (!text || isLoading) {
    console.log("BLOCKED")
    return
  }

  setInput('')
  inputRef.current?.focus()

  if (!sessionIdRef.current && !creatingRef.current) {
    creatingRef.current = true

    try {

const session = await apiCreateSession(
  text.slice(0, 60)
)

console.log("SESSION =", session)

if (!session?.id) {
  console.error("Session creation failed")
  return
}

sessionIdRef.current = session.id

localStorage.setItem(
  'activeSessionId',
  session.id
)
      onSessionCreated(session)
    } catch (err) {
      console.error(err)
      creatingRef.current = false
      return
    }

    creatingRef.current = false
  }

  const sid = sessionIdRef.current
console.log(
  "ASSISTANT SAVING:",
  text
)

  if (sid) {
    await apiSaveMessage(
      sid,
      'user',
      text
    )
  }
  

console.log("SEND TYPE", typeof sendMessage)
console.log("SEND FN", sendMessage)
console.log("SEND MESSAGE FN", sendMessage)
console.log("MESSAGE COUNT", messages.length)

  console.log("SENDING:", text)

await sendMessage(text, {
  data: {
    sessionId: sessionIdRef.current,
  },
})

  const dbMsgs = await apiGetMessages( 
  sessionIdRef.current!
)


setTimeout(() => {
  console.log(
    "AFTER SEND STATE:",
    messages
  )
}, 1000)

} 
const handleKey = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'rgba(0,245,255,0.08)' }}>
        <button
          onClick={onSidebarToggle}
          className="p-1.5 rounded transition-colors hover:text-[var(--neon-cyan)]"
          style={{ color: 'var(--text-muted)' }}
          title="Toggle sidebar"
        >
          <MessageSquare size={16} />
        </button>
        <div className="flex items-center gap-2">
          <Brain size={16} style={{ color: 'var(--neon-cyan)' }} />
          <span className="font-semibold text-sm">MindStack Chat</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--neon-green)' }} />
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Connected</span>

{displayMessages.length > 0 && (
  
    <button
      onClick={() => clearMessages?.()}
      className="p-1.5 rounded transition-colors hover:text-[var(--neon-pink)]"
      style={{ color: 'var(--text-muted)' }}
      title="Clear chat view"
    >
      <Trash2 size={14} />
    </button>

)}

        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {displayMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center px-4 text-center">
            <div
              className="ai-orb w-16 h-16 mb-6 flex items-center justify-center"
              style={{ width: '64px', height: '64px' }}
            >
              <Brain size={28} color="rgba(0,245,255,0.9)" />
            </div>
            <h2 className="text-2xl font-bold mb-2 gradient-text">MindStack AI</h2>
            <p className="text-sm mb-8 max-w-sm" style={{ color: 'var(--text-muted)' }}>
              Your intelligent assistant. Ask me anything about AI, code, science, or just chat.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s)
                    inputRef.current?.focus()
                  }}
                  className="text-left px-3 py-2.5 rounded-lg text-xs transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(0,245,255,0.04)',
                    border: '1px solid rgba(0,245,255,0.12)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto w-full px-4 py-6">
            {displayMessages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))', color: '#080b14' }}
                >
                  <Brain size={14} />
                </div>
                <div className="chat-bubble-ai">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(0,245,255,0.08)', background: 'rgba(8,11,20,0.6)' }}>
        {isLoading && (
          <div className="flex justify-center mb-3">
            <button
              onClick={stop}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: 'rgba(255,45,120,0.1)',
                border: '1px solid rgba(255,45,120,0.3)',
                color: 'var(--neon-pink)',
              }}
            >
              <Square size={10} className="fill-current" />
              Stop generating
            </button>
          </div>
        )}
        <div className="max-w-3xl mx-auto flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            className="
		w-full
		bg-[#2f2f2f]
		text-white
		placeholder:text-gray-400
		border
		border-[#444]
		rounded-3xl
		px-4
		py-3
		outline-none
		focus:border-[#666]
		"
              onKeyDown={handleKey}
              placeholder="Ask MindStack AI anything… (Enter to send, Shift+Enter for new line)"
              rows={1}
              style={{
                background: 'rgba(13,20,40,0.9)',
                border: '1px solid rgba(0,245,255,0.2)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                padding: '10px 16px',
                width: '100%',
                resize: 'none',
                fontSize: '14px',
                outline: 'none',
                lineHeight: '1.5',
                maxHeight: '120px',
                overflowY: 'auto',
                fontFamily: 'inherit',
              }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement
                t.style.height = 'auto'
                t.style.height = Math.min(t.scrollHeight, 120) + 'px'
              }}
              disabled={isLoading}
		

            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 p-2.5 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
              color: '#080b14',
            }}
          >
            <Send size={16} strokeWidth={2.5} />
          </button>
           
       </div>
        <p className="text-center text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          MindStack AI may produce inaccurate information. Always verify important facts.
        </p>
      </div>
    </div>
  )
}

// ── ChatPage ──────────────────────────────────────────────────────────────────

function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [initialMessages, setInitialMessages] = useState<ChatMessages>([])

useEffect(() => {
  const load = async () => {
    const sessions = await apiGetSessions()

    setSessions(sessions)

    const savedId =
      localStorage.getItem('activeSessionId')

    if (!savedId) return

    const dbMsgs =
      await apiGetMessages(savedId)

    setActiveSessionId(savedId)

setInitialMessages(
  dbMsgs
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
    )
    .map(dbToUIMessage)
)

  }

  load()
}, [])


const startNewChat = useCallback(() => {
  localStorage.removeItem(
    'activeSessionId'
  )

  setActiveSessionId(null)
  setInitialMessages([])
}, [])
  

  const selectSession = useCallback(
    async (id: string) => {
      if (id === activeSessionId) return
      const dbMsgs = await apiGetMessages(id)
	localStorage.setItem('activeSessionId', id)

	console.log("SESSION CLICKED:", id)
	console.log("DB MESSAGES:", dbMsgs)
        console.log(
           "LOADED",
            dbMsgs.length,
           "MESSAGES"
          )	
      setActiveSessionId(id)
      setInitialMessages(dbMsgs.map(dbToUIMessage))
    },
    [activeSessionId],
  )

const handleSessionCreated = useCallback((session: Session) => {
  setActiveSessionId(session.id)

  localStorage.setItem(
    'activeSessionId',
    session.id
  )

  setSessions((prev) => [session, ...prev])
}, [])

  const handleDeleteSession = useCallback(
    async (id: string, e: React.MouseEvent) => {
      e.stopPropagation()
      await apiDeleteSession(id)
      setSessions((prev) => prev.filter((s) => s.id !== id))
      if (id === activeSessionId) startNewChat()
    },
    [activeSessionId, startNewChat],
  )

  return (
    <div className="flex h-[calc(100vh-64px)]" style={{ color: 'var(--text-primary)' }}>
      {/* Sidebar */}
      <div
        className={`sidebar transition-all duration-300 flex-shrink-0 flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="p-4 border-b" style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: 'rgba(0,245,255,0.06)',
              border: '1px solid rgba(0,245,255,0.2)',
              color: 'var(--neon-cyan)',
            }}
          >
            <Plus size={14} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="text-xs font-medium mb-2 px-2" style={{ color: 'var(--text-muted)' }}>
            Chat History
          </div>
          {sessions.length === 0 ? (
            <p className="text-xs px-2" style={{ color: 'var(--text-muted)' }}>
              No chats yet
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              {sessions.map((session) => {
                const isActive = session.id === activeSessionId
                return (
                  <div
                    key={session.id}
                    onClick={() => selectSession(session.id)}
                    className="group px-2 py-2 rounded-lg text-xs cursor-pointer transition-all flex items-start gap-2"
                    style={{
                      background: isActive ? 'rgba(0,245,255,0.08)' : undefined,
                      border: isActive
                        ? '1px solid rgba(0,245,255,0.2)'
                        : '1px solid transparent',
                    }}
                  >
                    <MessageSquare
                      size={12}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: 'var(--neon-cyan)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="truncate" style={{ color: 'var(--text-primary)' }}>
                        {session.title}
                      </div>
                      <div
                        className="flex items-center gap-1 mt-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <Clock size={9} />
                      <span>
			  {formatTime(
			    session.updated_at ??
			    session.created_at
			  )}
			</span>
			
			
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-0.5 rounded transition-all hover:text-[var(--neon-pink)]"
                      style={{ color: 'var(--text-muted)' }}
                      title="Delete chat"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="p-4 border-t" style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Zap size={12} style={{ color: 'var(--neon-green)' }} />
            AI Provider: Auto-select
          </div>
        </div>
      </div>

      {/* Chat interface — remounts on session switch via key */}
      <ChatInterface
        initialSessionId={activeSessionId}
        initialMessages={initialMessages}
        onSessionCreated={handleSessionCreated}
        onSidebarToggle={() => setSidebarOpen((o) => !o)}
      />
    </div>
  )
}
