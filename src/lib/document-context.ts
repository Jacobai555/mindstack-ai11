import { getDocuments } from './document-db'

export async function buildDocumentContext(
  sessionId: string
) {
  const docs =
    await getDocuments(sessionId)

  return docs
    .map(
      (d) =>
        `Document: ${d.title}\n${d.content}`
    )
    .join('\n\n')
}
