import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { Axios, AxiosError } from 'axios';
import { IBook } from "../models";

interface BooksState {
  book: IBook | null;
  loading: boolean;
  error: null | string; 
}

const initialState: BooksState = {
  book: null,
  loading: false,
  error: null,
}

export const fetchBook = createAsyncThunk<
  IBook, string | undefined, {rejectValue: string}
>(
  'book/bookSlice',
  async function (id, {rejectWithValue}) {
    try {      
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      const res: IBook = response.data  
      console.log(res)  
      return res
    } catch (e: unknown) {      
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

const bookSlice = createSlice({
  name: 'book',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.book= null
        state.loading = true
        state.error = null
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loading = false
        state.book = action.payload
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})
export default bookSlice.reducer
function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

