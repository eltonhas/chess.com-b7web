export interface Streamer {
  username: string
  avatar: string
  twitch_url: string
  url: string
}

export interface StreamersResponse {
  streamers: Streamer[]
}
