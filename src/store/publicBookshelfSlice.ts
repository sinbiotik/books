import { IBook } from './../models';
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';


interface PublicBookshelfState {
  booksVolumes: IBook[] | null;
  loading: boolean;
  error: null | string; 
}

const initialState: PublicBookshelfState = {
  booksVolumes:  null,
  loading: false,
  error: null,
}

const BOOKSHELF_FAVORITE = 0
export const fetchPublicBookshelf = createAsyncThunk<
  IBook[],
  undefined,
  {rejectValue: string}
>(
  'publicBookshelf/fetchPublicBookshelf',
  async function(_, {rejectWithValue}) {
    try {
      const userId = `109777769115173013396`
      const bookshelfId = BOOKSHELF_FAVORITE
      const APIKey = `AIzaSyCsJ17xcbR7PRSvKKXlMdpWTeRl_bU4JsU`

      const responses = await axios.get(
        `https://www.googleapis.com/books/v1/users/${userId}/bookshelves`+
        `/${bookshelfId}/volumes?${APIKey}`
      )
      const response = responses.data.items
      return response
    } catch (e: unknown) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)


export const deletePublicBook = createAsyncThunk<
  string,
  string,
  {rejectValue: string}
>(
  'publicBookshelf/deletePublicBook',
  async function(id, {rejectWithValue}) {
    try {
      const userId = `109777769115173013396`
      const bookshelfId = `0`
      const APIKey = `AIzaSyCsJ17xcbR7PRSvKKXlMdpWTeRl_bU4JsU`

      await axios.post(
        `https://www.googleapis.com/books/v1/users/${userId}/bookshelves`+
        `/${bookshelfId}/removeVolume?volumeId=${id}&${APIKey}`,
        {'Content-Type': 'application/json',
        'Content-Length': 'CONTENT_LENGTH'}
      )
      // console.log(id)
      
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
        state.loading = true
        state.error = null
      })

      .addCase(fetchPublicBookshelf.fulfilled, (state, action) => {
        state.loading = false
        state.booksVolumes = action.payload
      })

      .addCase(deletePublicBook.fulfilled, (state, action) => {
        console.log(state.booksVolumes)
        console.log(action.payload)
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