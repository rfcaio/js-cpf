const Cpf = require('./Cpf')

const { generateNineDigits, getVerifyDigitFrom } = require('./utils')

class CpfGenerator {
  generate () {
    const firstNineDigits = generateNineDigits()
    const firstVerifyDigit = getVerifyDigitFrom(firstNineDigits)
    const secondVerifyDigit = getVerifyDigitFrom(
      firstNineDigits + firstVerifyDigit
    )
    return new Cpf(firstNineDigits + firstVerifyDigit + secondVerifyDigit)
  }
}

module.exports = CpfGenerator
