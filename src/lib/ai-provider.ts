import { ollamaText } from '@tanstack/ai-ollama'

export function getAIAdapter() {
 return ollamaText('qwen2.5:3b')
}
