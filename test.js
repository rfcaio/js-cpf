/* eslint-env jest */

const randint = require('@rfcaio/randint')

const Cpf = require('.')
const InvalidCpfError = require('./InvalidCpfError')

jest.mock('@rfcaio/randint')

describe('Cpf', () => {
  describe('constructor', () => {
    test('throw a TypeError if cpf is not a string', () => {
      const createCpfWithInvalidType = () => new Cpf(20422290084)

      expect(createCpfWithInvalidType).toThrowError(TypeError)
      expect(createCpfWithInvalidType)
        .toThrowError('Could not create a CPF with invalid type.')
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

    test('throw an Error if cpf is not valid', () => {
      const spy = jest.spyOn(Cpf, 'isValid').mockReturnValue(false)
      expect(() => new Cpf('204.222.900-84')).toThrowError(Error)
      expect(() => new Cpf('204.222.900-84'))
        .toThrowError('Invalid CPF format.')
      spy.mockRestore()
    })
  })

  describe('format', () => {
    test('should format a valid cpf string', () => {
      const sut = new Cpf('20422290084')
      expect(sut.format()).toEqual('204.222.900-84')
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

  describe('value property', () => {
    test('throw an Error when trying to be setted', () => {
      const sut = new Cpf('20422290084')
      expect(() => {
        sut.value = '08250839072'
      }).toThrowError(Error)
      expect(() => {
        sut.value = '08250839072'
      }).toThrowError('Could not set email value.')
    })

    test('return cpf value', () => {
      const sut = new Cpf('20422290084')
      expect(sut.value).toEqual('20422290084')
    })
  })

  describe('isValid', () => {
    test('return false if cpf is not an eleven character numeric string', () => {
      const spy = jest.spyOn(RegExp.prototype, 'test')
      const sut = Cpf.isValid('5413469020')
      expect(spy).toHaveBeenCalledWith('5413469020')
      expect(sut).toBeFalsy()
    })

    test('return false if cpf has eleven equal digits', () => {
      expect(Cpf.isValid('00000000000')).toBeFalsy()
    })

    test('return false if cpf is not validated internally', () => {
      expect(Cpf.isValid('54134690201')).toBeFalsy()
    })

    test('return true if cpf is validated internally', () => {
      expect(Cpf.isValid('54134690200')).toBeTruthy()
    })
  })
})
