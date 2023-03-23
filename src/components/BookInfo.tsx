import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { IBook } from "../models"

interface BookInfoProps {
  book: IBook
  isAdded: boolean
  isPublicAdded: boolean
  onAddBookId: (id: string) => void
  onRemoveBookId: (id: string) => void
  onAddPublicVolume: (book: IBook) => void
  onRemovePublicId: (id: string) => void
}

export function BookInfo({
  book, isAdded, isPublicAdded, onAddBookId, onRemoveBookId,
  onAddPublicVolume, onRemovePublicId
}: BookInfoProps){

  function handleAddId() { if(!isAdded) onAddBookId(book.id)}
  function handleRemoveId() {if(isAdded)  onRemoveBookId(book.id)}

  function onAddPublicIdHandler() {if(!isPublicAdded) onAddPublicVolume(book)}
  function onRemovePublicIdHandler() {if(isPublicAdded) onRemovePublicId(book.id)}

  const imgL = book.volumeInfo.imageLinks
  const imgBook = imgL?.medium || imgL?.small || imgL?.thumbnail || imgL?.smallThumbnail 

  return(
    <Card
      variant="outlined"
      sx={{ maxWidth: 768, minWidth: 320, minHeight: 1024, my: 2, 
        boxShadow: '0 0 10px 5px rgba(221, 221, 221, 1)',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{my: 1, mx: 'auto' }} variant="h4">
          {book.volumeInfo.title}
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 480, width: 300, mx: 'auto', my: 2,
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
              Remove from local bookshelf
            </Button>
          }

          {/* {!isPublicAdded &&
            <Button
              variant="contained"
              sx={{m: 1}}
              onClick={onAddPublicIdHandler}
            >
              Add to public bookshelf
            </Button>
          }
          {isPublicAdded &&
            <Button
              variant="outlined"
              color="error"
              sx={{m: 1}}
              onClick={onRemovePublicIdHandler}
            >
              Remove from public bookshelf
            </Button>
          } */}
        </Box>
      </CardContent>
    </Card>   
  )
}



