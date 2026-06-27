import { createFileRoute } from '@tanstack/react-router'
import {  chat,  toServerSentEventsResponse,} from '@tanstack/ai'
import { getAIAdapter } from '@/lib/ai-provider'
import { supabase } from '@/lib/supabase'

const SYSTEM_PROMPT = `
You are MindStack AI.

Always answer in the same language as the user.

If the user writes Burmese,
reply only in natural Burmese.

Keep answers concise.
`

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const abortController = new AbortController()

        try {
          console.log("REQUEST RECEIVED")

          const body = await request.json()
console.log("BODY =", body)
console.log("MESSAGES =", body.messages)
	console.log(
  "MESSAGE COUNT:",
  body.messages?.length
)
	  console.log("POST HANDLER STARTED")
      	  console.log("SESSION BODY:", body)
          console.log(JSON.stringify(body, null, 2))

          console.log("MESSAGES:")
          const adapter = getAIAdapter()

          console.log("Before chat()")
const recentMessages =
  body.messages.slice(-4)

           const stream = chat({
            adapter,
            systemPrompts: [SYSTEM_PROMPT],
            messages: recentMessages,
            abortController,
          })

  console.log("STREAM TYPE:", typeof stream)
console.log("STREAM OBJECT:", stream)

           console.log(
            'Messages sent to model:',
            recentMessages.length
            )
            
          console.log("STREAM CREATED")
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
