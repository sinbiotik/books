import booksVolumesReducer, {
  inputQuery, selectCategory, selectOrderBy, setPage
} from '../booksVolumesSlice'

describe('booksVolumesSlice', () => {
  it('shold select category from state', () =>{
    const action = {type: selectCategory.type, action: 'history'}
    const result = selectCategory('all', action)
    expect(result.payload) === 'history'
  })
})