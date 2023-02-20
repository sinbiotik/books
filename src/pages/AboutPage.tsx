import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppBarBlock } from '../components/AppBarBlock';
import { BookInfo } from '../components/BookInfo';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchBook } from '../store/bookSlice';
import { addLocalBooksVolumesId, removeLocalBooksVolumesId } from '../store/localBookshelfSlice';
import { deletePublicBook } from '../store/publicBookshelfSlice';

export function AboutPage() {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const {book, error, loading } = useAppSelector(state => state.book)
  const {booksVolumesId}   = useAppSelector(state => state.localBookshelf)

  useEffect(() => {
    dispatch(fetchBook(id))
  }, [dispatch])
  
  return(
    <Container maxWidth='xl'>
      <AppBarBlock />
      <Box sx={{my: 1, display: 'flex', py: 1, justifyContent: 'center'}}>
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
      </Box>
      <Box>
        {book && 
          <BookInfo            
            book={book}
            booksVolumesId={booksVolumesId}
            onAddBookVolumeId={(id)=>dispatch(addLocalBooksVolumesId(id))}
            onRemoveBookVolumeId={(id)=>dispatch(removeLocalBooksVolumesId(id))}
            onRemovePublicVolumeId={(id)=>dispatch(deletePublicBook(id))}
          />
        }
      </Box>
    </Container>
  )
}