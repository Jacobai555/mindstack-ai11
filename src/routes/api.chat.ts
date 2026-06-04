import { createFileRoute } from '@tanstack/react-router'
import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai'
import { anthropicText } from '@tanstack/ai-anthropic'
import { openaiText } from '@tanstack/ai-openai'
import { geminiText } from '@tanstack/ai-gemini'
import { ollamaText } from '@tanstack/ai-ollama'

import { getWeather } from '@/lib/weather-tools'

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
    	  // existing chat code
		} catch (error) {
		  console.error("FULL ERROR:", error);
	  	  throw error;
  		}
          // Determine the best available provider
          let provider: 'anthropic' | 'openai' | 'gemini' | 'ollama' =
            data.provider || 'ollama'
          let model: string = data.model || 'mistral:7b'

          // Use the first available provider with an API key, fallback to ollama
          if (process.env.ANTHROPIC_API_KEY)
         {
            provider = 'anthropic'
            model = 'claude-haiku-4-5'
          } else if (process.env.OPENAI_API_KEY) {
            provider = 'openai'
            model = 'gpt-4o'
           }
            else if (process.env.GEMINI_API_KEY) {
            provider = 'gemini'
           model = 'gemini-2.5-flash-exp'
           }

          const adapterConfig = {
            anthropic: () =>
              anthropicText((model || 'claude-haiku-4-5') as any),
            openai: () => openaiText((model || 'gpt-4o') as any),
            gemini: () => geminiText((model || 'gemini-2.0-flash-exp') as any),
            ollama: () => ollamaText((model || 'mistral:7b') as any),
          }

          const adapter = adapterConfig[provider]()

          const stream = chat({
            adapter,
            tools: [getWeather],
            systemPrompts: [SYSTEM_PROMPT],
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
