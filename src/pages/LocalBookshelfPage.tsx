import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { AppBarBlock } from "../components/AppBarBlock";
import { BookVolumeCard } from "../components/BookVolumeCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchLocalBookshelf } from "../store/localBookshelfSlice";

export function LocalBookshelf() {
  const {booksVolumes, error, loading} = useAppSelector(state => state.localBookshelf)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchLocalBookshelf())
  }, [dispatch])

  return (
    <Container>
      <AppBarBlock />
      <Box sx={{my: 1, display: 'flex', py: 1, justifyContent: 'center'}}>
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />} 
      </Box> 
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
        {booksVolumes &&
          booksVolumes.map(book => <BookVolumeCard key={book.id+book.etag} book={book}/>)
        }
        {!booksVolumes &&
          <Typography variant="h2">Your local bookshelf is empty at the moment</Typography>
        }                
      </Box>
    </Container>    



  )
}