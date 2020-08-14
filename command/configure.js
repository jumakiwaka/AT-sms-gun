const inquirer = require('inquirer');
const Vault = require('../lib/Vault');
const util = require('../lib/util');

async function configAccount() {
  try {
    const creds = new Vault();
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiKey',
        message: 'Enter your africastalking API Key:',
        validate: util.notEmpty,
      },
      {
        type: 'input',
        name: 'username',
        message: 'Enter your africastalking app username:',
        validate: util.notEmpty,
      },
      {
        type: 'input',
        name: 'senderId',
        message: 'Enter your africastalking bulk sms senderId:',
        validate: util.notEmpty,
      },
    ]);
    await creds.setCredentials(
      answers.apiKey,
      answers.username,
      answers.senderId
    );
  } catch (error) {
    util.handleError(error);
  }
}

module.exports = {
  configAccount,
};
