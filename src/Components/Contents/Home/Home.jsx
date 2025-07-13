import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction" 
import listPlugin from '@fullcalendar/list';
import dayjs from 'dayjs';
import MobileHome from "./MobileHome";

const Home = () => {
    const navigate = useNavigate();
    const appointmentDetails = useSelector(state => state.authDetails).appoinmentDetails;
    
    function timeFormat(time) {
        const formatedTime = dayjs(dayjs().set('hour', time.split(':')[0]).set('minute', time.split(':')[1]));
        return dayjs(formatedTime).format('hh:mm A')
    }
    const events = appointmentDetails.map((item) => ({
        title: `${timeFormat(item.time)} ${item.patient}`,
        time: item.time,
        date: item.date,
        start: new Date(item.date)
    }));

    const sortedEvents = [...events].sort((a, b) => a.time.localeCompare(b.time));

    const handleDateClick = (arg) => {
      const day = arg.dateStr.split('-')[2];
      navigate(`/appointments/${day}`);
  }
    return (
        <Box sx={{ flexGrow: 1, width: '93%', p: '3%',  }}>
            <MobileHome events={sortedEvents} />
            <Box sx={{ pt: {xs: '5.2rem', sm: '3rem', }, display: {xs: 'none', sm: 'block'}}}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: '', // Remove prev,next,today
                        center: 'title',
                        right: '', // Remove view buttons
                    }}
                    height="auto"
                    events={sortedEvents}
                    eventContent={renderEventContent}
                    dateClick={handleDateClick}
                />
            </Box>
        </Box>
    );
};

function renderEventContent(eventInfo) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mx: 0.5, width: '100%'}}>
      <Typography sx={{ fontSize: '0.6rem', fontWeight: 400 }}>{eventInfo.event.title}</Typography>
    </Box>
  )
}

export default Home;