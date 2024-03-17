const  express = require('express');
const  cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const upload = multer()


const  app = express();
app.use(express.static('public'));
app.use(express.json()); // Parse JSON bodies (for API requests)
app.use(express.urlencoded({ extended: true }));

app.use(cors());
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