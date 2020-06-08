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
}

module.exports = Cpf
