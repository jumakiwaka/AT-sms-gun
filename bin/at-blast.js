const program = require('commander');
const pkg = require('../package.json');
const { blastUsers } = require('../command/blast');

program
  .version(pkg.version)
  .requiredOption(
    '-c, --contact-file <path>',
    'specify location of csv file with contacts and messages',
    blastUsers
  );

program.parse(process.argv);
