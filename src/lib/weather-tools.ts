import { toolDefinition } from '@tanstack/ai'
import { z } from 'zod'

export const getWeatherToolDef = toolDefinition({
  name: 'getWeather',
  description: 'Get weather for a city',
  inputSchema: z.object({
    city: z.string(),
  }),
  outputSchema: z.object({
    city: z.string(),
    temperature: z.number(),
    condition: z.string(),
    humidity: z.number(),
  }),
})

export const getWeather = getWeatherToolDef.server((args: any) => {
  const { city } = args

  return {
    city,
    temperature: 25,
    condition: 'sunny',
    humidity: 60,
  }
})
