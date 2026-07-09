import type { Streamer, StreamersResponse } from '../types'

const API_URL = 'https://api.chess.com/pub/streamers'

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function validateStreamer(streamer: unknown): streamer is Streamer {
  if (typeof streamer !== 'object' || streamer === null) {
    return false
  }

  const s = streamer as Record<string, unknown>
  return (
    typeof s.username === 'string' &&
    typeof s.avatar === 'string' &&
    typeof s.twitch_url === 'string' &&
    typeof s.url === 'string' &&
    isValidUrl(s.url) &&
    isValidUrl(s.twitch_url)
  )
}

function validateResponse(data: unknown): StreamersResponse | null {
  if (typeof data !== 'object' || data === null) {
    return null
  }

  const response = data as Record<string, unknown>

  if (!Array.isArray(response.streamers)) {
    return null
  }

  const validStreamers = response.streamers.filter(validateStreamer)
  return { streamers: validStreamers }
}

export async function fetchStreamers(): Promise<Streamer[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  const data = await response.json()
  const validatedData = validateResponse(data)

  if (!validatedData) {
    throw new Error('Resposta da API está em formato inválido')
  }

  return validatedData.streamers
}
