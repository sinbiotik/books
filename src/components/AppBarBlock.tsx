import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux-hooks';
import { removeUser } from '../store/userSlice';


export function AppBarBlock() {  
  const dispatch = useAppDispatch()
  return (

    <Box sx={{ display: 'flex', mb: 12 }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
         sx={{display: 'flex', justifyContent: 'space-between'}}
        >
          <Typography variant="h6" component="div">
            BOOKS
          </Typography>
          <Box sx={{display: { xs: 'none', sm: 'block'}}}>
            <Link to={`/`}>
              <Button sx={{ color: '#fff' }}>Search</Button>
            </Link>
            <Link to={`/localbookshelf`}>
              <Button sx={{ color: '#fff', ml: 2 }}>Local bookshelf</Button>
            </Link>
            <Link to={`/publicbookshelf`}>
              <Button sx={{ color: '#fff', ml: 2 }}>Public bookshelf</Button>
            </Link>            
          </Box>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ color: '#fff', ml: 2 }}
            onClick={() => dispatch(removeUser())}
          >
            Log out            
          </Button>
        </Toolbar>
      </AppBar>
    </Box>


  )
}