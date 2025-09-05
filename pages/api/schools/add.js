import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { query } from '../../../lib/db';

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = './public/school-images';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Use multer to handle file upload
  upload.single('image')(req, {}, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const { name, address, city, state, contact, email_id } = req.body;
      const imagePath = req.file ? `/school-images/${req.file.filename}` : null;

      // Validate required fields
      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email_id)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      // Insert into database
      const result = await query({
        query: 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        values: [name, address, city, state, contact, imagePath, email_id],
      });

      res.status(200).json({ message: 'School added successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}