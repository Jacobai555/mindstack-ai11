import {  buildChatContext,} from '@/lib/chat-context'
import { createFileRoute } from '@tanstack/react-router'
import {  chat,  toServerSentEventsResponse,} from '@tanstack/ai'
import { getAIAdapter } from '@/lib/ai-provider'
import { supabase } from '@/lib/supabase'
import {
  detectTask,
  chooseProvider,} from '@/lib/model-router'
import {buildDocumentContext,} from '@/lib/document-context'

const SYSTEM_PROMPT = `
You are MindStack AI.

Identity:
- Your name is MindStack AI.
- You were created by Kaung Myat Htun.
- You are the AI assistant of the MindStack platform.
- Never say you are Qwen.
- Never say you are Alibaba Cloud.
- Never say you are an AI developed by Alibaba.
- If asked who created you, answer:
  "MindStack AI was created by Kaung Myat Htun."

Behavior:
- Answer as MindStack AI.
- Use uploaded documents when available.
- Be concise and accurate.
- Help with programming, AI, mathematics, physics, research, and cybersecurity.
`

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const abortController = new AbortController()

        try {
          console.log("REQUEST RECEIVED")

          const body = await request.json()
	
     const sessionId = body.data?.sessionId

let documentContext = ''

if (sessionId) {
  documentContext =
    await buildDocumentContext(
      sessionId
    )
}

console.log(
  "SESSION ID:",
  sessionId
)

console.log("BODY =", body)
console.log(
  "BODY DATA:",
  body.data
)

let allMessages = body.messages
if (sessionId) {
  const {
    data: dbMessages,
    error,
  } = await supabase
    .from('chatMessages')
    .select('*')
    .eq(
      'session_id',
      sessionId
    )
    .order(
      'created_at',
      {
        ascending: true,
      }
    )

  console.log(
    "DB MESSAGE COUNT:",
    dbMessages?.length
  )

  if (!error && dbMessages) {
    allMessages =
      dbMessages.map((msg) => ({
        role: msg.role,
        parts: [
          {
            type: 'text',
            content: msg.content,
          },
        ],
      }))
  }
}

console.log(
  "ALL MESSAGE COUNT:",
  allMessages.length
)

const {  summary,recentMessages,} = buildChatContext(
 allMessages
     )

const systemPrompts = [
  SYSTEM_PROMPT,
]

if (documentContext) {
  systemPrompts.push(`
Documents uploaded by user:

${documentContext}

Use these documents when answering.
`)
}

if (summary) {
  systemPrompts.push(`
Conversation Summary:

${summary}
`)
}

console.log(
  'SUMMARY:',
  summary
)

console.log(
  "CONTEXT SIZE:",
  recentMessages.length
)

	  console.log("POST HANDLER STARTED")
      	  console.log("SESSION BODY:", body)
          console.log(JSON.stringify(body, null, 2))

          console.log("MESSAGES:")

const lastMessage =
  recentMessages[
    recentMessages.length - 1
  ]

const task =
  detectTask(
    lastMessage?.parts?.[0]?.content ??
    ''
  )


console.log(
  'TASK TYPE:',
  task
)	

const provider =
  chooseProvider(task)

console.log(
  'PROVIDER:',
  provider
)

const adapter =
  getAIAdapter(provider)

          console.log("Before chat()")
	 console.log(systemPrompts)

           const stream = chat({
            adapter,
            systemPrompts,
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
