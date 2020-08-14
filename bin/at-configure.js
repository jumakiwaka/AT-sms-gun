const program = require('commander');
const pkg = require('../package.json');
const { configAccount } = require('../command/configure');

program.version(pkg.version);

program
  .command('account')
  .description(
    'configure your africastalking account <API_KEY>, <username> and <senderId>'
  )
  .action(configAccount);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
