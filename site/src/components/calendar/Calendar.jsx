import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = ({ calendarRef, events, handleEventClick, handleDateSelect }) => {
  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={false}
      events={events}
      height="600px"
      slotMinTime="08:00:00"
      slotMaxTime="19:00:00"
      slotDuration="01:00:00"
      slotLabelInterval="02:00:00"
      weekends={true}
      editable={false}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekNumbers={false}
      navLinks={false}
      locale="fr"
      firstDay={1}
      allDaySlot={false}
      slotLabelFormat={{
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: false
      }}
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false
      }}
      eventClick={handleEventClick}
      select={handleDateSelect}
      businessHours={{
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '08:00',
        endTime: '19:00',
      }}
      eventDidMount={(info) => {
        info.el.style.borderRadius = '4px';
        info.el.style.fontSize = '12px';
      }}
      selectAllow={() => true}
      unselectAuto={false}
    />
  );
};

export default Calendar;
