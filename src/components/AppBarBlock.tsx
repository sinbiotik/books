import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export function AppBarBlock() {  

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
        </Toolbar>
      </AppBar>
    </Box>


  )
}