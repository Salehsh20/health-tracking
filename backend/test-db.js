import pool from './config/database.js';

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('✓ Connected to MySQL');
    
    // Check if database exists
    const [databases] = await connection.query("SHOW DATABASES LIKE 'healthtrack_db'");
    if (databases.length === 0) {
      console.log('✗ Database healthtrack_db does not exist!');
      console.log('Please run the SQL script from database.sql');
      connection.release();
      return;
    }
    console.log('✓ Database healthtrack_db exists');
    
    // Check tables
    await connection.query('USE healthtrack_db');
    const [tables] = await connection.query('SHOW TABLES');
    console.log('✓ Tables found:', tables.map(t => Object.values(t)[0]));
    
    // Check users table structure
    const [usersCols] = await connection.query('DESCRIBE users');
    console.log('✓ Users table columns:', usersCols.map(c => c.Field));
    
    connection.release();
    console.log('\n✓ All checks passed! Database is ready.');
    
  } catch (error) {
    console.error('✗ Database test failed:', error.message);
  }
  
  process.exit(0);
}

testDatabase();
