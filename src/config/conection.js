import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gerenciamento_missoes',
  password: '194127',
  port: 5432,
});

export default pool;
