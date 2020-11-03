'use strict'

const StringUtils = require('../src/graphql/util/StringUtils')
const expect = require('chai').expect

describe('StringUtils Tests', () => {
  describe('"isBlank"', () => {
    it('should return false for none-blank string', () => {
      expect(StringUtils.isBlank('none-blank string')).to.equal(false);
    })
    it('should return true for blank string', () => {
      expect(StringUtils.isBlank('  ')).to.equal(true);
    })
    it('should return true for empty string', () => {
      expect(StringUtils.isBlank('')).to.equal(true);
    })
  })
  describe('"isNotBlank"', () => {
    it('should return true for none-blank string', () => {
      expect(StringUtils.isNotBlank('none-blank string')).to.equal(true);
    })
    it('should return false for blank string', () => {
      expect(StringUtils.isNotBlank('  ')).to.equal(false);
    })
    it('should return false for empty string', () => {
      expect(StringUtils.isNotBlank('')).to.equal(false);
    })
  })
})
