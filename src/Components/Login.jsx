import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box, Button, TextField, Alert, Paper, useMediaQuery  } from '@mui/material';
import { updateAuthDetails } from '../shared/Redux/authDetailsSlice';
import { CustomPassword } from '../shared/BasicComponents';
import useInput from '../shared/Hooks/Input-hook';

const credentails = {email: 'staff@clinic.com', password: '123456'}

const Login = () => {
    const dispatch = useDispatch();
    const [submit, setSubmit] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const {input, handleChange, errors} = useInput();
    const {email, password} = input;
    const disabled = !email.value || !password.value 
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const backgroundColor = isDarkMode ? '#0000008a' : '#ffffff8a'; 
    const h4Color = isDarkMode ? 'white' : 'black';
    const subtitleBackgroundColor = loginError ? 'rgb(253, 237, 237)' : isDarkMode ? '#7373738a' : 'rgb(229, 246, 253)';
    const subtitleColor =  loginError ? 'rgb(95, 33, 32)' : isDarkMode ? 'white' : 'rgb(1, 67, 97)';
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(true);
        if(errors) return
        if(email.value === credentails.email && password.value === credentails.password)
            dispatch(updateAuthDetails({login: true}));
        else
            setLoginError(true);
    };

    return (
        <Box sx={{width: '94%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: '3%', 
                    height: '100%', gap: 1, pt:{xs: 0, sm: 12}, pb: {xs: 12, sm: 2},}} >
            <Paper elevation={3} sx={{width: {xs: '90%', sm: '23rem'}, display: 'flex', flexDirection: 'column', gap: 2, p: 2, py: 5,
                    alignItems: 'center', justifyContent: 'center', backgroundColor}}>
                <Typography variant='h4' color={h4Color} >Login</Typography>
                <Alert sx={{ width: '83%', color: subtitleColor, backgroundColor: subtitleBackgroundColor,}} 
                    severity={loginError ? 'error' : 'info'}>
                    {loginError ? 'Invalid credentials' : 'Login to view appointment details'}
                </Alert>
                <Box component={'form'} onSubmit={handleSubmit}
                    sx={{width: '93%', display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center'}}>
                    <TextField  type="email" name ="email" label="Email" size='small' fullWidth value={email.value} 
                        onChange={(event) => {handleChange(event); setSubmit(false)}}
                        error={email.error && submit} helperText={submit ? email.helperText : ''}/>
                    <CustomPassword name="password" label="Password" size='small' fullWidth value={password.value}
                        onChange={(event) => {handleChange(event); setSubmit(false)}}
                        error={password.error && submit} helperText={submit ? password.helperText : '' }/>
                    <Button variant="contained" type='submit' disabled={disabled} sx={{mt: 1}}>Login</Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Login;
