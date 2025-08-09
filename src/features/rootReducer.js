import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import themeReducer from './modules/themeSlice.jsx';

const persistConfig = {
  key: 'root',
  storage,

};

const rootReducer = combineReducers({
  theme: themeReducer,

});

export const persistedReducer = persistReducer(persistConfig, rootReducer);