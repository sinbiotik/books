import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { IBook } from "../models"

interface BookCardProps {
  book: IBook
}

export function BookVolumeCard({book}: BookCardProps) {
  const imageBookList = book.volumeInfo.imageLinks
  
  const imageBook =  
    imageBookList?.medium
    || imageBookList?.small
    || imageBookList?.thumbnail
    || imageBookList?.smallThumbnail

  return(
    <Link to={`/about/${book.id}`}>
      <Card
        variant="outlined"
        sx={{ height: 600, width: 330, my: 2, backgroundColor: '#dbe9ec'}}
      >
        
        <CardContent>          
          <CardMedia
            component="img"            
            sx={{ height: 300, width: 210, mx: 'auto', my: 1 }}
            image={imageBook}
            alt={book.volumeInfo.title}
          />          

          <Typography sx={{ minHeight: 75, mb: 'auto', textAlign: 'center' }} variant="h6" >
            {book.volumeInfo.title}
          </Typography>
          <Typography variant="body2">
           Authors: <strong>{book.volumeInfo.authors?.join(', ')}</strong>            
          </Typography>
          <Typography variant="body2">
            Categories: <strong>{book.volumeInfo.categories?.[0]}</strong>            
          </Typography>
          
          <Typography color="text.secondary">
            {book.volumeInfo.description?.slice(0, 150)}
          </Typography>
        </CardContent>    

      </Card>
    </Link>
  )
}