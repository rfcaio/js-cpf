const InvalidCpfError = require('./InvalidCpfError')

const CPF_DIGIT_GROUPS = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
const CPF_FORMAT = /^\d{11}$/
const EQUAL_DIGITS_CPF = /^(\d)\1{10}$/

class Cpf {
  constructor (value) {
    if (this._hasInvalidType(value)) {
      throw new InvalidCpfError('Invalid CPF type.')
    }

    if (this._hasInvalidFormat(value)) {
      throw new InvalidCpfError('Invalid CPF format.')
    }

    if (this._hasEqualDigits(value)) {
      throw new InvalidCpfError('CPF with equal digits are invalid.')
    }

    if (this._hasInvalidVerifyDigits(value)) {
      throw new InvalidCpfError('Invalid CPF.')
    }

    this._value = value
  }

  _hasInvalidType (value) {
    return typeof value !== 'string'
  }

  _hasInvalidFormat (value) {
    return !CPF_FORMAT.test(value)
  }

  _hasEqualDigits (value) {
    return EQUAL_DIGITS_CPF.test(value)
  }

  _hasInvalidVerifyDigits (value) {
    return (
      this._hasFirstVerifyDigitNotValid(value) ||
      this._hasSecondVerifyDigitNotValid(value)
    )
  }

  _hasFirstVerifyDigitNotValid (value) {
    const firstVerifyDigit = value.slice(-2, -1)
    const firstNineDigits = value.slice(0, 9)
    return this._getVerifyDigitFrom(firstNineDigits) !== firstVerifyDigit
  }

  _hasSecondVerifyDigitNotValid (value) {
    const secondVerifyDigit = value.slice(-1)
    const firstTenDigits = value.slice(0, 10)
    return this._getVerifyDigitFrom(firstTenDigits) !== secondVerifyDigit
  }

  _getVerifyDigitFrom (value) {
    const checksumModEleven = this._getChecksumFrom(value) % 11
    return String(checksumModEleven % 11 >= 2 ? 11 - checksumModEleven : 0)
  }

  _getChecksumFrom (value) {
    let result = 0
    for (let i = 0, size = value.length; i < size; i += 1) {
      const coefficient = size + 1 - i
      const digit = parseInt(value[i], 10)
      result += coefficient * digit
    }
    return result
  }

  format () {
    return this._value.replace(CPF_DIGIT_GROUPS, '$1.$2.$3-$4')
  }

  get value () {
    return this._value
  }
}

module.exports = Cpf
