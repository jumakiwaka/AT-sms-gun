const chalk = require('chalk');

const handleError = (err) => {
  console.error(chalk.redBright(err));
  process.exitCode = 1;
};

const notEmpty = (input) => (input === '' ? 'This value is required' : true);

module.exports = { handleError, notEmpty };
