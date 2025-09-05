import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  let dbconnection;
  
  try {
    // For PlanetScale (production)
    if (process.env.DATABASE_URL) {
      dbconnection = await mysql.createConnection(process.env.DATABASE_URL);
    } 
    // For local development
    else {
      dbconnection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
      });
    }

    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
}