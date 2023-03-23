import { AppBar, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux-hooks';
import { removeUser } from '../store/userSlice';
import { useState } from 'react';


export function AppBarBlock() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {setAnchorEl(null)}

  const dispatch = useAppDispatch()
  
  return (
    <Box sx={{ display: 'flex', mb: 12 }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
         sx={{display: 'flex', justifyContent: 'space-between'}}
        >
          <Box sx={{display: 'flex', alignItems: "center"}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{'aria-labelledby': 'basic-button'}}
            >
              <MenuItem onClick={handleClose}>
                <Link to={`/`}>Search</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to={`/localbookshelf`}>Local bookshelf</Link>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <Link to={`/publicbookshelf`}>Public</Link> 
              </MenuItem> */}
            </Menu>

            <Typography variant="h6" component="div">
              BOOKS
            </Typography>

          </Box>
          
          <Box sx={{display: { xs: 'none', sm: 'block'}}}>
            <Link to={`/`}>
              <Button sx={{ color: '#fff' }}>Search</Button>
            </Link>
            <Link to={`/localbookshelf`}>
              <Button sx={{ color: '#fff', ml: 1 }}>Local bookshelf</Button>
            </Link>
            {/* <Link to={`/publicbookshelf`}>
              <Button sx={{ color: '#fff', ml: 1 }}>Public</Button>
            </Link>             */}
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