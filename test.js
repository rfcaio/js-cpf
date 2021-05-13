/* eslint-env jest */

const randint = require('@rfcaio/randint')

const Cpf = require('.')
const InvalidCpfError = require('./InvalidCpfError')

jest.mock('@rfcaio/randint')

describe('Cpf', () => {
  test('throws an error when a CPF is not a string', () => {
    const createCpfWithInvalidType = () => new Cpf(20422290084)

    expect(createCpfWithInvalidType).toThrowError(InvalidCpfError)
    expect(createCpfWithInvalidType)
      .toThrowError('Invalid CPF type.')
  })

  test('throws an error when a CPF has an invalid format', () => {
    const createCpfLessThanElevenDigits = () => new Cpf('2042229008')
    const createCpfGreaterThanElevenDigits = () => new Cpf('204222900840')

    expect(createCpfLessThanElevenDigits)
      .toThrowError(InvalidCpfError)
    expect(createCpfLessThanElevenDigits)
      .toThrowError('Invalid CPF format.')

    expect(createCpfGreaterThanElevenDigits)
      .toThrowError(InvalidCpfError)
    expect(createCpfGreaterThanElevenDigits)
      .toThrowError('Invalid CPF format.')
  })

  test('throws an error when a CPF has equal digits', () => {
    const createCpfWithEqualDigits = () => new Cpf('00000000000')

    expect(createCpfWithEqualDigits).toThrowError(InvalidCpfError)
    expect(createCpfWithEqualDigits)
      .toThrowError('CPF with equal digits are invalid.')
  })

  test('throws an error when first verify digit is invalid', () => {
    const createCpfWithFirstVerifyDigitInvalid = () => new Cpf('09516776300')

    expect(createCpfWithFirstVerifyDigitInvalid)
      .toThrowError(InvalidCpfError)
    expect(createCpfWithFirstVerifyDigitInvalid)
      .toThrowError('Invalid CPF.')
  })

  test('throws an error when second verify digit is invalid', () => {
    const createCpfWithSecondVerifyDigitInvalid = () => new Cpf('09516776320')

    expect(createCpfWithSecondVerifyDigitInvalid)
      .toThrowError(InvalidCpfError)
    expect(createCpfWithSecondVerifyDigitInvalid)
      .toThrowError('Invalid CPF.')
  })

  test('not throws an error when CPF is valid', () => {
    const createValidCpf = () => new Cpf('20001740008')
    expect(createValidCpf).not.toThrowError(InvalidCpfError)
  })

  describe('format', () => {
    test('formats a valid CPF instance', () => {
      const cpf = new Cpf('20422290084')
      expect(cpf.format()).toEqual('204.222.900-84')
    })
  })

  describe('generate', () => {
    test('return a randomic cpf', () => {
      randint
        .mockName('randint')
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(9)
        .mockReturnValueOnce(5)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(6)
        .mockReturnValueOnce(7)
        .mockReturnValueOnce(7)
        .mockReturnValueOnce(6)
        .mockReturnValueOnce(3)

      expect(Cpf.generate()).toEqual('09516776329')
    })
  })
})
