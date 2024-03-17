const express = require('express');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Multer configuration for file upload
const storage = multer.memoryStorage(); // Storing files in memory
const upload = multer({ storage: storage });

// Serving the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// File upload and metadata route
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    // Checking if file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Sending file information in the response
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
