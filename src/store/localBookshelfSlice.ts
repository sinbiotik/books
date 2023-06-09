import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IBook } from '../models';

interface LocalBookshelfState {
  booksVolumesId: string [];
  booksVolumes: IBook[];
  loading: boolean;
  error: null | string; 
}
const initialState: LocalBookshelfState = {
  booksVolumesId: ['omrMoAEACAAJ', 'IiOQEAAAQBAJ'],
  booksVolumes: [],
  loading: false,
  error: null 
}
export const fetchLocalBookshelf = createAsyncThunk<
  IBook[], 
  undefined,
  {rejectValue: string, state: {localBookshelf: LocalBookshelfState}}
>(
  'localBookshelf/fetchLocalBookshelf',
  async function (_, {rejectWithValue, getState}) {
    try {
      const volumesId = getState().localBookshelf.booksVolumesId
      if (volumesId) {
        const responses = await Promise.all(
          volumesId.map((id: string) => axios.get(
            `https://www.googleapis.com/books/v1/volumes/${id}`
          ))
        )
        const res = responses.map(response => response.data)
        return res
      } 
      return [] 
    } catch (e: unknown) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

const localBookshelfSlice = createSlice({
  name: 'localBookshelf',
  initialState: initialState,
  reducers: {
    addLocalBooksId(state, action: PayloadAction<string>) {
      if (state.booksVolumesId?.find(id => id === action.payload)){
        return
      }
      state.booksVolumesId?.push(action.payload)
    },

    removeLocalBooksId(state, action: PayloadAction<string>) {
      if (state.booksVolumesId){
        state.booksVolumesId = state.booksVolumesId.filter(
          id => id !== action.payload
        )
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocalBookshelf.pending, (state) => {
        state.loading = true
        state.error = null
      })                                                            
      .addCase(fetchLocalBookshelf.fulfilled, (state, action: PayloadAction<IBook[]>) => {        
        state.loading = false
        state.booksVolumes = action.payload
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})
export const {addLocalBooksId,  removeLocalBooksId} = localBookshelfSlice.actions
export default localBookshelfSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}



