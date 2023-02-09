import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { IBook } from "../models"

interface BookInfoProps {
  book: IBook
}

export function BookInfo({book}: BookInfoProps) {
  const imageBookList = book.volumeInfo.imageLinks
  let imageBook: string | undefined
  if (imageBookList) {
    if (imageBookList?.extraLarge){
      imageBook = imageBookList.extraLarge
    } else if(imageBookList?.large) {
      imageBook = imageBookList.large
    } else if(imageBookList?.medium) {
      imageBook = imageBookList.medium
    } else if(imageBookList?.small) {
      imageBook = imageBookList.small
    } else if(imageBookList?.smallThumbnail) {
      imageBook = imageBookList.smallThumbnail
    } else if(imageBookList?.thumbnail) {
      imageBook = imageBookList?.thumbnail
    } else imageBook = undefined    
  }

  return(
    <Card variant="outlined" sx={{ width: 'auto', minHeight: 1080, my: 2, backgroundColor: '#dbe9ec'}}>
      <CardContent>
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

      </CardContent>
    </Card>
    
  )
}



