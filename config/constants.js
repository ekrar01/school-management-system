// Application constants
export const APP_NAME = 'School Management System';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// Database constants
export const DB_TABLES = {
  SCHOOLS: 'schools'
};

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  MIN_LENGTH: 'Must be at least {min} characters',
  FILE_TYPE: 'Please upload an image file (JPEG, PNG, GIF, WEBP)',
  FILE_SIZE: 'File size must be less than 5MB'
};

// API routes
export const API_ROUTES = {
  SCHOOLS: '/api/schools',
  ADD_SCHOOL: '/api/schools/add'
};