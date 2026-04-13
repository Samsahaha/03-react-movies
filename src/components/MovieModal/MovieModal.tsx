import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { MouseEvent } from 'react'
import type { Movie } from '../../types/movie'
import css from './MovieModal.module.css'

export interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

function backdropImageSrc(movie: Movie): string {
  const path = movie.backdrop_path || movie.poster_path
  if (!path) {
    return 'https://placehold.co/1280x720/222222/ffffff?text=No+image'
  }
  return `https://image.tmdb.org/t/p/original${path}`
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.classList.add('modalOpen')
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modalOpen')
    }
  }, [onClose])

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const handleCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onClose()
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal} onClick={handleModalClick}>
        <button
          className={css.closeButton}
          type="button"
          aria-label="Close modal"
          onClick={handleCloseClick}
        >
          &times;
        </button>
        <img
          src={backdropImageSrc(movie)}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default MovieModal
