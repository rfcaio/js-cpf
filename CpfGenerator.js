const randint = require('@rfcaio/randint')

const Cpf = require('.')
const getVerifyDigitFrom = require('./utils')

class CpfGenerator {
  generate () {
    let firstNineRandomicDigits = ''
    for (let i = 0; i < 9; i += 1) {
      firstNineRandomicDigits += String(randint())
    }

    const firstVerifyDigit = getVerifyDigitFrom(firstNineRandomicDigits)
    const secondVerifyDigit = getVerifyDigitFrom(
      firstNineRandomicDigits + firstVerifyDigit
    )
    return new Cpf(firstNineRandomicDigits + firstVerifyDigit + secondVerifyDigit)
  }
}

module.exports = CpfGenerator
