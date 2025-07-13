import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, } from 'react-router-dom';
import { Box, Button, TextField, MenuItem, useMediaQuery } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { doctors, patients } from '../../../assets/Collectios';
import { updateAuthDetails } from '../../../shared/Redux/authDetailsSlice';

const AddAppoinment = ({edit, setEdit,}) => {
    const dispatch = useDispatch();
    const appointmentDetails = useSelector(state => state.authDetails).appoinmentDetails;
    const paramDay = useParams().day;
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const menuColor = isDarkMode ? 'white' : 'black';
    const day = paramDay.length === 1 ? `0${paramDay}` : paramDay;  
    const selectedDate = dayjs().format(`YYYY-MM-${day}`);
    const currentDayAddAppoinment = appointmentDetails.filter(appointment => appointment.date === selectedDate);
    const minutes = Number(dayjs().set('minute', dayjs().minute()).format('mm'));
    const newMinutes = minutes % 5 === 0 ? (minutes + 5) % 60 : minutes - (minutes % 5) + 5;
    const currentTime = dayjs().hour(dayjs().hour()).minute(newMinutes).format('HH:mm');
    const minTime = currentTime > '09:00' ? currentTime : '09:00';
    const [formData, setFormData] = useState({ doctor: '', date: selectedDate , time: minTime, patient: '', id: 0});
    const formTime = dayjs(dayjs().set('hour', formData.time.split(':')[0]).set('minute', formData.time.split(':')[1]));
    const sixPM = dayjs(dayjs().set('hour', 18).startOf('hour'))
    const disabled = !formData.doctor || !formData.patient || formData.time < currentTime || formData.time >= sixPM.format('HH:mm');

    useEffect(() => {
        if(edit) {
            setFormData(edit);
        }
    }, [edit])

    const handleTime = (event) => {
        const time = dayjs(event).format('HH:mm');
        let id = appointmentDetails.length + 1;
        if(edit) id = edit.id;
        setFormData((prevState) => ({...prevState, id, time}));
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        let id = appointmentDetails.length + 1;
        if(edit) id = edit.id;
        setFormData((prevState) => ({...prevState, id, [name]: value}));
    }

    const handleAdd = () => {
        let array = [...appointmentDetails];
        if(edit){
            array = array.filter((appointment) => appointment.id !== edit.id);
        }
        const existingAppointment = currentDayAddAppoinment.map((appointment) => {
            if((appointment.doctor === formData.doctor || appointment.patient === formData.patient) && appointment.time === formData.time){
                return true;
            }
        });
        if(existingAppointment.includes(true)) {
            alert('This time slot is already taken');
            return;
        };
        array.push(formData); 
        dispatch(updateAuthDetails({appoinmentDetails: array}));
        if(edit) setEdit({});
    }

    return (
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: 2, width: {xs: '100%', lg: '80%'}, my: edit ? 2 : 0,
            justifyContent: 'center', alignItems: 'center', pb: edit ? 0 : 4}}>
            <TextField select label="Select Doctor" name="doctor" value={formData.doctor} onChange={handleChange} 
                sx={{flexGrow: 1, width: {xs: '95%', sm: 'auto'}, color: menuColor}}>
                {doctors.map((doctor) => <MenuItem key={doctor} value={doctor} sx={{}}>{doctor}</MenuItem>)}
            </TextField> 
            <TextField select label="Select Patient" name="patient" value={formData.patient} onChange={handleChange} 
                sx={{flexGrow: 1, width: {xs: '95%', sm: 'auto'}}}>
                {patients.map((patient) => <MenuItem key={patient} value={patient}>{patient}</MenuItem>)}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    label="Select Time"
                    value={formTime}
                    disablePast 
                    maxTime={sixPM}
                    onChange={handleTime}
                    sx={{width: '10rem'}}
                />  
            </LocalizationProvider> 
            <Box sx={{display: 'flex', gap: 2, flexDirection: 'row'}}>
            <Button variant="contained" disabled={disabled} onClick={handleAdd}>{edit ? 'Update' : 'Add'}</Button>
                { edit && <Button variant="contained" color='error' onClick={() => setEdit({})}>Cancel</Button>}
            </Box>
        </Box>      
    )
}

export default AddAppoinment;
