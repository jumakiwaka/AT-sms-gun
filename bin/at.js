#! /usr/bin/env node

const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify({ isGlobal: true });
program
  .version(pkg.version)
  .command('configure', 'Add your configurations for use with the app')
  .parse(process.argv);
