export function detectTask(
  message: string
) {
  const text = message.toLowerCase()

  if (
    text.includes('code') ||
    text.includes('function') ||
    text.includes('python') ||
    text.includes('javascript')
  ) {
    return 'code'
  }

  if (
    text.includes('math') ||
    text.includes('equation') ||
    text.includes('calculate')
  ) {
    return 'math'
  }

  return 'chat'
}

export function chooseProvider(
  task: string
) {
  switch (task) {
    case 'code':
      return 'ollama'

    case 'math':
      return 'ollama'

    default:
      return 'ollama'
  }
}
