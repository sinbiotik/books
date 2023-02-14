import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppBarBlock } from '../components/AppBarBlock';
import { BookInfo } from '../components/BookInfo';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchBook } from '../store/bookSlice';
import { addBooksVolumesId, removeBooksVolumesId } from '../store/MyBookshelfSlice';

export function AboutPage() {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const {book, error, loading} = useAppSelector(state => state.book)  

  useEffect(() => {
    dispatch(fetchBook(id))
  }, [dispatch])
  
  return(
    <Container>
      <AppBarBlock />
      <Box sx={{my: 1, display: 'flex', py: 1, justifyContent: 'center'}}>
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
      </Box>
      <Box>
        {book && 
          <BookInfo
            book={book}
            onAddBookVolumeId={()=>dispatch(addBooksVolumesId(book.id))}
            onRemoveBookVolumeId={()=>dispatch(removeBooksVolumesId(book.id))}
          />
        }
      </Box>
    </Container>
  )
}