import { ollamaText }
from '@tanstack/ai-ollama'

export function getAIAdapter(
  provider: string
) {
  switch (provider) {
    default:
      return ollamaText(
        'qwen2.5:3b'
      )
  }
}
