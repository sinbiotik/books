import { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { IBook } from "../models"

interface BookInfoProps {
  book: IBook;
  booksVolumesId: string [];
  onAddBookVolumeId: (id: string) => void
  onRemoveBookVolumeId: (id: string) => void
  onRemovePublicVolumeId: (id: string) => void
}

export function BookInfo({
  book, booksVolumesId, onAddBookVolumeId, onRemoveBookVolumeId, onRemovePublicVolumeId
}: BookInfoProps){
  const isAdded = booksVolumesId.some(id => id === book.id)  
  function handleAddVolumeId() {
    if(!isAdded) {
      onAddBookVolumeId(book.id)
      console.log(book.id)
    }
  }

  function handleRemoveVolumeId() {
    if(isAdded) {
      onRemoveBookVolumeId(book.id)
      console.log(book.id)
    }
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
          {!isAdded &&
            <Button
              variant="contained"
              sx={{m: 1}}
              onClick={handleAddVolumeId}
            >
              Add to local bookshelf
            </Button>
          }

          {isAdded &&
            <Button
              variant="outlined"
              color="error"
              sx={{m: 1}}
              onClick={handleRemoveVolumeId}
            >
              Remove to local bookshelf
            </Button>
          }

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



