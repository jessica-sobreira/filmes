import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import themeSlice from "./modules/themeSlice";
import movieSlice from "../features/modules/movieSlice" 
import paginacaoSlice from "../features/modules/paginacaoSlice" 


export const rootReducer = combineReducers({
    theme: themeSlice,
    movies: movieSlice,
    paginacao: paginacaoSlice,
});


export const persistedReducer = persistReducer(
    {
        key: "root",
        storage: storage,
    },
    rootReducer
);
