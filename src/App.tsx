import { useEffect, useState } from 'react'

import { Pagination } from './components/Pagination'
import { StreamerList } from './components/StreamerList'
import { fetchStreamers } from './services/api'
import type { Streamer } from './types'
import './App.css'

export function App() {
  const [streamers, setStreamers] = useState<Streamer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let isMounted = true

    const loadStreamers = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchStreamers()

        if (isMounted) {
          setStreamers(data)
          setCurrentPage(1)
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Chess Streamers</h1>
      </header>

      <main className="app__main">
        <StreamerList
          streamers={streamers}
          currentPage={currentPage}
          loading={loading}
          error={error}
        />

        {!loading && !error && streamers.length > 0 && (
          <Pagination
            totalItems={streamers.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  )
}
