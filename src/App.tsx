import { useEffect, useState } from 'react'
import type { Streamer } from './types'
import { fetchStreamers } from './services/api'

export function App() {
  const [streamers, setStreamers] = useState<Streamer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, _setCurrentPage] = useState(1)

  useEffect(() => {
    let isMounted = true

    const loadStreamers = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchStreamers()

        if (isMounted) {
          setStreamers(data)
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage =
            err instanceof Error ? err.message : 'Erro desconhecido ao buscar streamers'
          setError(errorMessage)
          setStreamers([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadStreamers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="app">
      <h1>Chess Streamers</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {!loading && !error && streamers.length === 0 && (
        <p>Nenhum streamer disponível</p>
      )}
      {!loading && !error && streamers.length > 0 && (
        <>
          <p>Total de streamers: {streamers.length}</p>
          <p>Página atual: {currentPage}</p>
        </>
      )}
    </div>
  )
}
