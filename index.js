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

  static _getVerifyDigit (cpf) {
    const digitSum =
      Array
        .from(cpf)
        .reduce(
          (sum, digit, index) => (
            sum + parseInt(digit, 10) * (cpf.length + 1 - index)
          ), 0
        )
    const factor = digitSum % 11
    return `${factor > 2 ? 11 - factor : 0}`
  }

  static isValid (cpf) {
    const EQUAL_DIGITS_CPFS =
      Array.from({ length: 10 }, (_, i) => i.toString().repeat(11))

    if (EQUAL_DIGITS_CPFS.includes(cpf)) {
      return false
    }
    const firstNineDigits = cpf.slice(0, 9)
    const firstCheckDigit = Cpf._getVerifyDigit(firstNineDigits)
    const secondCheckDigit =
      Cpf._getVerifyDigit(firstNineDigits + firstCheckDigit)
    return cpf === firstNineDigits + firstCheckDigit + secondCheckDigit
  }
}

module.exports = Cpf
