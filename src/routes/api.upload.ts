import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/api/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()

        const { error } = await supabase
          .from('documents')
          .insert(body)

        if (error) {
          return Response.json(error, {
            status: 500,
          })
        }

        return Response.json({
          success: true,
        })
      },
    },
  },
})
