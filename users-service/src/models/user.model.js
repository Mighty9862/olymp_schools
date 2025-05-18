import pool from '../config/pool.js';

export const createUser = async (
  email,
  firstName,
  patronymic,
  lastName,
  dateOfBirth,
  phone,
  region,
  city,
  institute,
  gender,
  class_name) => {
  const result = await pool.query(
    'INSERT INTO users(email, firstName, patronymic, lastName, dateOfBirth, phone, region, city, institute, gender, class_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, email',
    [email,
    firstName,
    patronymic,
    lastName,
    dateOfBirth,
    phone,
    region,
    city,
    institute,
    gender,
    class_name]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};