import { createFileRoute } from '@tanstack/react-router'
import {  chat,  toServerSentEventsResponse,} from '@tanstack/ai'
import { getAIAdapter } from '@/lib/ai-provider'

const SYSTEM_PROMPT = `
You are MindStack AI.

Reply in the same language as the user.

Keep responses concise.

Use:
- 1-3 sentences for simple questions.
- Bullet points when useful.
- Do not write long essays unless requested.
`

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const abortController = new AbortController()

        try {
          console.log("REQUEST RECEIVED")

          const body = await request.json()

          console.log("BODY:")
          console.log(JSON.stringify(body, null, 2))

          console.log("MESSAGES:")

          const adapter = getAIAdapter()

          console.log("Before chat()")
        const recentMessages = body.messages.slice(-4)
           const stream = chat({
            adapter,
            systemPrompts: [SYSTEM_PROMPT],
            messages: recentMessages,
            abortController,
          })
            
          console.log("STREAM CREATED")
         console.time('chat-request')
          return toServerSentEventsResponse(stream, {
            abortController,
          })
        } catch (error) {
          console.error("CHAT ERROR:", error)

          return new Response(
            JSON.stringify({
              error: String(error),
            }),
            {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
        }
      },
    },
  },
})
