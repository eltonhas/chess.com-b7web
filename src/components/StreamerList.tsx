import type { Streamer } from '../types'
import { StreamerCard } from './StreamerCard'
import './StreamerList.css'

interface StreamerListProps {
  streamers: Streamer[]
  currentPage: number
  loading: boolean
  error: string | null
}

const ITEMS_PER_PAGE = 20

export function StreamerList({
  streamers,
  currentPage,
  loading,
  error,
}: StreamerListProps) {
  if (loading) {
    return <div className="streamer-list streamer-list--loading">Carregando streamers...</div>
  }

  if (error) {
    return <div className="streamer-list streamer-list--error">Erro: {error}</div>
  }

  if (streamers.length === 0) {
    return (
      <div className="streamer-list streamer-list--empty">
        Nenhum streamer disponível
      </div>
    )
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedStreamers = streamers.slice(startIndex, endIndex)

  return (
    <div className="streamer-list">
      {paginatedStreamers.map((streamer) => (
        <StreamerCard key={`${streamer.username}-${streamer.url}`} streamer={streamer} />
      ))}
    </div>
  )
}
