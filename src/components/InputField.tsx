import { Box, Input, Button } from "@mui/material"

interface InputFieldProps {
  textInput: string;
  onInput: (value: string) => void;
  onSubmit: () => void;
}

export function InputField({textInput, onInput, onSubmit}: InputFieldProps) {

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
      sx={{        
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <form
        onSubmit={(e) => {e.preventDefault()}}
      >
        <Input
          placeholder="Select book title"          
          sx={{ mb: 1, width: 350 }}
          value={textInput}
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
        />        
        <Button
          onClick={onSubmit}
        >
          Search
        </Button>
      </form>

    </Box>
  )
}
