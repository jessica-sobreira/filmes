import { createSlice } from '@reduxjs/toolkit';

const getFavoritesFromLocalStorage = () => {
  try {
    const favorites = localStorage.getItem('movie_favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};

const saveFavoritesToLocalStorage = (favorites) => {
  try {
    localStorage.setItem('movie_favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: getFavoritesFromLocalStorage(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const isAlreadyFavorite = state.list.some(fav => fav.imdbID === movie.imdbID);

      if (isAlreadyFavorite) {
        state.list = state.list.filter(fav => fav.imdbID !== movie.imdbID);
      } else {
        state.list.push(movie);
      }
      saveFavoritesToLocalStorage(state.list);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;