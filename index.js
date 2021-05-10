const randint = require('@rfcaio/randint')

const InvalidCpfError = require('./InvalidCpfError')

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

  format () {
    return this._value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
  }

  static generate () {
    const value = Array.from({ length: 9 }, () => `${randint()}`).join('')
    return Cpf._generate(value)
  }

  get value () {
    return this._value
  }

  static _generate (value) {
    if (value.length === 11) {
      return value
    }
    return Cpf._generate(value + Cpf._getVerifyDigit(value))
  }

  static _getVerifyDigit (value) {
    let sum = 0
    for (let i = 0, size = value.length; i < size; i += 1) {
      sum += parseInt(value[i], 10) * (size + 1 - i)
    }
    const factor = sum % 11
    return `${factor % 11 >= 2 ? 11 - factor : 0}`
  }
}

module.exports = Cpf
