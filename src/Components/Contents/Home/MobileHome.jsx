import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, useMediaQuery, Card  } from '@mui/material';
import dayjs from 'dayjs';

const MobileHome = ({events}) => {
   
    function eventDay(date){
        const day = Number(date.split('-')[2]);
        return day;
    }
    const startDate = Number(dayjs().startOf('month').format('D'));
    const endDate = Number(dayjs().endOf('month').format('D'));
    const days = Array.from({ length: endDate - startDate + 1 }, (_, index) => startDate + index);
    return (
        <Box sx={{display: {xs: 'flex', sm: 'none'}, flexGrow: 1, width: '100%', height: '100%', pt: 10,
            flexDirection: 'column', alignItems: 'center', gap: 1}}>
            <Typography variant='h4'>{dayjs().format('MMMM YYYY')}</Typography>
            {days.map((day) => (
                <Card key={day} variant='outlined' component={Link} to={`/appointments/${day}`}
                    sx={{width: '90%', height: 'fit-content', display: 'flex', flexDirection: 'column', p: 1}}>
                    <Typography variant='h6'>{day}</Typography>
                    {events.filter(event => eventDay(event.date) === day).map((event, index) => (
                       <Box key={index}>{event.title}</Box>
                    ))}
                </Card>
            ))}            
        </Box>
    )
}

export default MobileHome;
