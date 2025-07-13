import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, useMediaQuery, Card  } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const MobileHome = ({events}) => {
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const navigate = useNavigate();
    const [date, setDate] = useState();   
    function eventDay(date){
        const day = Number(date.split('-')[2]);
        return day;
    }
    const selectedDate = Number(dayjs(date).format('D'));
    const startDate = Number(dayjs().startOf('month').format('D'));
    const endDate = Number(dayjs().endOf('month').format('D'));
    const days = Array.from({ length: endDate - startDate + 1 }, (_, index) => startDate + index);
    const filterDate = date ? [selectedDate] : days;
    return (
        <Box sx={{display: {xs: 'flex', sm: 'none'}, flexGrow: 1, width: '100%', height: '100%', pt: 10,
            flexDirection: 'column', alignItems: 'center', gap: 1}}>
            <Typography variant='h4'>{dayjs().format('MMMM YYYY')}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker minDate={dayjs().startOf('month')} maxDate={dayjs().endOf('month')} label="Date" 
                         onChange={(newValue) => setDate(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
            {filterDate.map((day) => (
                <Card key={day} variant='outlined' component={Link} to={`/appointments/${day}`}
                    sx={{width: '90%', height: 'fit-content', display: 'flex', flexDirection: 'column', p: 1, 
                         color: isDarkMode ? 'white' : 'black',
                        backgroundColor: isDarkMode ? 'black' : 'white'
                    }}>
                    <Typography variant='h6'>{day}</Typography>
                    {events.filter(event => eventDay(event.date) === day).map((event, index) => (
                       <Box key={index}>{event.title}</Box>
                    ))}
                </Card>
            ))}       
           {date && <Button variant='contained' onClick={() => navigate('/appointments')}>View All Appointments</Button>   }  
        </Box>
    )
}

export default MobileHome;
