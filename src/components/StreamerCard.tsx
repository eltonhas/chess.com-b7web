import type { Streamer } from '../types'
import './StreamerCard.css'

interface StreamerCardProps {
  streamer: Streamer
}

export function StreamerCard({ streamer }: StreamerCardProps) {
  return (
    <div className="streamer-card">
      <img
        src={streamer.avatar}
        alt={`Avatar de ${streamer.username}`}
        className="streamer-card__avatar"
        onError={(e) => {
          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23ccc%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2250%22 font-size=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3E?%3C/text%3E%3C/svg%3E'
        }}
      />
      <h2 className="streamer-card__username">{streamer.username}</h2>
      <div className="streamer-card__links">
        <a
          href={streamer.twitch_url}
          target="_blank"
          rel="noopener noreferrer"
          className="streamer-card__link streamer-card__link--twitch"
        >
          Twitch
        </a>
        <a
          href={streamer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="streamer-card__link streamer-card__link--chess"
        >
          Chess.com
        </a>
      </div>
    </div>
  )
}
