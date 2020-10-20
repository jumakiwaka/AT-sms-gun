/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const path = require('path');
const smsFactory = require('../../command/blast');

describe('Blast users', () => {
  before(() => {
    sinon.stub(console, 'log');
    sinon.stub(smsFactory, 'sendMessages').callsFake((path) => {
      setTimeout(() => {
        console.log({
          SMSMessageData: {
            Message: 'Sent to 1/1 Total Cost: KES 8000',
            Recipients: [{}],
          },
        });
        return Promise.resolve();
      }, 2000);
    });
  });

  it('should blast messages to users given valid csv file [contact, message as header columns]', async () => {
    await smsFactory.blastUsers(path.join(__dirname, '../contacts.csv'));
    // smsGun.sendMessages([12334], 'hi');
    // const deliveryStatus = {
    //   SMSMessageData: {
    //     Message: 'Sent to 1/1 Total Cost: KES 8000',
    //     Recipients: [{}],
    //   },
    // };
    // expect(console.log.calledWith(deliveryStatus)).to.be.true;
    // expect(smsGun.sendMessages.calledWith([12334], 'h')).to.be.false;
  });

  after(() => {
    sinon.restore();
  });
});
