import { Alert, Box, Container, Typography } from "@mui/material";
import { AppBarBlock } from "../components/AppBarBlock";
import { BookVolumeCard } from '../components/BookVolumeCard';
import { ErrorMessage } from "../components/ErrorMessage";
import { QueryField } from '../components/QueryField';
import { Loader } from "../components/Loader";
import { FiltersBlock } from "../components/FiltersBlock";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { fetchBooksVolumes, inputQuery, selectCategory, selectOrderBy, setPage
} from "../store/booksVolumesSlice";
import { PaginationBlock } from "../components/PaginationBlock";

export function HomePage() {
  const {
    booksVolumes, totalItems, loading, error, category, orderBy, query, page
  } = useAppSelector( state => state.booksVolumes)
  
  const dispatch = useAppDispatch()  
  const addSearch = () => {
    if(query.trim().length) {
      dispatch(fetchBooksVolumes())
    }    
  }

  return (
    <Container maxWidth='xl'>
      <AppBarBlock />

      {query.trim().length === 0 &&
        <Alert severity="info" sx={{justifyContent: 'center'}}>
          Введите ключевое слово для поиска книги:
        </Alert>
      }

      <QueryField
        query={query}
        onInput={(value) => {dispatch(inputQuery(value))}}
        onSubmit={addSearch}
      />      
      <FiltersBlock
        category={category}
        orderBy={orderBy}
        onSelectCategory={(value) => {dispatch(selectCategory(value))}}
        onSelectOrderBy={(value) => {dispatch(selectOrderBy(value))}}      
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
        sx={{ mt: 1, py: 1, display: 'flex', justifyContent: 'space-evenly',
          flexWrap: 'wrap', gap: 2,
        }}
      >              
        {booksVolumes && booksVolumes.map(
          book => <BookVolumeCard key={book.id+book.etag} book={book}/>
        )}                
      </Box>
      {booksVolumes.length > 0 &&
        <PaginationBlock
          page={page}
          count={Math.ceil(totalItems/30)}
          onChangePage={(page) => {
            dispatch(setPage(page))
            if(query.trim().length) {
              dispatch(fetchBooksVolumes())
            }          
          }}
        />
      }           
    </Container>    
  )
}