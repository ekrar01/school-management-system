import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { query } from '../../../lib/db';

// Configure multer for file uploads differently based on environment
let upload;

if (process.env.NODE_ENV === 'production') {
  // In production, use memory storage (you can't save files to filesystem on Vercel)
  upload = multer({
    storage: multer.memoryStorage(), // Store file in memory instead of disk
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
} else {
  // Your existing multer configuration for local development
  upload = multer({
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
}

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
      let imagePath = null;

      // Handle file differently in production vs development
      if (process.env.NODE_ENV === 'production' && req.file) {
        // In production, you would upload to cloud storage here
        // For now, we'll just store a placeholder or skip image saving
        console.log('File upload received in production (not saved to cloud storage yet)');
        // imagePath = '/school-placeholder.jpg'; // Use a placeholder
      } else if (req.file) {
        // In development, use the local file path
        imagePath = `/school-images/${req.file.filename}`;
      }

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

      res.status(200).json({ 
        message: 'School added successfully', 
        id: result.insertId,
        // In production, you might want to return a different message about image handling
        ...(process.env.NODE_ENV === 'production' && req.file && {
          notice: 'Image not saved in production mode. Implement cloud storage for full functionality.'
        })
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}