import { supabase } from '@/lib/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/session-messages')({
  server: {
    handlers: {
	DELETE: async ({ request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return Response.json(
      { error: 'Missing id' },
      { status: 400 }
    )
  }

const { error: msgError } = await supabase
  .from('messages')
  .delete()
  .eq('session_id', id)

if (msgError) {
  return Response.json(
    { error: msgError.message },
    { status: 500 }
  )
}

const { error: sessionError } = await supabase
  .from('sessions')
  .delete()
  .eq('id', id)

if (sessionError) {
  return Response.json(
    { error: sessionError.message },
    { status: 500 }
  )
}

return Response.json({ success: true })
},
  GET: async ({ request }) => {
        const url = new URL(request.url)
        const sessionId = url.searchParams.get('sessionId')

        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('session_id', sessionId)

        if (error) {
console.error("MESSAGE SAVE ERROR:", error)

  return Response.json(
    {
      error: error.message,
      details: error,
    },
    { status: 500 }
  )

        }

        return Response.json(data ?? [])
      },

      POST: async ({ request }) => {
        const body = await request.json()

        const { data, error } = await supabase
          .from('messages')
          .insert({
            session_id: body.sessionId,
            role: body.role,
            content: body.content,
             })
          .order('created_at', {
             ascending: true
             })
         .select()

  console.log("MESSAGE DATA:", data)
  console.log("MESSAGE ERROR:", error)   

if (error) {
  console.error("MESSAGE SAVE ERROR:", error)

  return Response.json(
    {
      error: error.message,
      details: error,
    },
    { status: 500 }
  )
}
    

        return Response.json(data?.[0] ?? null)
      },
    },
  },
})
