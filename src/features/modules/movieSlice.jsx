import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMovies, getMovieDetails } from "../../services/api.service";
import { setTotalResults } from "./paginacaoSlice";

export const movieThunk = createAsyncThunk("movies/get", async (_, config) => {
  const state = config.getState();

  const query = state.paginacao.query; 
  const page = state.paginacao.page;

  if (!query || query.trim().length < 3) {
   config.dispatch(setTotalResults(0));
   return []; 
  }

  try {
    const basicList = await searchMovies(query, page);
    
    if (!basicList || basicList.Response === "False") {
      config.dispatch(setTotalResults(0));
    
      throw new Error(basicList.Error || "Nenhum resultado encontrado.");
    }

    config.dispatch(setTotalResults(Number(basicList.totalResults)));

    const moviePromises = basicList.Search.map((movieItem) =>
      getMovieDetails(movieItem.imdbID)
    );

    const movies = await Promise.all(moviePromises);
    
    return movies.filter(movie => movie && movie.Response !== "False");

  } catch (error) {
    console.error("Erro na busca de filmes:", error);
    
    return config.rejectWithValue(error.message);
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(movieThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(movieThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = null; 
      })
      .addCase(movieThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido na busca."; 
        state.movies = [];
      });
  }
});

export default movieSlice.reducer;