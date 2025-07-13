import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, TextField, MenuItem, useMediaQuery, Card, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { updateAuthDetails } from '../../../shared/Redux/authDetailsSlice';
import AddAppoinment from './AddAppoinment';

const Appointments = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [edit, setEdit] = useState({doctor: ''});
    const appointmentDetails = useSelector(state => state.authDetails).appoinmentDetails;
    const paramDay = useParams().day;
    const day = paramDay.length === 1 ? `0${paramDay}` : paramDay;  
    const endMonth = dayjs(day).endOf('month').format('DD') 
    const selectedDate = dayjs().format(`YYYY-MM-${day}`);
    const currentDayAddAppoinment = appointmentDetails.filter(appointment => appointment.date === selectedDate);
    const sortedAppointments = [...currentDayAddAppoinment].sort((a, b) => a.time.localeCompare(b.time));
    const enableAdd = day >= dayjs().format('DD');
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    function timeFormat(time) {
        const formatedTime = dayjs(dayjs().set('hour', time.split(':')[0]).set('minute', time.split(':')[1]));
        return dayjs(formatedTime).format('hh:mm A')
    }
    
    useEffect(() => {
        if(day < 1 || day > endMonth){ 
            navigate('/');
        }
    }, [day])

    const handleDelete = (id) => {
        const array = appointmentDetails.filter(appointment => appointment.id !== id);
        dispatch(updateAuthDetails({appoinmentDetails: array}));
    }
    
    return (
        <Box sx={{flexGrow: 1, width: '93%', p: '3%', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%',
              py: {xs: 11, sm: 12}, gap: 2}}>
            <Typography sx={{typography: {xs: 'h5', sm: 'h4'},}}>
                {dayjs().set('date', day).format('DD dddd, MM YYYY')}
            </Typography>
            <Box >
                {sortedAppointments.map((appointment) => (
                    (edit.doctor && edit.id === appointment.id) ? <AddAppoinment key={appointment.id} edit={edit} setEdit={setEdit}/> :
                    <Card key={appointment.id} variant='outlined' 
                        sx={{display: edit.id === appointment.id ? 'none' : 'flex', flexDirection: 'column', alignItems: {xs: 'flex-start', sm: 'center'}, 
                        width: '100%', backgroundColor: isDarkMode ? '#0000008a' : '#ffffff8a', color: isDarkMode ? 'white' : 'black',
                        mb: 1, p: 1,  }}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <Typography sx={{typography: 'h6', textAlign: 'left', width: '100%'}}>
                                {timeFormat(appointment.time)}
                            </Typography>
                            <IconButton onClick={() => setEdit(appointment)} sx={{ p: 0, mr: 1}}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(appointment.id)} sx={{ p: 0}}>
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: {xs: 0, sm: 1}, width: '100%',
                            justifyContent: 'space-between'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                                <Typography variant='h6'>Doctor</Typography>
                                <Typography sx={{typography: 'h6', opacity: 0.8}}>{appointment.doctor}</Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                                <Typography variant='h6'>Patient</Typography>
                                <Typography sx={{typography: 'h6', opacity: 0.8}}>{appointment.patient}</Typography>
                            </Box>
                        </Box>
                    </Card>     
                ) )}
            </Box>
            { !edit.doctor && enableAdd && <AddAppoinment />}
        </Box>
    )
}

export default Appointments;
