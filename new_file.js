const express = require('express');
const { Pool } = require('pg');
const {axios} = require('axios');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'logindata',
  password: 'Ideelit@2023',
  port: 5432,
});

app.get('/loginuser', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM loginuser');
    const users = result.rows;
    res.json(users);
    client.release();
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
