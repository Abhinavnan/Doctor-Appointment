import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, AppBar, Toolbar, IconButton  } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { resetAuthDetails } from '../shared/Redux/authDetailsSlice';

const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(resetAuthDetails());
    }
    return (
        <Box sx={{ flexGrow: 1, width: '100%'}}>
            <AppBar sx={{top: 0, bottom: 'auto',}}>
            <Toolbar>
                <Typography component={Link} to='/' 
                    sx={{ flexGrow: 1, color: 'inherit', '&:hover': { color: 'inherit' }, typography: {xs: 'h5', sm: 'h4'} }}>
                    Clinic Appointment
                </Typography>
                <IconButton onClick={handleLogout} sx={{display: 'flex', flexDirection: 'column', color: 'inherit',}}>
                    <LogoutIcon sx={{fontSize: '2rem'}}/>
                    <Typography variant='caption'>Logout</Typography>
                </IconButton>
            </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
