export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const photoId = action.payload

      const isFavourite = state.favourites.includes(photoId)

      return {
        ...state,
        favourites: isFavourite
          ? state.favourites.filter((id) => id !== photoId)
          : [...state.favourites, photoId],
      }
    }

    case 'LOAD_FAVOURITES':
      return {
        ...state,
        favourites: action.payload,
      }

    default:
      return state
  }
}