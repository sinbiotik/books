import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import booksVolumesReducer from './booksVolumesSlice'
import bookReducer from './bookSlice'
import localBookshelfReducer from './localBookshelfSlice'
import publicBookshelfReducer from './publicBookshelfSlice'
import userReducer from './userSlice'

const persistConfig = {
  key: 'localBookshelf',
  storage: storage,
}
const persistedReducer = persistReducer(persistConfig, localBookshelfReducer)

const rootReducer = combineReducers({
  booksVolumes: booksVolumesReducer,
  book: bookReducer,
  localBookshelf: persistedReducer,
  publicBookshelf: publicBookshelfReducer,
  user: userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
