import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import themeSlice from "./modules/themeSlice";
import movieSlice from "../features/modules/movieSlice"; 
import paginacaoSlice from "../features/modules/paginacaoSlice"; 
import favoriteSlice from "../features/modules/favoriteSlice"

export const rootReducer = combineReducers({
    theme: themeSlice,
    movies: movieSlice,
    paginacao: paginacaoSlice,
    favorites: favoriteSlice, 
});


export const persistedReducer = persistReducer(
    {
        key: "root",
        storage: storage,
    },
    rootReducer
);