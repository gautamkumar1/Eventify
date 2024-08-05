const mysql = require('mysql2/promise');

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.end();
};

createDatabase().then(() => {
  console.log('Database checked/created successfully.');
  process.exit(0);
}).catch(err => {
  console.error('Error creating database:', err);
  process.exit(1);
});

module.exports = createDatabase;