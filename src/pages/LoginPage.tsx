import {useState} from 'react';
import { Alert, AppBar, Box, Button, Card, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Login } from "../components/Login";
import { SignUp } from '../components/SignUp';

export function LoginPage() {
  const [isNewUser, setIsNewUser] = useState(false)
  return(
    <Container>
      <Box sx={{ display: 'flex', mb: 12, justifyContent: 'center' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h6" component="div">
              BOOKS
            </Typography>      
          </Toolbar>
        </AppBar>
      </Box>
      
      <Alert severity="info" sx={{justifyContent: 'center'}}>
        Аутентификация реализована через сервис Firebase.
        Email может быть реальным, или несуществующим, но должен содержать знаки '@' и '.'
        Пароль придумайте любой, длинной больше 5 символов.
      </Alert>

      <Box  sx={{ display: 'flex', mb: 12, justifyContent: 'center' }}>
        <Card
          variant="outlined"
          sx={{display: 'flex', flexDirection: 'column', alignItems:'center', width: 'auto',
          my: 5, py:5, maxWidth: 768, boxShadow: '0 0 5px 2px rgba(221, 221, 221, 1)',
          }}
        >
          {!isNewUser && 
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <Typography sx={{my: 1, mx: 'auto' }} variant="h4">Login</Typography>
              <Login/>
              <Typography color="text.secondary" sx={{px: 2, mx: 'auto'}} >
                Еще нет аккаунта?
              </Typography>
              <Button
                sx={{mx: 'auto'}}
                onClick={() => {setIsNewUser(prev => !prev)}}
                variant="outlined" size="small" 
              >
                зарегистрироваться
              </Button> 
            </Box>
          }

          {isNewUser && 
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <Typography sx={{my: 1, mx: 'auto' }} variant="h4">Register</Typography>
              <SignUp/>
              <Typography color="text.secondary" sx={{px: 2, mx: 'auto'}} >
                Уже есть аккаунт?          
              </Typography>
              <Button
                sx={{mx: 'auto'}}
                onClick={() => {setIsNewUser(prev => !prev)}}
                variant="outlined" size="small"
              >                
                Войти
              </Button> 
            </Box>
          }
        </Card>
      </Box>
    </Container>
  )
}