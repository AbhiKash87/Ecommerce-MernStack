const chalk = require('chalk');

const sessionLogger = (req, res, next) => {
  console.log(chalk.cyan('--- Incoming Request ---')); // Informative cyan

  // Log Authorization Header
  console.log(chalk.magenta('Authorization Header:'), req.headers.authorization ? chalk.green(req.headers.authorization) : chalk.gray('Not present')); // Green for presence, gray for absence

  // Log Query Params with optional filtering
  console.log(chalk.magenta('Query Params:'));
  const filteredQuery = Object.fromEntries(
    Object.entries(req.query).filter(([key]) => !key.startsWith('_')) // Filter out potentially sensitive query params starting with an underscore
  );
  console.log(chalk.green(JSON.stringify(filteredQuery, null, 2))); // Pretty-print JSON in green

  // Log Body with optional redaction (customize logging in production)
  console.log(chalk.magenta('Body:'));
  if (process.env.NODE_ENV === 'production') {
    console.log(chalk.gray('Body logging disabled in production for security reasons')); // Gray for security emphasis
  } else {
    // Redact sensitive properties (customize as needed)
    
    console.log(chalk.green(JSON.stringify(req.body, null, 2))); // Pretty-print JSON in green
  }

  console.log(chalk.cyan('------------------------')); // Closing line in cyan
  next();
};

module.exports = { sessionLogger };
