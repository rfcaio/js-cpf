/* eslint-env jest */

const randint = require('@rfcaio/randint')

const { generateNineDigits, getVerifyDigitFrom } = require('./utils')

jest.mock('@rfcaio/randint')

describe('generateNineDigits', () => {
  test('returns a string with nine randomic numbers', () => {
    randint
      .mockName('randint')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(9)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(6)
      .mockReturnValueOnce(7)
      .mockReturnValueOnce(7)
      .mockReturnValueOnce(6)
      .mockReturnValueOnce(3)

    expect(generateNineDigits()).toEqual('095167763')
  })
})

describe('getVerifyDigitFrom', () => {
  test('returns a verify digit of a numeric string', () => {
    expect(getVerifyDigitFrom('204222900')).toEqual('8')
  })

  test('returns "0" when checksum is greater than ten', () => {
    expect(getVerifyDigitFrom('200017400')).toEqual('0')
  })
})
