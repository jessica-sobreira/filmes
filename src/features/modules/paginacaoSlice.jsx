import { createSlice } from "@reduxjs/toolkit";

const paginacaoSlice = createSlice({
  name: "paginacao",
  initialState: {
    totalResults: 0,
    page: 1,
    itemsPerPage: 10,
    query: '', 
  },
  reducers: {
    setTotalResults: (state, action) => {
      state.totalResults = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setQuery: (state, action) => { 
      state.query = action.payload;
    },
  },
});

export const { setTotalResults, setPage, setQuery } = paginacaoSlice.actions;
export default paginacaoSlice.reducer;