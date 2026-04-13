import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import type { Movie } from '../../types/movie'
import { fetchMovies } from '../../services/moviesService'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import styles from './App.module.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null)
  }, [])

  const handleSearch = useCallback(async (query: string) => {
    setMovies([])
    setSelectedMovie(null)
    setError(false)
    setLoading(true)
    try {
      const results = await fetchMovies(query)
      if (results.length === 0) {
        toast('No movies found for your request.')
      }
      setMovies(results)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default App
