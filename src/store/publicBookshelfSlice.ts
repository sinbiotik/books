import { IBook } from './../models';
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';

interface PublicBookshelfState {
  booksVolumes: IBook[];
  publicBook: IBook | null;
  loading: boolean;
  error: null | string; 
}
const initialState: PublicBookshelfState = {
  booksVolumes: [],
  publicBook: null,
  loading: false,
  error: null,
}

export const fetchPublicBookshelf = createAsyncThunk<
  IBook[], undefined, {rejectValue: string}
>(
  'publicBookshelf/fetchPublicBookshelf',
  async function(_, {rejectWithValue}) {
    try {
      const responses = await axios.get(`http://localhost:3001/booksVolumes`)
      const response = responses.data
      return response
    } catch (e: unknown) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

export const fetchPublicBook = createAsyncThunk<
  IBook, string, {rejectValue: string}
>(
  'publicBookshelf/fetchPublicBook',
  async function(id, {rejectWithValue}) {
    try {
      const responses = await axios.get(`http://localhost:3001/booksVolumes/?id=${id}`)
      const response = responses.data[0]
      return response
    } catch (e: unknown) {      
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

export const addPublicBook = createAsyncThunk<IBook, IBook,{rejectValue: string}>(
  'publicBookshelf/addPublicBook',
  async function(book, {rejectWithValue}) {
    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:3001/booksVolumes`,
        data: book,
      })
      const res: IBook = response.data
      return res 
    } catch (e: unknown) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

export const removePublicBook = createAsyncThunk< string, string, {rejectValue: string}>(
  'publicBookshelf/deletePublicBook',
  async function(id, {rejectWithValue}) {
    try {
      await axios.delete(`http://localhost:3001/booksVolumes/${id}`)      
      return id
    } catch (e: unknown) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

const publicBookshelfSlice = createSlice({
  name: 'publicBookshelf',
  initialState: initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchPublicBookshelf.pending, (state) => {        
        state.booksVolumes = []        
        state.loading = true
        state.error = null
      })
      .addCase(fetchPublicBook.fulfilled, (state, action) => {        
        state.loading = false
        state.publicBook = action.payload
      })
      .addCase(fetchPublicBook.pending, (state) => {        
        state.publicBook = null
      })
      .addCase(fetchPublicBookshelf.fulfilled, (state, action) => {
        state.loading = false
        state.booksVolumes = action.payload
      })
      .addCase(addPublicBook.fulfilled, (state, action) => {        
        state.booksVolumes.push(action.payload)
        state.publicBook = action.payload
      })
      .addCase(removePublicBook.fulfilled, (state, action) => {        
        state.booksVolumes = state.booksVolumes.filter(book => book.id !== action.payload)
        state.publicBook = null
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  } 
})
export default publicBookshelfSlice.reducer
function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}