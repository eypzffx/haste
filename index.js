const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const { get } = require("./session"); 
const pair = require('./pair');
const qrCode = require('./qr');
const app = express();
const __path = process.cwd();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__path, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__path, '/public/index.html'));
});

app.get('/pair', (req, res) => {
    res.sendFile(path.join(__path, '/public/pair.html'));
});

app.get('/qr', (req, res) => {
    res.sendFile(path.join(__path, '/public/qr.html'));
});

app.get('/session', async (req, res) => {
    const q = req.query.q;

    if (!q) {
        return res.status(400).json({
            status: false,
            message: 'Query parameter "q" is required.'
        });
    }

    const splitQuery = q.split(';')[1];

    try {
        const result = await get(splitQuery); // Pass the first part to the `get` function
        res.json({
            status: true,
            result: result.content
        });
    } catch (error) {
        console.error('Error in /ringtone:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
});


app.use('/code', pair);
app.use('/qr-code', qrCode);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
