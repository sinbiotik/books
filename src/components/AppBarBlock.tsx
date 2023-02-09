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
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            BOOKS
          </Typography>
          <Box sx={{display: { xs: 'none', sm: 'block'}}}>

            <Link to={`/`}>
              <Button sx={{ color: '#fff' }}>Home</Button>
            </Link>
            
            <Button sx={{ color: '#fff' }}>About</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>


  )
}