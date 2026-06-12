import { supabase } from '@/lib/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/session-messages')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const sessionId = url.searchParams.get('sessionId')

        const { data } = await supabase
          .from('messages')
          .select('*')
          .eq('session_id', sessionId)

        return Response.json(data)
      },

      POST: async ({ request }) => {
        const body = await request.json()

        const { data } = await supabase
          .from('messages')
          .insert({
            session_id: body.sessionId,
            role: body.role,
            content: body.content,
          })
          .select()

        return Response.json(data?.[0])
      },
    },
  },
})
