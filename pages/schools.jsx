import axios from 'axios';
import { useEffect, useState } from 'react';
import SchoolCard from '../components/SchoolCard';

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/schools');
        setSchools(response.data.schools);
      } catch (err) {
        setError('Failed to load schools');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) return (
    <div className="container">
      <div className="text-center">
        <h2 className="mb-4">Loading Schools...</h2>
        <div style={{ fontSize: '48px' }}>📚</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container">
      <div className="text-center">
        <h2 className="mb-4">Error</h2>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h2 className="text-center mb-6">Our Schools</h2>
      
      {schools.length === 0 ? (
        <div className="text-center">
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🏫</div>
          <h3 className="mb-4">No schools found</h3>
          <p>Be the first to add a school to our directory!</p>
          <a href="/add-school" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Add School
          </a>
        </div>
      ) : (
        <div className="grid">
          {schools.map(school => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  );
}