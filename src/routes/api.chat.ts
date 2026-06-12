import { createFileRoute } from '@tanstack/react-router'
import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai'
import { ollamaText } from '@tanstack/ai-ollama'
import { getWeather } from '@/lib/weather-tools'
import { openaiText } from '@tanstack/ai-openai'

const SYSTEM_PROMPT = `You are MindStack AI, an intelligent assistant for an AI engineering platform. You help users with:

1. AI/ML concepts: Explain machine learning, neural networks, transformers, and AI agents clearly
2. Code assistance: Write, debug, and explain code in any language
3. Cybersecurity education: Explain security concepts, vulnerabilities, and best practices (educational only)
4. General questions: Answer thoughtfully on any topic
5. Weather: Use getWeather to check current weather for any city

PERSONALITY:
- Knowledgeable but approachable
- Give concrete examples when explaining concepts
- Encourage learning and experimentation
- For security topics, always emphasize ethical and legal use

INSTRUCTIONS:
- Format responses with markdown when helpful (code blocks, lists, headers)
- Be concise but complete — don't pad responses
- When users ask about weather, use the getWeather tool
- Never assist with illegal activities or harmful content`

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const requestSignal = request.signal

        if (requestSignal.aborted) {
          return new Response(null, { status: 499 })
        }

        const abortController = new AbortController()

        try {
          const body = await request.json()
          const { messages } = body
          const data = body.data || {}

          // Determine the best available provider

	let provider: 'ollama' = 'ollama'
	let model = 'llama3'
	const adapter = openaiText('gpt-4o-mini' as any)

          const stream = chat({
            adapter,
            tools: [getWeather],

            systemPrompts: [SYSTEM_PROMPT],
	    messages,
            agentLoopStrategy: maxIterations(5),
            messages,
            abortController,
          })

          return toServerSentEventsResponse(stream, { abortController })
        } catch (error: any) {
          console.error('Chat error:', error)
          if (error.name === 'AbortError' || abortController.signal.aborted) {
            return new Response(null, { status: 499 })
          }
          return new Response(
            JSON.stringify({
              error: 'Failed to process chat request',
              message: error.message,
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
      },
    },
  },
})
