const randint = require('@rfcaio/randint')

const NINE_EQUAL_DIGITS = /^(\d)\1{8}$/

/* TODO: create test for recursion */
const generateNineDigits = () => {
  let result = ''
  for (let i = 0; i < 9; i += 1) {
    result += String(randint())
  }
  return hasNineEqualDigits(result) ? generateNineDigits() : result
}

const hasNineEqualDigits = (value) => {
  return NINE_EQUAL_DIGITS.test(value)
}

const getVerifyDigitFrom = (value) => {
  const checksumModEleven = getChecksumFrom(value) % 11
  return String(checksumModEleven % 11 >= 2 ? 11 - checksumModEleven : 0)
}

const getChecksumFrom = (value) => {
  let result = 0
  for (let i = 0, size = value.length; i < size; i += 1) {
    const coefficient = size + 1 - i
    const digit = parseInt(value[i], 10)
    result += coefficient * digit
  }
  return result
}

module.exports = { generateNineDigits, getVerifyDigitFrom }
