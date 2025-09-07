import 'dotenv/config';

const requiredEnv = ['PG_HOST', 'PG_USER', 'PG_PASSWORD', 'PG_DATABASE'];
requiredEnv.forEach(env => {
  if (!process.env[env]) throw new Error(`Missing ${env} in .env`);
});

export default {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT || 5432,
  ssl: process.env.PG_SSL === 'true',
  max: 20,
  idleTimeoutMillis: 30000
};