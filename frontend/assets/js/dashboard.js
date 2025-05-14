document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize room booking functionality
    initRoomBooking();
    
    // Handle scroll buttons for planning grid
    initPlanningScroll();
});

function initNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Add click event to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // You can add more logic here if needed
            // For now, just let the default navigation happen
            console.log('Navigating to:', link.getAttribute('href'));
        });
    });
}

function initRoomBooking() {
    // Get all reservation elements
    const reservations = document.querySelectorAll('.reservation');
    
    // Add click event to each reservation
    reservations.forEach(reservation => {
        reservation.addEventListener('click', function(e) {
            // Here you would typically show a modal with details or allow editing
            const roomNumber = reservation.closest('.room-slot').parentElement.querySelector('.room-column')?.textContent || 
                              'Unknown room';
            const dateText = reservation.closest('.planning-day').querySelector('.date-column').textContent;
            
            console.log('Clicked reservation in room:', roomNumber, 'on date:', dateText);
            console.log('Reservation details:', reservation.textContent);
            
            // You could show a modal here with the reservation details
            // showReservationModal(roomNumber, dateText, reservation.textContent);
        });
    });
    
    // Get all empty room slots
    const emptySlots = document.querySelectorAll('.room-slot:not(:has(.reservation))');
    emptySlots.forEach(slot => {
        slot.addEventListener('click', function(e) {
            // Here you would typically show a booking form
            const roomIndex = Array.from(slot.parentElement.children).indexOf(slot);
            const roomNumber = document.querySelectorAll('.room-column')[roomIndex]?.textContent || 'Unknown room';
            const dateText = slot.closest('.planning-day').querySelector('.date-column').textContent;
            
            console.log('Clicked empty slot in room:', roomNumber, 'on date:', dateText);
            
            // You could show a booking modal here
            // showBookingModal(roomNumber, dateText);
        });
    });
}

function initPlanningScroll() {
    // Get scroll button
    const scrollRightBtn = document.querySelector('.scroll-right');
    
    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', function() {
            // Implement scrolling logic for the planning grid
            // This would typically scroll to show more rooms
            const planningGrid = document.querySelector('.planning-grid');
            if (planningGrid) {
                planningGrid.scrollLeft += 200; // Scroll 200px to the right
            }
        });
    }
}

// Function to show a modal with reservation details (to be implemented)
function showReservationModal(roomNumber, date, details) {
    // Implementation for showing a modal with reservation details
    console.log('Showing modal for reservation in room', roomNumber, 'on', date);
    console.log('Details:', details);
    
    // Here you would create and show a modal with the reservation details
    // You could allow editing or deleting the reservation
}

// Function to show a booking form modal (to be implemented)
function showBookingModal(roomNumber, date) {
    // Implementation for showing a booking form
    console.log('Showing booking form for room', roomNumber, 'on', date);
    
    // Here you would create and show a modal with a form to create a new reservation
}