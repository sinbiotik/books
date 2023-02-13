import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksVolumesReduser from './booksVolumesSlice'
import bookReduser from './bookSlice'
import myBookshelfReduser from './MyBookshelfSlice'


export const store = configureStore({
  reducer: {
    booksVolumes: booksVolumesReduser,
    book: bookReduser,
    myBookshelf: myBookshelfReduser
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
