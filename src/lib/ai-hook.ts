import { useRef } from 'react'
import {
  fetchServerSentEvents,
  useChat,
} from '@tanstack/ai-react'

interface UseAIChatOptions {
  initialMessages?: any[]
  onFinish?: (message: any) => void | Promise<void>
}

export const useAIChat = (
  options?: UseAIChatOptions,
) => {
  const onFinishRef = useRef(
    options?.onFinish,
  )

  onFinishRef.current =
    options?.onFinish

  const chat = useChat({
    connection:
      fetchServerSentEvents(
        '/api/chat',
      ),

    initialMessages:
      options?.initialMessages,

    onFinish: (msg) => {
      onFinishRef.current?.(msg)
    },
  })

  return {
    ...chat,
    clearMessages: chat.clear,
  }
}

export type ChatMessages = any[]
