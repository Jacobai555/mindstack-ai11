import { useState, useRef } from 'react'
import {
  fetchServerSentEvents,
  useChat,
  createChatClientOptions,
} from '@tanstack/ai-react'
import type { InferChatMessages } from '@tanstack/ai-react'

const _defaultOptions = createChatClientOptions({
  connection: fetchServerSentEvents('/api/chat'),
})

export type ChatMessages = InferChatMessages<typeof _defaultOptions>

interface UseAIChatOptions {
  initialMessages?: ChatMessages
  onFinish?: (message: ChatMessages[number]) => void | Promise<void>
}

export const useAIChat = (options?: UseAIChatOptions) => {
  const onFinishRef = useRef(options?.onFinish)
  onFinishRef.current = options?.onFinish

  const [chatOptions] = useState(() =>
    createChatClientOptions({
      connection: fetchServerSentEvents('/api/chat'),
      initialMessages: options?.initialMessages,
      onFinish: (msg) => { onFinishRef.current?.(msg) },
    })
  )

const chat = useChat(chatOptions)
console.log(chat)
  return { ...chat, clearMessages: chat.clear }
}
