const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
  database: 'jazzy_ajax',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
  console.log('connected!');
});

pool.on('error', () => {
  console.log('Whoops!', error);
});

module.exports = pool;
