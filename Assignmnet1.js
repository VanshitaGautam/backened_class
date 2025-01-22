const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

//p.use(express.json());
//p.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const logDetails = {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        url: req.originalUrl,
        protocol: req.protocol,
        method: req.method,
        hostname: req.hostname,
    };

    const logMessage = JSON.stringify(logDetails) + '\n';

    const logFilePath = path.join(__dirname, 'requests.log');
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });

    next(); 
});
app.get('/', (req, res) => {
    res.send('Welcome to the Express Logger!');
});
app.get('/about', (req, res) => {
    res.send('This is the About page.');
});

app.listen(PORT, () => {
    console.log("server running");
});