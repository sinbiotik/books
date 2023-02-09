import axios, { AxiosError } from 'axios';
import { IBook } from '../models';
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BooksVolumesState {
  booksVolumes: IBook[] | null;
  totalItems: number;
  loading: boolean;
  error: null | string; 
}

const initialState: BooksVolumesState = {
  booksVolumes: null,
  totalItems: 0,
  loading: false,
  error: null,
}

export const fetchBooksVolumes = createAsyncThunk<
  {response: IBook[], totalItems: number}, {textInput: string, category: string, orderBy: string}, {rejectValue: string}
>(
  'booksVolumes/fetchBooksVolumes',
  async function({textInput, category, orderBy}, {rejectWithValue}) {
    try {
      let subject: string
      if(category === 'all') {
        subject = ''
      } else {
        subject = `+subject:${category}`
      }
      const order = `&orderBy=${orderBy}`
      const responses = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${textInput}${subject}${order}`,
        {params: {startIndex: 0, maxResults: 30}}
      )
      // console.log(responses)  

      const response: IBook[] = responses.data.items
      const totalItems: number = responses.data.totalItems
      console.log(totalItems)  

      console.log(response)  
      return ({response, totalItems})
    } catch (e: unknown) {      
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

const booksVolumesSlice = createSlice({
  name: 'booksVolumes',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBooksVolumes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooksVolumes.fulfilled, (state, action) => {
        state.loading = false
        state.booksVolumes = action.payload.response
        state.totalItems = action.payload.totalItems
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})
export default booksVolumesSlice.reducer
function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}




