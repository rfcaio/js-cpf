/* eslint-env jest */

const getVerifyDigitFrom = require('./utils')

describe('getVerifyDigitFrom', () => {
  test('returns a verify digit of a numeric string', () => {
    expect(getVerifyDigitFrom('204222900')).toEqual('8')
  })

  test('returns "0" when checksum is greater than ten', () => {
    expect(getVerifyDigitFrom('200017400')).toEqual('0')
  })
})
