import { Box, Button, TextField } from "@mui/material"

interface InputFieldProps {
  query: string;
  onInput: (value: string) => void;
  onSubmit: () => void;
}

export function QueryField({query, onInput, onSubmit}: InputFieldProps) {

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput(e.target.value)        
  }

  function keyDownHandler(e: React.KeyboardEvent) {    
    if (e.key === 'Enter') {      
      onSubmit()
    }
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {e.preventDefault()}}
      sx={{py: 2, display: 'flex', gap: 2, justifyContent: 'center',
        flexWrap: 'wrap', '& > :not(style)': { m: 1 },
      }}
      noValidate
    >
      <TextField
        variant="standard"
        label="Select book title"          
        sx={{ mb: 1, width: 350 }}
        value={query}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />        
      <Button
        onClick={onSubmit}
      >
        Search
      </Button>

    </Box>
  )
}
