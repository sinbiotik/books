import { Box, Container, Typography } from "@mui/material"
import  { useState } from 'react';
import { AppBarBlock } from "../components/AppBarBlock";
import { BookVolumeCard } from '../components/BookVolumeCard';
import { ErrorMessage } from "../components/ErrorMessage";
import { QueryField } from '../components/QueryField';
import { Loader } from "../components/Loader";
import { FiltersBlock } from "../components/FiltersBlock";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchBooksVolumes } from "../store/booksVolumesSlice";
import { PaginationBlock } from "../components/PaginationBlock";


export function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all');
  const [orderBy , setOrderBy ] = useState('relevance');
  const [page, setPage] = useState(1)

  const {booksVolumes, totalItems, loading, error} = useAppSelector(
    state => state.booksVolumes
  )
  const dispatch = useAppDispatch()

  const addSearch = () => {
    if(query.trim().length) {
      dispatch(fetchBooksVolumes({query, category, orderBy, page}))   
      // setQuery('')
    }    
  }

  return(
    <Container>
      <AppBarBlock />      
      <QueryField query={query} onInput={setQuery} onSubmit={addSearch}/>
      
      <FiltersBlock
        category={category}
        orderBy={orderBy}
        onSelectCategory={setCategory}
        onSelectOrderBy={setOrderBy}      
      />
      <Box sx={{my: 1, display: 'flex', py: 1, justifyContent: 'center'}}>
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
        {booksVolumes &&
          <Typography>
            A total of <strong>{totalItems}</strong> book volumes were found on request
          </Typography>
        } 
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
      </Box>

      { booksVolumes &&
        <PaginationBlock
          page={page}
          count={Math.ceil(totalItems/30)}  // ?????????????
          onChangePage={(page) => {
            if(query.trim().length) {
              dispatch(fetchBooksVolumes({query, category, orderBy, page}))
              setPage(page)
            }          
          }}
          onLoadMore={(page) =>{
            if(query.trim().length) {
              dispatch(fetchBooksVolumes({query, category, orderBy, page}))
              setPage(page)
            } 
          }}
        />
      }           
    </Container>
  )
}