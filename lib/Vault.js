const ConfigStore = require('configstore');
const pkg = require('../package.json');

class Vault {
  constructor() {
    this.config = new ConfigStore(pkg.name);
    this.service = pkg.name;
  }

  setCredentials(key, username, senderId) {
    this.config.set('AT_API_KEY', key);
    this.config.set('AT_USERNAME', username);
    this.config.set('AT_SENDER_ID', senderId);
  }
}

module.exports = Vault;
