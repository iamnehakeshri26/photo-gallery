function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="mb-8">
      <label
        htmlFor="photo-search"
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        Search photos by author
      </label>

      <input
        id="photo-search"
        type="search"
        placeholder="Enter author name..."
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  )
}

export default SearchBar