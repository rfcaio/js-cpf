const randint = require('@rfcaio/randint')

const Cpf = require('./Cpf')

const { getVerifyDigitFrom } = require('./utils')

class CpfGenerator {
  generate () {
    const firstNineDigits = this._getFirstNineDigits()
    const firstVerifyDigit = getVerifyDigitFrom(firstNineDigits)
    const secondVerifyDigit = getVerifyDigitFrom(
      firstNineDigits + firstVerifyDigit
    )
    return new Cpf(firstNineDigits + firstVerifyDigit + secondVerifyDigit)
  }

  _getFirstNineDigits () {
    let result = ''
    for (let i = 0; i < 9; i += 1) {
      result += String(randint())
    }
    return result
  }
}

module.exports = CpfGenerator
