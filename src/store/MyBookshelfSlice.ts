import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IBook } from '../models';

interface MyBookshelfState {
  booksVolumesId: string [];
  booksVolumes: IBook[] | null;
  loading: boolean;
  error: null | string; 
}
const initialState: MyBookshelfState = {
  booksVolumesId: ['omrMoAEACAAJ', 'm9aeJ6bkzbY', 'IiOQEAAAQBAJ'],
  booksVolumes: null,
  loading: false,
  error: null 
}
export const fetchMyBookshelf = createAsyncThunk<
  IBook[] | undefined, undefined, {rejectValue: string, state: {myBookshelf: MyBookshelfState}}
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
        // console.log(initialState)

        return res
      }  
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
      // if (state.booksVolumesId?.map(id => id === action.payload)){
      //   return
      // }
      state.booksVolumesId?.push(action.payload)
      
      console.log(action.payload)
    },

    removeBooksVolumesId(state, action) {
      if (state.booksVolumesId){
        state.booksVolumesId = state.booksVolumesId.filter(
          id => id !== action.payload
        )
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMyBookshelf.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyBookshelf.fulfilled, (state, action: PayloadAction<any> ) => {        
        state.loading = false
        state.booksVolumes = action.payload
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})
export const {addBooksVolumesId, removeBooksVolumesId} = myBookshelfSlice.actions
export default myBookshelfSlice.reducer
function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}



