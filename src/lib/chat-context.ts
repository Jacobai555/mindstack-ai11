export function buildChatContext(
  messages: any[]
) {
  if (!Array.isArray(messages))
    return {
      summary: '',
      recentMessages: [],
    }

  const recentMessages =
    messages.slice(-12)

  const olderMessages =
    messages.slice(0, -12)

  const summary =
    olderMessages
      .map((m) => {
        const text =
          m.parts?.[0]?.content ?? ''

        return `${m.role}: ${text}`
      })
      .join('\n')
      .slice(0, 4000)

  return {
    summary,
    recentMessages,
  }
}
