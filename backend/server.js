const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load database
const DB_FILE = './db.json';

function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Routes
app.get('/notes', (req, res) => {
    const data = readDB();
    res.json(data);
});

app.post('/notes', (req, res) => {
    const { date, note } = req.body;
    if (!date || !note) {
        return res.status(400).json({ message: 'Date and note are required.' });
    }

    const data = readDB();
    if (!data[date]) {
        data[date] = [];
    }
    data[date].push(note);
    writeDB(data);

    res.status(201).json({ message: 'Note added successfully.' });
});

app.delete('/notes', (req, res) => {
    const { date, note } = req.body;
    const data = readDB();

    if (!data[date]) {
        return res.status(404).json({ message: 'No notes found for this date.' });
    }

    data[date] = data[date].filter(n => n !== note);
    writeDB(data);

    res.json({ message: 'Note deleted successfully.' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
