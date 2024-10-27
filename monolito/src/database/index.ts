import pg from 'pg'
const { Pool } = pg
 
const pool = new Pool({
  database: 'db_monolito',
  user: 'my_user',
  password: 'my_password',
  host: 'localhost',
});

export default pool.connect();
