const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/memories", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Define schema and model
const uploadSchema = new mongoose.Schema({
  title: String,
  text: String,
  image: String
});
const UploadData = mongoose.model('uploaddata', uploadSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST endpoint to handle uploads
app.post('/uploads', upload.single('image'), (req, res) => {
  const { title, text } = req.body;
  const image = req.file ? req.file.path : null;

  console.log('Received data:', { title, text, image }); // Log received data

  const newUpload = new UploadData({ title, text, image });
  newUpload.save()
    .then(() => {
      console.log('Data saved successfully'); // Log success
      res.json({ message: 'Data uploaded and saved successfully' });
    })
    .catch(err => {
      console.error('Error saving data:', err); // Log error
      res.status(400).json({ error: err.message });
    });
});

// GET endpoint to retrieve all uploads
app.get('/uploads', (req, res) => {
  UploadData.find()
    .then((uploads) => res.json(uploads))
    .catch((err) => {
      console.error('Error retrieving uploads:', err);
      res.status(500).json({ error: err.message });
    });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
