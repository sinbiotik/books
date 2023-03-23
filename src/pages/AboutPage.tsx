import { Alert, Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppBarBlock } from '../components/AppBarBlock';
import { BookInfo } from '../components/BookInfo';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { fetchBook } from '../store/bookSlice';
import { addLocalBooksId, removeLocalBooksId } from '../store/localBookshelfSlice';
import { addPublicBook, fetchPublicBook, removePublicBook } from '../store/publicBookshelfSlice';

export function AboutPage() {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const {book, error, loading } = useAppSelector(state => state.book)
  const {booksVolumesId}   = useAppSelector(state => state.localBookshelf)
  const {publicBook} = useAppSelector(state => state.publicBookshelf)
  const isAdded = booksVolumesId.some(volumeId => volumeId === id)
  const isPublicAdded = !!publicBook

  useEffect(() => {
    if (!id) return
    dispatch(fetchBook(id))
    dispatch(fetchPublicBook(id))
  }, [dispatch])
  
  return(
    <Container maxWidth='xl'>
      <AppBarBlock />
      <Alert severity="info" sx={{justifyContent: 'center'}}>
        Любую книгу можно добавить на свою локальную или публичную книжную полку                
      </Alert>
      <Box sx={{my: 1,  py: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>


        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}

        {book && 
          <BookInfo            
            book={book}
            isAdded={isAdded}
            isPublicAdded={isPublicAdded}
            onAddBookId={(id)=>dispatch(addLocalBooksId(id))}
            onRemoveBookId={(id)=>dispatch(removeLocalBooksId(id))}
            onAddPublicVolume={(book)=>dispatch(addPublicBook(book))}
            onRemovePublicId={(id)=>dispatch(removePublicBook(id))}
          />
        }
      </Box>

    </Container>
  )
}