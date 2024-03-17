const  express = require('express');
const  app = express();

const  cors = require('cors');
require('dotenv').config()

app.use (express.json())
app.use(express.static('public'));
app.use(cors());

const multer = require('multer');
const upload = multer(;

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  return res.status(200).json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});