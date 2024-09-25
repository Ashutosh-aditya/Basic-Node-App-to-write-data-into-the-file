const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', (req, res) => {
    const message = req.body.message;
    
    fs.appendFile('messages.txt', message + '\n', (err) => {
        if (err) {
            return res.status(500).send('Error saving message.');
        }
        res.send('Message saved successfully!');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
