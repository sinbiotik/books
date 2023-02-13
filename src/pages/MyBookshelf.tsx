import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { AppBarBlock } from "../components/AppBarBlock";
import { BookVolumeCard } from "../components/BookVolumeCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMyBookshelf } from "../store/MyBookshelfSlice";

export function MyBookshelf() {
  const {booksVolumes, error, loading} = useAppSelector(state => state.myBookshelf)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchMyBookshelf())
  }, [dispatch])

  return (
    <Container>
      <AppBarBlock />     

      <Box
        sx={{
          mt: 1,
          py: 1,
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}                
        {booksVolumes &&
          booksVolumes.map(book => <BookVolumeCard key={book.id+book.etag} book={book}/>)
        }                
      </Box>
    </Container>    



  )
}