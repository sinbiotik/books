import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppBarBlock } from '../components/AppBarBlock';
import { BookInfo } from '../components/BookInfo';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchBook } from '../store/bookSlice';
import { addBooksVolumesId } from '../store/MyBookshelfSlice';

export function AboutPage() {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const {book, error, loading} = useAppSelector(state => state.book)
  // const {booksVolumesId} = useAppSelector(state => state.myBookshelf)
  

  useEffect(() => {
    dispatch(fetchBook(id))
  }, [])

  return(
    <Container>
      <AppBarBlock />
      <Box>
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
        {book && <BookInfo book={book} onBookVolumeId={()=>dispatch(addBooksVolumesId(book.id))}/>}
      </Box>
    </Container>
  )
}