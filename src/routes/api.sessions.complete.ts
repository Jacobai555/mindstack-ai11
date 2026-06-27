import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

export const Route =
  createFileRoute(
    '/api/sessions/complete'
  )({
    server: {
      handlers: {
        POST: async ({ request }) => {
          const url =
            new URL(request.url)

          const id =
            url.searchParams.get('id')

          if (!id) {
            return Response.json(
              { error: 'Missing id' },
              { status: 400 }
            )
          }

          await supabase
            .from('sessions')
            .update({
              is_generating: false,
            })
            .eq('id', id)

          return Response.json({
            success: true,
          })
        },
      },
    },
  })
