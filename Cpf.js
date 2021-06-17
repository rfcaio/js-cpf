const InvalidCpfError = require('./invalid-cpf-error')
const { getVerifyDigitFrom } = require('./utils')

const CPF_DIGIT_GROUPS = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
const CPF_FORMAT = /^\d{11}$/
const EQUAL_DIGITS_CPF = /^(\d)\1{10}$/

class Cpf {
  constructor (value) {
    if (typeof value !== 'string') {
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
    return getVerifyDigitFrom(firstNineDigits) !== firstVerifyDigit
  }

  _hasSecondVerifyDigitNotValid (value) {
    const secondVerifyDigit = value.slice(-1)
    const firstTenDigits = value.slice(0, 10)
    return getVerifyDigitFrom(firstTenDigits) !== secondVerifyDigit
  }

  format () {
    return this._value.replace(CPF_DIGIT_GROUPS, '$1.$2.$3-$4')
  }

  get value () {
    return this._value
  }
}

module.exports = Cpf
