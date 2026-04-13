import axios, { type AxiosResponse } from 'axios'
import type { Movie } from '../types/movie'

export interface TmdbSearchResponse {
  page: number
  results: TmdbMovieResult[]
  total_pages: number
  total_results: number
}

interface TmdbMovieResult {
  id: number
  poster_path: string | null
  backdrop_path: string | null
  title: string
  overview: string
  release_date: string
  vote_average: number
}

function normalizeMovie(raw: TmdbMovieResult): Movie {
  return {
    id: raw.id,
    poster_path: raw.poster_path ?? '',
    backdrop_path: raw.backdrop_path ?? '',
    title: raw.title,
    overview: raw.overview,
    release_date: raw.release_date,
    vote_average: raw.vote_average,
  }
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN
  const response: AxiosResponse<TmdbSearchResponse> =
    await axios.get<TmdbSearchResponse>(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          query,
          language: 'en-US',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  return response.data.results.map(normalizeMovie)
}
