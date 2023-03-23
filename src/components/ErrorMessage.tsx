import { Typography } from '@mui/material'

interface ErrorMessageProps {
  error: string
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <Typography sx={{px: 2, mx:2}} color="red">
      ERROR MESSAGE: <strong>'{ error }'</strong> 
    </Typography>
  )  
}