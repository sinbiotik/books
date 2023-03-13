import {useState} from 'react';
import { AppBar, Box, Button, Card, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Login } from "../components/Login";
import { SignUp } from '../components/SignUp';

export function LoginPage() {
  const [isNewUser, setIsNewUser] = useState(false)
  return(
    <Container>
      <Box sx={{ display: 'flex', mb: 12 }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h6" component="div">
              BOOKS
            </Typography>          
          </Toolbar>
        </AppBar>
      </Box>

      <Card
        variant="outlined"
        sx={{display: 'flex', flexDirection: 'column', alignItems:'center', width: 'auto',
        my: 5, py:5, boxShadow: '0 0 5px 2px rgba(221, 221, 221, 1)',
        }}
      >
        {!isNewUser && 
          <>
            <Typography sx={{my: 1, mx: 'auto' }} variant="h4">Login</Typography>
            <Login/>
            <Typography color="text.secondary">
              Don't have an account yet? 
              <Button
                onClick={() => {setIsNewUser(prev => !prev)}}
                variant="outlined" size="small"
              >
                Register
              </Button> 
            </Typography>
          </>
        }

        {isNewUser && 
          <>
            <Typography sx={{my: 1, mx: 'auto' }} variant="h4">Register</Typography>
            <SignUp/>
            <Typography color="text.secondary">
              Already have an account?
              <Button
                onClick={() => {setIsNewUser(prev => !prev)}}
                variant="outlined" size="small"
              >                
                Sign in
              </Button>           
            </Typography>
          </>
        }
      </Card>
    </Container>
  )
}