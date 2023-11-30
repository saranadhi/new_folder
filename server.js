app.put('/userdetails', async (req, res) => {
  try {
    const { id, details } = req.body;
    const client = await pool.connect();
    const updateFields = Object.entries(details)
      .map(([key, value]) => `"${key}" = $${key}`)
      .join(', ');

    const result = await client.query(
      `UPDATE userdetails SET ${updateFields} WHERE username = $1`,
      [id]
    );

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
