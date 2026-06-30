export interface ChatSummary {
  summary: string
}

export function buildSummary(
  messages: any[]
): ChatSummary {
  return {
    summary: '',
  }
}
