const CPF_REGEX = /^\d{11}$/

class Cpf {
  constructor (value) {
    if (typeof value !== 'string') {
      throw TypeError()
    }

    if (!CPF_REGEX.test(value)) {
      throw Error()
    }

    this._value = value
  }

  get value () {
    return this._value
  }

  set value (value) {
    throw new Error()
  }

  static isValid (cpf) {
    const EQUAL_DIGITS_CPFS = Array.from({ length: 10 }, (_, i) => i.toString().repeat(11))
    if (EQUAL_DIGITS_CPFS.includes(cpf)) {
      return false
    }
    return true
  }
}

module.exports = Cpf
