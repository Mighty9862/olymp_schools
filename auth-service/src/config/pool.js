import { Pool } from 'pg';
import dbConfig from './db.config.js';

const pool = new Pool(dbConfig);

// Проверка подключения
pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch(err => {
    console.error('❌ Connection failed:', err);
    process.exit(1);
  });

export default pool;