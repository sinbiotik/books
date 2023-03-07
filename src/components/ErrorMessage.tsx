import { Typography } from '@mui/material'

interface ErrorMessageProps {
  error: string
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <Typography color="red">
      ERROR MESSAGE: <strong>'{ error }'</strong> 
    </Typography>
  )  
}