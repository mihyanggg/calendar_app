const calendarEl = document.getElementById('calendar');
const monthYearEl = document.getElementById('month-year');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');

let currentDate = new Date();

function generateCalendar(date) {
  calendarEl.innerHTML = ''; // Clear existing calendar
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  // Set header
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Create day headers
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const dayEl = document.createElement('div');
    dayEl.classList.add('day');
    dayEl.textContent = day;
    calendarEl.appendChild(dayEl);
  });

  // Calculate days in current month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Create empty slots for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyEl = document.createElement('div');
    emptyEl.classList.add('date');
    calendarEl.appendChild(emptyEl);
  }

  // Create date elements
  for (let day = 1; day <= daysInMonth; day++) {
    const dateEl = document.createElement('div');
    dateEl.classList.add('date');
    dateEl.textContent = day;

    // Highlight today's date
    const today = new Date();
    if (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      dateEl.classList.add('today');
    }

    calendarEl.appendChild(dateEl);
  }
}

// Add event listeners to navigation buttons
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
});

// Initialize calendar
generateCalendar(currentDate);
