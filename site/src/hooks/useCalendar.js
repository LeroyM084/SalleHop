import { useState, useCallback } from 'react';

export const useCalendar = () => {
  const [currentView, setCurrentView] = useState('timeGridWeek');
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeView = useCallback((calendarRef, viewName) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(viewName);
      setCurrentView(viewName);
      setCurrentDate(calendarApi.getDate());
    }
  }, []);

  const navigationActions = useCallback((calendarRef) => ({
    previous: () => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.prev();
        setCurrentDate(calendarApi.getDate());
      }
    },
    next: () => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.next();
        setCurrentDate(calendarApi.getDate());
      }
    },
    today: () => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.today();
        setCurrentDate(calendarApi.getDate());
      }
    }
  }), []);

  return {
    currentView,
    currentDate,
    setCurrentDate,
    changeView,
    navigationActions
  };
};
