const util = require('../lib/util');

async function blastUsers(contactsFile) {
  try {
    const blastInfo = await util.getBlastInfo(contactsFile);
    if (blastInfo instanceof Error) {
      throw blastInfo;
    }

    /**
     * Loops throw every row(containing contact and messages) and send messages to all contacts
     * When a contact starts with 07 or 7 it(the 7 or 07) will be replaced with +2547
     * When a message is same for all contacts, just concatinates the contacts into an array and
     * calls AfricasTalking once, else call AT api for every row. As such a csv might have a list of
     * contacts and only one message corresponding to the first contact i.e
     * +2547xxxx, 'Mteja mpedwa....',
     * +2547xxxx, '',
     * etc.
     */

    const { body, contactCol, msgCol } = blastInfo;

    let contacts = [];
    let msg;
    const promises = [];

    // loading anime
    let isVertical = true;

    body.forEach((row) => {
      const rowData = row.split(/(?!\B"[^"]*),(?![^"]*"\B)/);

      let contact = rowData[contactCol].trim();
      const msgText = rowData[msgCol].trim().slice(1, -1);

      contact = util.formatPhoneNumber(contact);

      if (contact && (msg === msgText || (!msgText && msg))) {
        contacts.push(`${contact}`);
      }
      if (msg !== msgText && msgText) {
        // msg is not equal to msgText and msgText is not an empty string

        promises.push(util.sendMessages(contact, msgText));
        // status.concat();
        if (contacts[0]) {
          contacts = [];
        }
        msg = msgText;
      }
    });

    promises.push(util.sendMessages(contacts, msg));
    const deliveryStatus = await Promise.all(promises);

    console.log(deliveryStatus);
  } catch (error) {
    util.handleError(error);
  }
}

module.exports = { blastUsers };
