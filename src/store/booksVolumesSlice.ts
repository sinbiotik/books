import { RootState } from './store';
import axios, { AxiosError } from 'axios';
import { IBook } from '../models';
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BooksVolumesState {
  query: string;
  booksVolumes: IBook[];
  category: string;
  orderBy: string;
  page: number;
  totalItems: number;
  loading: boolean;
  error: null | string; 
}

const initialState: BooksVolumesState = {
  query: '',
  booksVolumes: [],
  category: 'all',
  orderBy: 'relevance',
  page: 1,
  totalItems: 0,
  loading: false,
  error: null,
}

export const fetchBooksVolumes = createAsyncThunk<
  {response: IBook[], totalItems: number},
  undefined,
  {rejectValue: string, state: RootState}
>(
  'booksVolumes/fetchBooksVolumes',
  async function(_, {rejectWithValue, getState}) {
    try {
      const {query, category, orderBy, page} = getState().booksVolumes
      let subject: string
      if(category === 'all') {
        subject = ''
      } else {
        subject = `+subject:${category}`
      }
      const order = `&orderBy=${orderBy}`
      const startIndex = (page - 1) * 30
      const responses = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?`+
        `q=${encodeURIComponent(query)}${subject}${order}`,
        {params: {startIndex, maxResults: 30}}
      )
      const response: IBook[] = responses.data.items      
      const totalItems: number = responses.data.totalItems
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
  reducers: {
    inputQuery(state, action: PayloadAction<string>){
      state.query = action.payload
      state.page = 1
    },
    selectCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
      state.page = 1
    },
    selectOrderBy(state, action: PayloadAction<string>) {
      state.orderBy = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    }    
  },
  
  extraReducers(builder) {
    builder
      .addCase(fetchBooksVolumes.pending, (state) => {
        state.totalItems = 0
        state.booksVolumes = []
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
export const {
  selectCategory, selectOrderBy, inputQuery, setPage
} = booksVolumesSlice.actions

export default booksVolumesSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}




