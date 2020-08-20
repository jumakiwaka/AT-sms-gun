const { expect } = require('chai');
const chalk = require('chalk');
const util = require('../../lib/util');

describe('Utility funcs', () => {
  const consoles = [];
  before(() => {
    console.error = (err) => {
      consoles.push(err);
    };
    util.handleError(new Error('this is a test error'));
  });

  describe('Exiting with an error', () => {
    it('should exit with a redbright error message', () => {
      expect(consoles[0]).to.equal(
        chalk.redBright('Error: this is a test error')
      );
    });
  });

  describe('check if input is empty', () => {
    it('it should return an error msg when empty and true otherwise', () => {
      expect(util.notEmpty('')).to.equal('This value is required');
      // eslint-disable-next-line no-unused-expressions
      expect(util.notEmpty(' ')).to.be.true;
    });
  });
});
