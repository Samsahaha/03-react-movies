import type { MouseEvent } from 'react'
import type { Movie } from '../../types/movie'
import css from './MovieGrid.module.css'

export interface MovieGridProps {
  onSelect: (movie: Movie) => void
  movies: Movie[]
}

const PLACEHOLDER_POSTER =
  'https://placehold.co/500x750/222222/ffffff?text=No+poster'

function posterSrc(movie: Movie): string {
  return movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : PLACEHOLDER_POSTER
}

function MovieGrid({ onSelect, movies }: MovieGridProps) {
  const handleImageClick =
    (movie: Movie) => (event: MouseEvent<HTMLImageElement>) => {
      event.stopPropagation()
      onSelect(movie)
    }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className={css.card}>
            <img
              className={css.image}
              src={posterSrc(movie)}
              alt={movie.title}
              loading="lazy"
              onClick={handleImageClick(movie)}
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MovieGrid
