import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { IBook } from "../models"

interface BookInfoProps {
  book: IBook;
  onAddBookVolumeId: (bookVolumeId: string) => void
  onRemoveBookVolumeId: (bookVolumeId: string) => void
  onRemovePublicVolumeId: (bookVolumeId: string) => void


}

export function BookInfo(
  {book, onAddBookVolumeId, onRemoveBookVolumeId, onRemovePublicVolumeId}: BookInfoProps
){  
  function onAddVolumeIdHandler() {
    onAddBookVolumeId(book.id)
  }

  function onRemoveVolumeIdHandler() {
    onRemoveBookVolumeId(book.id)
  }

  function onRemovePublicVolumeIdHandler() {
    onRemovePublicVolumeId(book.id)
    console.log(book.id)

  }

  const imageBookList = book.volumeInfo.imageLinks
  const imageBook =   
    imageBookList?.medium
    || imageBookList?.small
    || imageBookList?.thumbnail
    || imageBookList?.smallThumbnail 

  return(
    <Card
      variant="outlined"
      sx={{ width: 'auto', minHeight: 1080, my: 2, backgroundColor: '#dbe9ec'}}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
        <Typography sx={{my: 1 }} variant="h4">
          {book.volumeInfo.title}
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 500, width: 320, mx: 'auto', my: 2 }}          
          image={imageBook}
          alt={book.volumeInfo.title}
        />
        <Typography variant="body2">
          Authors: <strong>{book.volumeInfo.authors}</strong> 
        </Typography>
        <Typography variant="body2">
          Categories: <strong>{book.volumeInfo.categories}</strong>
        </Typography>

        {book.volumeInfo.description && 
          <Typography color="text.secondary" variant="subtitle2">
            {book.volumeInfo.description}
          </Typography>
        }
        <Box
          sx={{
            my: 3, mx: 'auto', display: 'flex',
            flexWrap: 'wrap', justifyContent: 'space-evenly'
          }}
        >
          <Button
            variant="contained"
            sx={{m: 1}}
            onClick={onAddVolumeIdHandler}
          >
            Add to local bookshelf
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{m: 1}}
            onClick={onRemoveVolumeIdHandler}
          >
            Remove to local bookshelf
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{m: 1}}
            onClick={onRemovePublicVolumeIdHandler}
          >
            Remove to public bookshelf
          </Button>
        </Box>

      </CardContent>
    </Card>
    
  )
}



