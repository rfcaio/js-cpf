class Cpf {
  constructor (value) {
    if (typeof value !== 'string') {
      throw TypeError()
    }

    this._value = value
  }
}

module.exports = Cpf
