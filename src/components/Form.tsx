import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react"

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

export function Form({title, handleClick}: FormProps) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const isContent = pass.length> 5 && email.includes('@')
  
  function inputHandler() {
    handleClick(email.trim(), pass.trim())
  }

  return (
    
    <Box
      component="form"
      onSubmit={(e) => {e.preventDefault()}}
      sx={{px: 2, display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
      noValidate      
    >
      <TextField
        variant="standard"
        label="Email" 
        type="email"
        autoComplete="current-email"
        sx={{ m: 1, minWidth: 280 }}
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />

      <TextField
        variant="standard"
        label="Password"
        type="password"
        autoComplete="current-password"          
        sx={{ m: 1, minWidth: 280 }}
        value={pass}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' && isContent)   inputHandler()
        }}
      />
      
      {!isContent && <Button variant="contained" disabled>{title}</Button>}      
      {isContent && <Button variant="contained" onClick={inputHandler}>{title}</Button>}

    </Box>
  )
}