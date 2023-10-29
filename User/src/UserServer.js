const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const userRoutes = require('./UserRoutes');
const env = require('./loadEnvironment');
const logger = require('./Log');
const { MAX_CONNECTION_ATTEMPTS, CONNECTION_INTERVAL } = require('./constants');

logger.register({
  serviceName: 'User Service',
  logLevel: logger.LOG_LEVELS.all,
});

logger.log('Starting ...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.listen(env.USER_PORT, () => {
  logger.log(`Running on port: ${env.USER_PORT}`);
});

const checkMySqlConnection = async () => {
  const pool = mysql.createPool({
    ...env.mysqlCreds,
    ...{ database: env.mysqlDbName },
  });

  let isMySqlRunning = false;

  for (let i = 0; i < MAX_CONNECTION_ATTEMPTS; i++) {
    try {
      // Attempt to connect to MySQL
      await pool.promise().query('SELECT display_name FROM users LIMIT 1;');
      isMySqlRunning = true;
      logger.logSuccess('Connected to MySQL database');
      break;
    } catch (err) {
      logger.error('MySQL connection error:', err);
      await new Promise((resolve) => setTimeout(resolve, CONNECTION_INTERVAL));
    }
  }

  if (!isMySqlRunning) {
    logger.error('Could not connect to MySQL. Exiting ...');
    process.exit(1);
  }

  pool.end();
};

checkMySqlConnection();
