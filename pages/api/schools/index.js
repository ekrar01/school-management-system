import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const schools = await query({
      query: 'SELECT id, name, address, city, image FROM schools',
    });
    
    res.status(200).json({ schools });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}