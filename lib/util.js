const chalk = require('chalk');

const handleError = (err) => console.error(chalk.redBright(err));

const notEmpty = (input) => (input === '' ? 'This value is required' : true);

module.exports = { handleError, notEmpty };
