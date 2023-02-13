import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { IBook } from "../models"

interface BookInfoProps {
  book: IBook;
  onBookVolumeId: (bookVolumeId: string) => void
}

export function BookInfo({book, onBookVolumeId}: BookInfoProps) {
  
  function onBookVolumeIdHandler() {
    onBookVolumeId(book.id)
  }

  const imageBookList = book.volumeInfo.imageLinks
  const imageBook =     
    imageBookList?.large
    || imageBookList?.medium
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
        <Button
          variant="contained"
          sx={{my: 3, mx: 'auto'}}
          onClick={onBookVolumeIdHandler}
        >
          Add to my bookshelf
        </Button>
      </CardContent>
    </Card>
    
  )
}



