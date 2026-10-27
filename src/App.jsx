import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

import useFetchPhotos from './hooks/useFetchPhotos'
import PhotoCard from './components/PhotoCard'
import SearchBar from './components/SearchBar'
import { favouritesReducer } from './reducers/favouritesReducer'

function getInitialFavourites() {
  try {
    const saved = localStorage.getItem('favourites')
    const parsed = saved ? JSON.parse(saved) : []

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function App() {
  const { photos, loading, error } = useFetchPhotos()
  const [searchTerm, setSearchTerm] = useState('')

  const [state, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    () => ({ favourites: getInitialFavourites() })
  )

  const { favourites } = state

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  const handleSearch = useCallback((value) => {
    setSearchTerm(value)
  }, [])

  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({
      type: 'TOGGLE_FAVOURITE',
      payload: photoId,
    })
  }, [])

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return photos
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    )
  }, [photos, searchTerm])

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Discover & Explore
          </p>

          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Photo Gallery
          </h1>

          <p className="mt-3 text-slate-600">
            Explore beautiful photographs from around the world.
          </p>
        </header>

        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-800">
            All Photos
          </h2>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
            {filteredPhotos.length} photos · ♥ {favourites.length} favourites
          </span>
        </div>

        {loading && (
          <div className="flex flex-col items-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            <p className="mt-4 text-slate-600">Loading photos...</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 p-6 text-center text-red-700">
            <p>{error}</p>
            <p className="mt-2 text-sm">
              Please refresh the page to try again.
            </p>
          </div>
        )}

        {!loading && !error && (
          filteredPhotos.length === 0 ? (
            <p className="rounded-xl bg-white p-10 text-center text-slate-600 shadow-sm">
              No photos found. Try another author name.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favourites.includes(photo.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              ))}
            </div>
          )
        )}
      </div>
    </main>
  )
}

export default App