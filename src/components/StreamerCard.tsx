import type { Streamer } from '../types'
import './StreamerCard.css'

interface StreamerCardProps {
  streamer: Streamer
}

export function StreamerCard({ streamer }: StreamerCardProps) {
  const getPlatformDisplayName = (type: string) => {
    switch (type) {
      case 'twitch':
        return 'Twitch'
      case 'youtube':
        return 'YouTube'
      default:
        return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  return (
    <div className={`streamer-card ${streamer.is_live ? 'streamer-card--live' : ''}`}>
      <div className="streamer-card__header">
        <img
          src={streamer.avatar}
          alt={`Avatar de ${streamer.username}`}
          className="streamer-card__avatar"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23ccc%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2250%22 font-size=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3E?%3C/text%3E%3C/svg%3E'
          }}
        />
        {streamer.is_live && (
          <div className="streamer-card__live-badge">🔴 LIVE</div>
        )}
      </div>
      <h2 className="streamer-card__username">{streamer.username}</h2>

      <div className="streamer-card__platforms">
        {streamer.platforms.map((platform) => (
          <div key={platform.type} className="streamer-card__platform">
            <a
              href={platform.stream_url || platform.channel_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`streamer-card__link streamer-card__link--${platform.type}`}
              title={platform.is_live ? `Ao vivo no ${getPlatformDisplayName(platform.type)}` : `Canal ${getPlatformDisplayName(platform.type)}`}
            >
              <span className="streamer-card__link-text">{getPlatformDisplayName(platform.type)}</span>
              {platform.is_live && (
                <span className="streamer-card__link-badge">🔴</span>
              )}
            </a>
          </div>
        ))}
      </div>

      <a
        href={streamer.url}
        target="_blank"
        rel="noopener noreferrer"
        className="streamer-card__link streamer-card__link--chess"
        title="Perfil no Chess.com"
      >
        Perfil Chess.com
      </a>
    </div>
  )
}
