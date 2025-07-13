import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CustomPassword = ( {value, name, label, onChange, error, helperText, size, fullWidth }) => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return(
        <TextField name={name} label={label} value={value} onChange={onChange} type={showOldPassword ? 'text' : 'password'}
            error={error} helperText={helperText} size={size} fullWidth={fullWidth}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" edge="end" onClick={() => setShowOldPassword(!showOldPassword)} 
                      sx={{color: isDarkMode ? '#ffffff8a' : '#0000008a'}} >
                      {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),}}/> 
    );
}


export { CustomPassword,};

