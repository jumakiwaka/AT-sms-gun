const chalk = require('chalk');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const AfricasTalking = require('africastalking');
const Vault = require('./Vault');

const readFile = promisify(fs.readFile);

const creds = new Vault();
const { apiKey, username, senderId } = creds.getCredentials();

const africasTalking = new AfricasTalking({
  username,
  apiKey,
});

const sms = africasTalking.SMS;

const handleError = (err) => {
  console.error(chalk.redBright(err));
  process.exitCode = 1;
};

const notEmpty = (input) => (input === '' ? 'This value is required' : true);

const getBlastInfo = async (csvFilePath) => {
  try {
    const csvFile = path.resolve(csvFilePath);
    const data = await readFile(csvFile, { encoding: 'utf8' });
    const rows = data
      .split(/(?!\B"[^"]*)\n(?![^"]*"\B)/)
      .filter((_) => _.length > 0); // get all rows with content

    const header = rows[0].split(',');
    const msgCol = header.findIndex((col) => col.trim() === 'message');
    const contactCol = header.findIndex((col) => col.trim() === 'contact');
    const body = rows.slice(1);

    return { body, msgCol, contactCol };
  } catch (error) {
    return error;
  }
};

const sendMessages = async (contact, msg) => {
  try {
    const status = await sms.send({
      to: contact,
      message: msg,
      from: senderId,
    });
    return status;
  } catch (error) {
    return error;
  }
};

const formatPhoneNumber = (phoneNumber) => {
  let formattedPhoneNumber = phoneNumber;
  if (phoneNumber.startsWith('07')) {
    formattedPhoneNumber = '+2547'.concat(phoneNumber.substr(2));
  } else if (phoneNumber.startsWith('7')) {
    formattedPhoneNumber = '+2547'.concat(phoneNumber.substr(1));
  }
  return formattedPhoneNumber;
};

module.exports = {
  handleError,
  formatPhoneNumber,
  notEmpty,
  getBlastInfo,
  sendMessages,
};
