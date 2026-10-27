function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        className="h-64 w-full object-cover"
        loading="lazy"
      />

      <div className="flex items-center justify-between gap-3 p-4">
        <p className="truncate font-medium text-slate-800">
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite
              ? `Remove ${photo.author} from favourites`
              : `Add ${photo.author} to favourites`
          }
          aria-pressed={isFavourite}
          className={`shrink-0 text-3xl transition hover:scale-110 ${
            isFavourite ? 'text-red-500' : 'text-slate-400'
          }`}
        >
          {isFavourite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  )
}

export default PhotoCard