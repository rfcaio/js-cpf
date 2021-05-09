const randint = require('@rfcaio/randint')

const InvalidCpfError = require('./InvalidCpfError')

const CPF_FORMAT = /^\d{11}$/

class Cpf {
  constructor (value) {
    if (this._hasInvalidCpfType(value)) {
      throw new InvalidCpfError('Invalid CPF type.')
    }

    if (this._hasInvalidCpfFormat(value)) {
      throw new InvalidCpfError('Invalid CPF format.')
    }

    if (!Cpf.isValid(value)) {
      throw Error('Could not create an invalid CPF.')
    }

    this._value = value
  }

  _hasInvalidCpfType (value) {
    return typeof value !== 'string'
  }

  _hasInvalidCpfFormat (value) {
    return !CPF_FORMAT.test(value)
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

  set value (value) {
    throw new Error('Could not set email value.')
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

  static isValid (value) {
    const CPFS_OF_EQUAL_DIGITS_REGEX = /^(\d)\1{10}$/

    if (CPFS_OF_EQUAL_DIGITS_REGEX.test(value)) {
      return false
    }

    return value === Cpf._generate(value.slice(0, 9))
  }
}

module.exports = Cpf
