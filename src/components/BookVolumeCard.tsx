import { Card, CardContent, CardMedia, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { IBook } from "../models"

interface BookCardProps {
  book: IBook
}

export function BookVolumeCard({book}: BookCardProps) {
  const imgL = book.volumeInfo.imageLinks
  
  const imgBook = imgL?.medium || imgL?.small || imgL?.thumbnail || imgL?.smallThumbnail

  return(
    <Link to={`/about/${book.id}`}>
      <Card
        variant="outlined"
        sx={{ height: 600, width: 330, my: 2,
          boxShadow: '0 0 10px 5px rgba(221, 221, 221, 1)',
          '&:hover': { transform: 'scale(1.05)'}
        }}
      >        
        <CardContent>                             
          <CardMedia
            component="img"            
            sx={{ height: 320, width: 240, mx: 'auto', my: 1,
              boxShadow: '7px 7px 10px 5px rgba(0, 0, 0, .5)',
            }}
            image={imgBook}
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