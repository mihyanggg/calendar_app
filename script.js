const apiURL = 'http://localhost:3000';

async function fetchNotes(date) {
  const res = await fetch(`${apiURL}/notes`);
  const data = await res.json();
  return data[date] || [];
}

async function addNoteToAPI(date, note) {
  await fetch(`${apiURL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, note }),
  });
}

async function deleteNoteFromAPI(date, note) {
  await fetch(`${apiURL}/notes`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, note }),
  });
}

function generateCalendar(year, month) {
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = '';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.innerText = day;
    calendar.appendChild(dayDiv);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    calendar.appendChild(emptyDiv);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    dateDiv.innerText = i;

    const date = `${year}-${month + 1}-${i}`;
    dateDiv.addEventListener('click', async () => {
      const notes = await fetchNotes(date);
      renderNotes(date, notes);
    });

    calendar.appendChild(dateDiv);
  }
}

function renderNotes(date, notes) {
  const notesDiv = document.getElementById('notes');
  notesDiv.innerHTML = `<h3>${date}</h3>`;
  notes.forEach(note => {
    const noteItem = document.createElement('div');
    noteItem.innerText = note;

    noteItem.addEventListener('click', async () => {
      await deleteNoteFromAPI(date, note);
      const updatedNotes = await fetchNotes(date);
      renderNotes(date, updatedNotes);
    });

    notesDiv.appendChild(noteItem);
  });

  const noteInput = document.getElementById('note-input');
  const addNoteBtn = document.getElementById('add-note');
  addNoteBtn.onclick = async () => {
    if (noteInput.value.trim()) {
      await addNoteToAPI(date, noteInput.value);
      const updatedNotes = await fetchNotes(date);
      renderNotes(date, updatedNotes);
      noteInput.value = '';
    }
  };
}

const today = new Date();
generateCalendar(today.getFullYear(), today.getMonth());
