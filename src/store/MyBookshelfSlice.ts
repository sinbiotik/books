import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IBook } from '../models';

interface MyBookshelfState {
  booksVolumesId: string [] | null;
  booksVolumes: IBook[] | null;
  loading: boolean;
  error: null | string; 
}

const initialState: MyBookshelfState = {
  booksVolumesId: ["G1y_5kpmatUC", "71nDBQAAQBAJ", "Efo-EAAAQBAJ"],
  booksVolumes: null,
  loading: false,
  error: null 
}

export const fetchMyBookshelf = createAsyncThunk<
  IBook[], undefined, {rejectValue: string, state: {myBookshelf: MyBookshelfState}}
>(
  'myBookshelf/fetchMyBookshelf',
  async function (_, {rejectWithValue, getState}) {

    try {
      const volumesId = getState().myBookshelf.booksVolumesId
      if (volumesId) {
        const responses = await Promise.all(
          volumesId.map((id: string) => axios.get(
            `https://www.googleapis.com/books/v1/volumes/${id}`
          ))
        )
        const res = responses.map(response => response.data)
        return res 

      }
  
      // console.log(res)  
    } catch (e: unknown) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

const myBookshelfSlice = createSlice({
  name: 'myBookshelf',
  initialState: initialState,
  reducers: {
    addBooksVolumesId(state, action) {
      state.booksVolumesId?.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMyBookshelf.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyBookshelf.fulfilled, (state, action) => {
        state.loading = false
        state.booksVolumes = action.payload
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const {addBooksVolumesId} = myBookshelfSlice.actions

export default myBookshelfSlice.reducer
function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}