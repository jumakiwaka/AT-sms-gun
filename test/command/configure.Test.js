const { expect } = require('chai');
const sinon = require('sinon');
const inquirer = require('inquirer');
const ConfigStore = require('configstore');
const Vault = require('../../lib/Vault');
const configure = require('../../command/configure');

describe('Configure account', () => {
  const creds = {};
  let vault;
  let sandbox;

  before(() => {
    // create a vault
    vault = new Vault();
    // stub configstore set method
    sinon.stub(ConfigStore.prototype, 'set').callsFake((key, value) => {
      creds[key] = value;
    });
    // stub configstore get method
    sinon.stub(ConfigStore.prototype, 'get').callsFake((key) => creds[key]);
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  it('should create new account credentials when none are available', async () => {
    sandbox.stub(inquirer, 'prompt').resolves({
      apiKey: 'amju_syhwywiash',
      username: 'test_account',
      senderId: 'test22',
    });
    await configure.configAccount();
    const setCreds = vault.getCredentials();
    expect(creds.AT_API_KEY).to.equal(setCreds.apiKey);
    expect(creds.AT_USERNAME).to.equal(setCreds.username);
    expect(creds.AT_SENDER_ID).to.equal(setCreds.senderId);
  });

  it('should override existing account credentials with the set ones', async () => {
    sandbox.stub(inquirer, 'prompt').resolves({
      apiKey: 'ssshkskajujuaksjs',
      username: 'test_account2',
      senderId: 'test23',
    });
    await configure.configAccount();
    const setCreds = vault.getCredentials();
    expect(creds.AT_API_KEY).to.equal(setCreds.apiKey);
    expect(creds.AT_USERNAME).to.equal(setCreds.username);
    expect(creds.AT_SENDER_ID).to.equal(setCreds.senderId);
  });
  afterEach(() => {
    sandbox.restore();
  });
});
