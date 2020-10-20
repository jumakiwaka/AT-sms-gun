const program = require('commander');
const pkg = require('../package.json');
const smsGun = require('../command/blast');

program
  .version(pkg.version)
  .requiredOption(
    '-c, --contact-file <path>',
    'specify location of csv file with contacts and messages',
    smsGun.blastUsers
  );

program.parse(process.argv);
