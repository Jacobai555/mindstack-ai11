import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/api/sessions')({
  server: {
    handlers: {
      GET: async () => {
        const { data } = await supabase
          .from('sessions')
          .select('*')
	 .order('created_at', { ascending: false })
        return Response.json(data ?? [])
      },

      POST: async ({ request }) => {
        try {
          const body = await request.json()

	  console.log('SESSION BODY:', body)

          const { data, error } = await supabase
            .from('sessions')
            .insert({
	    title: body.title,
            })
            .select()
            .single()

          console.log('SESSION DATA:', data)
          console.log('SESSION ERROR:', error)

          if (error) {
            return Response.json(
              { error: error.message },
              { status: 500 }
            )
          }

          return Response.json(data)
        } catch (err) {
          console.error(err)

          return Response.json(
            { error: String(err) },
            { status: 500 }
          )
        }
      },
     
	DELETE: async ({ request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return Response.json(
      { error: 'Missing session id' },
      { status: 400 }
    )
  }
const msgResult = await supabase
    .from('messages')
    .delete()
    .eq('session_id', id)

  console.log("DELETE MSGS:", msgResult.error)

  const sessionResult = await supabase
    .from('sessions')
    .delete()
    .eq('id', id)

  console.log("DELETE SESSION:", sessionResult.error)
  return Response.json({
    success: true
  })
},
    },
  },
})
















