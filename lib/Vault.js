const ConfigStore = require('configstore');
const pkg = require('../package.json');

class Vault {
  constructor() {
    this.config = new ConfigStore(pkg.name);
    this.apiKey = 'AT_API_KEY';
    this.username = 'AT_USERNAME';
    this.senderId = 'AT_SENDER_ID';
  }

  setCredentials(key, username, senderId) {
    this.config.set(this.apiKey, key);
    this.config.set(this.username, username);
    this.config.set(this.senderId, senderId);
  }

  getCredentials() {
    const creds = {
      apiKey: this.config.get(this.apiKey),
      username: this.config.get(this.username),
      senderId: this.config.get(this.senderId),
    };
    return creds;
  }
}

module.exports = Vault;
