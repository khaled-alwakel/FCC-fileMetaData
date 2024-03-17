var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
app.use (express.json())

const multer = require('multer');

// Set up multer storage and file filter
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // You can implement your file type validation logic here
    cb(null, true);
  }
});

app.use(express.static('public'));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract file information from req.file
  const { originalname, mimetype, size } = req.file;
c
  // Send a JSON response with file information
  return res.json({
    filename: originalname,
    type: mimetype,
    size: size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
