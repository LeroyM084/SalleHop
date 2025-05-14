import { useEffect } from 'react';

const useDashboardInteractions = () => {
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        console.log('Navigating to:', link.getAttribute('href'));
      });
    });

    const reservations = document.querySelectorAll('.reservation');
    reservations.forEach(reservation => {
      reservation.addEventListener('click', () => {
        const roomSlot = reservation.closest('.room-slot');
        const roomPlanning = roomSlot?.parentElement;
        const roomIndex = Array.from(roomPlanning?.children || []).indexOf(roomSlot!);
        const roomColumn = document.querySelectorAll('.room-column')[roomIndex];
        const roomNumber = roomColumn?.textContent || 'Unknown room';
        const dateText = reservation.closest('.planning-day')?.querySelector('.date-column')?.textContent;

        console.log('Clicked reservation in room:', roomNumber, 'on date:', dateText);
        console.log('Reservation details:', reservation.textContent);
      });
    });

    const emptySlots = document.querySelectorAll('.room-slot:not(:has(.reservation))');
    emptySlots.forEach(slot => {
      slot.addEventListener('click', () => {
        const roomPlanning = slot.parentElement;
        const roomIndex = Array.from(roomPlanning?.children || []).indexOf(slot);
        const roomColumn = document.querySelectorAll('.room-column')[roomIndex];
        const roomNumber = roomColumn?.textContent || 'Unknown room';
        const dateText = slot.closest('.planning-day')?.querySelector('.date-column')?.textContent;

        console.log('Clicked empty slot in room:', roomNumber, 'on date:', dateText);
      });
    });

    const scrollRightBtn = document.querySelector('.scroll-right');
    scrollRightBtn?.addEventListener('click', () => {
      const planningGrid = document.querySelector('.planning-grid');
      if (planningGrid) planningGrid.scrollLeft += 200;
    });

    return () => {
      // Cleanup if needed
    };
  }, []);
};

export default useDashboardInteractions;