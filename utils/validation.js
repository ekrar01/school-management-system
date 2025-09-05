import {
    ALLOWED_FILE_TYPES,
    MAX_FILE_SIZE,
    VALIDATION_MESSAGES
} from '../config/constants';

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (basic)
export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(phone);
};

// File validation
export const validateFile = (file) => {
  if (!file) return null;
  
  if (file.size > MAX_FILE_SIZE) {
    return VALIDATION_MESSAGES.FILE_SIZE;
  }
  
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return VALIDATION_MESSAGES.FILE_TYPE;
  }
  
  return null;
};

// Form validation rules
export const validationRules = {
  name: {
    required: VALIDATION_MESSAGES.REQUIRED,
    minLength: {
      value: 2,
      message: VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', '2')
    }
  },
  address: {
    required: VALIDATION_MESSAGES.REQUIRED,
    minLength: {
      value: 5,
      message: VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', '5')
    }
  },
  city: {
    required: VALIDATION_MESSAGES.REQUIRED,
    minLength: {
      value: 2,
      message: VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', '2')
    }
  },
  state: {
    required: VALIDATION_MESSAGES.REQUIRED,
    minLength: {
      value: 2,
      message: VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', '2')
    }
  },
  contact: {
    required: VALIDATION_MESSAGES.REQUIRED,
    minLength: {
      value: 10,
      message: VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', '10')
    },
    validate: (value) => isValidPhone(value) || 'Please enter a valid phone number'
  },
  email_id: {
    required: VALIDATION_MESSAGES.REQUIRED,
    validate: (value) => isValidEmail(value) || VALIDATION_MESSAGES.EMAIL
  }
};