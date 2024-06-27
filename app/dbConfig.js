const sql = require('mssql');

const config = {
  user: 'admin',
  password: 'admin',
  server: 'MATAR\\SQLEXPRESS',
  database: 'edutoons',
  options: {
    encrypt: true, 
    trustServerCertificate:true,
  },
  // port:1433
};

async function connectToDatabase() {
  try {
    let pool = await sql.connect(config);
    console.log('Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}
module.exports = {
  sql,
  connectToDatabase,
};