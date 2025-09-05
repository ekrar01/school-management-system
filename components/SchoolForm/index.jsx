import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../styles/SchoolForm.module.css';

export default function SchoolForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      
      if (data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const response = await axios.post('/api/schools/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({ type: 'success', text: 'School added successfully!' });
      reset();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'An error occurred while adding the school' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className="card p-6">
        <h2 className={`text-center mb-6 ${styles.formTitle}`}>Add New School</h2>
        
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">School Name</label>
            <input
              id="name"
              className="form-input"
              {...register('name', { required: 'School name is required' })}
              placeholder="Enter school name"
            />
            {errors.name && <span className="form-error">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              id="address"
              className="form-input"
              {...register('address', { required: 'Address is required' })}
              placeholder="Enter school address"
            />
            {errors.address && <span className="form-error">{errors.address.message}</span>}
          </div>

          <div className="grid">
            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <input
                id="city"
                className="form-input"
                {...register('city', { required: 'City is required' })}
                placeholder="Enter city"
              />
              {errors.city && <span className="form-error">{errors.city.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state" className="form-label">State</label>
              <input
                id="state"
                className="form-input"
                {...register('state', { required: 'State is required' })}
                placeholder="Enter state"
              />
              {errors.state && <span className="form-error">{errors.state.message}</span>}
            </div>
          </div>

          <div className="grid">
            <div className="form-group">
              <label htmlFor="contact" className="form-label">Contact Number</label>
              <input
                id="contact"
                type="number"
                className="form-input"
                {...register('contact', { 
                  required: 'Contact number is required',
                  minLength: {
                    value: 10,
                    message: 'Contact number must be at least 10 digits'
                  }
                })}
                placeholder="Enter contact number"
              />
              {errors.contact && <span className="form-error">{errors.contact.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                {...register('email_id', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                placeholder="Enter email address"
              />
              {errors.email_id && <span className="form-error">{errors.email_id.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">School Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className={styles.fileInput}
              {...register('image')}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ width: '100%' }}
          >
            {isSubmitting ? 'Adding School...' : 'Add School'}
          </button>
        </form>
      </div>
    </div>
  );
}