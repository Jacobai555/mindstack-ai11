export async function getDocuments(
  sessionId: string
) {
  const { data } = await supabase
    .from('documents')
    .select('*')
    .eq('session_id', sessionId)

  return data ?? []
}
