import pg from 'pg'
const { Pool } = pg
 
const pool = new Pool({
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT!), 
});

export default pool.connect();
