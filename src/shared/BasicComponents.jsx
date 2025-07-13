import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, FormControl, MenuItem, InputLabel, Select, useMediaQuery } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CustomCard = ({children}) => {
  return(
    <Box sx={{borderRadius: 2, backgroundColor: '#d7f2ff', p: 1, display: 'flex', flexDirection: 'column', 
          alignContent: 'space-between'}}>
      {children}
    </Box>
  );
}

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

const CustomSelect = ({value, onChange, list, label}) => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return(
    <FormControl fullWidth>
      <InputLabel >{label}</InputLabel>
      <Select displayEmpty  value={value} label={label} onChange={onChange} 
        sx={{color: isDarkMode ? 'white' : 'black', '& .MuiSvgIcon-root':{color: isDarkMode ? '#ffffff8a' : '#0000008a'}}} >
        {list.length > 1 && <MenuItem value=''>All</MenuItem>}
        {list.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}


export {CustomCard, CustomPassword, CustomSelect};

