import { supabase } from './supabase'

export async function saveDocument(
  sessionId: string,
  title: string,
  content: string
) {
  await supabase
    .from('documents')
    .insert({
      session_id: sessionId,
      title,
      content,
    })
}
