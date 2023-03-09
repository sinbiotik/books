import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { IBook } from "../models"

interface BookInfoProps {
  book: IBook;
  booksVolumesId: string [];
  booksVolumes: IBook[]
  onAddBookId: (id: string) => void
  onRemoveBookId: (id: string) => void
  onAddPublicVolume: (book: IBook) => void
  onRemovePublicId: (id: string) => void
}

export function BookInfo({
  book, booksVolumesId, booksVolumes, onAddBookId, onRemoveBookId,
  onAddPublicVolume, onRemovePublicId
}: BookInfoProps){

  const isAdded = booksVolumesId.some(volumeId => volumeId === book.id)
  const isPublicAdd = booksVolumes.some(volume => volume.id === book.id)
  
  function handleAddId() { if(!isAdded) onAddBookId(book.id)}
  function handleRemoveId() {if(isAdded)  onRemoveBookId(book.id)}

  function onAddPublicIdHandler() {if(!isPublicAdd) onAddPublicVolume(book)}
  function onRemovePublicIdHandler() {if(isPublicAdd) onRemovePublicId(book.id)}

  const imgL = book.volumeInfo.imageLinks
  const imgBook = imgL?.medium || imgL?.small || imgL?.thumbnail || imgL?.smallThumbnail 

  return(
    <Card
      variant="outlined"
      sx={{ width: 'auto', minHeight: 1080, my: 2, 
        boxShadow: '0 0 10px 5px rgba(221, 221, 221, 1)',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 5,}}>
        <Typography sx={{my: 1, mx: 'auto' }} variant="h4">
          {book.volumeInfo.title}
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 480, width: 320, mx: 'auto', my: 2,
            boxShadow: '7px 7px 10px 5px rgba(0, 0, 0, .5)', 
          }}          
          image={imgBook}
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
          {!isAdded &&
            <Button
              variant="contained"
              sx={{m: 1}}
              onClick={handleAddId}
            >
              Add to local bookshelf
            </Button>
          }

          {isAdded &&
            <Button
              variant="outlined"
              color="error"
              sx={{m: 1}}
              onClick={handleRemoveId}
            >
              Remove to local bookshelf
            </Button>
          }

          {!isPublicAdd &&
            <Button
              variant="contained"
              sx={{m: 1}}
              onClick={onAddPublicIdHandler}
            >
              Add to public bookshelf
            </Button>
          }

          {isPublicAdd &&
            <Button
              variant="outlined"
              color="error"
              sx={{m: 1}}
              onClick={onRemovePublicIdHandler}
            >
              Remove to public bookshelf
            </Button>
          }
        </Box>
      </CardContent>
    </Card>   
  )
}



