import { Box, Container, Typography } from "@mui/material"
import  { useState, useEffect } from 'react';
import { AppBarBlock } from "../components/AppBarBlock";
import { BookVolumeCard } from '../components/BookVolumeCard';
import { ErrorMessage } from "../components/ErrorMessage";
import { InputField } from '../components/InputField';
import { Loader } from "../components/Loader";
import { SelectBlock } from "../components/SelectBlock";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchBooksVolumes } from "../store/booksVolumesSlice";


export function HomePage() {
  const [textInput, setTextInput] = useState('')

  const [category, setCategory] = useState('all');
  const [orderBy , setOrderBy ] = useState('relevance');

  const {booksVolumes, totalItems, loading, error} = useAppSelector(
    state => state.booksVolumes
  )
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchBooks(textInput))
  // }, [dispatch])

  const addSearch = () => {
    if(textInput.trim().length) {
      // console.log(textInput.trim())
      dispatch(fetchBooksVolumes({textInput, category, orderBy}))   
      setTextInput('')
    }    
  }

  return(
    <Container>
      <AppBarBlock />      
      <InputField textInput={textInput} onInput={setTextInput} onSubmit={addSearch}/>
      
      <SelectBlock
        category={category}
        orderBy={orderBy}
        onSelectCategory={setCategory}
        onSelectOrderBy={setOrderBy}      
      />
      <Box>
        <Typography
          sx={{textAlign: 'center'}}
        >
          A total of <strong>{totalItems}</strong> book volumes were found on request
        </Typography>
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
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}                
        {booksVolumes &&
          booksVolumes.map(book => <BookVolumeCard key={book.id+book.etag} book={book}/>)
        }        
      </Box>      
    </Container>
  )
}