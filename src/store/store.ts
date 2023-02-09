import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksVolumesReduser from './booksVolumesSlice'
import bookReduser from './bookSlice'


export const store = configureStore({
  reducer: {
    booksVolumes: booksVolumesReduser,
    book: bookReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
