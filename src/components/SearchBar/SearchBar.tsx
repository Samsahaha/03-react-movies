import toast from 'react-hot-toast'
import styles from './SearchBar.module.css'

export interface SearchBarProps {
  onSubmit: (query: string) => void
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const searchAction = (formData: FormData): void => {
    const raw = formData.get('query')
    const query = typeof raw === 'string' ? raw.trim() : ''
    if (!query) {
      toast('Please enter your search query.')
      return
    }
    onSubmit(query)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={searchAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  )
}

export default SearchBar
