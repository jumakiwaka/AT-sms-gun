const AfricasTalking = require('africastalking');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const Vault = require('../lib/Vault');
const util = require('../lib/util');

const readFile = promisify(fs.readFile);

const creds = new Vault();

const { apiKey, username, senderId } = creds.getCredentials();

const africasTalking = new AfricasTalking({
  username,
  apiKey,
});

const sms = africasTalking.SMS;

async function sendMessages(contact, msg) {
  try {
    const status = await sms.send({
      to: contact,
      message: msg,
      from: senderId,
    });
    console.log(status);
  } catch (error) {
    util.handleError(error);
  }
}

async function getBlastInfo(filePath) {
  try {
    const csvFile = path.resolve(filePath);
    const data = await readFile(csvFile, { encoding: 'utf8' });

    const rows = data.split('\n').filter((_) => _.length > 0); // get all rows with content

    const header = rows[0].split(',');
    const msgCol = header.findIndex((col) => col.trim() === 'message');
    const contactCol = header.findIndex((col) => col.trim() === 'contact');
    const body = rows.slice(1);

    const contacts = [];
    let msg;

    body.forEach((row) => {
      const rowData = row.split(',');
      let contact = rowData[contactCol].trim();
      const msgText = rowData[msgCol].trim();
      if (contact.startsWith('07')) {
        contact = '+2547'.concat(contact.substr(2));
      }
      if (msg === msgText) {
        contacts.push(`${contact}`);
      }
      if (!msg || msg !== msgText) {
        sendMessages(contact, msgText);
        msg = msgText;
      }
    });
    if (contacts[0]) {
      sendMessages(contacts, msg);
    }
  } catch (error) {
    util.handleError(error);
  }
}

function blastUsers(contactsFile) {
  getBlastInfo(contactsFile);
}

module.exports = { blastUsers };
