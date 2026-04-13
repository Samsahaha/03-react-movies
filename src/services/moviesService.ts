import axios, { type AxiosResponse } from 'axios'
import type { Movie } from '../types/movie'

export interface TmdbSearchResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
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
  return response.data.results
}
