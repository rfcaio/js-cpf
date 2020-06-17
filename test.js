/* eslint-env jest */

const randint = require('@rfcaio/randint')

const Cpf = require('.')

jest.mock('@rfcaio/randint')

describe('Cpf', () => {
  describe('constructor', () => {
    test('throw a TypeError if cpf is not a string', () => {
      expect(() => new Cpf(20422290084)).toThrowError(TypeError)
      expect(() => new Cpf(20422290084))
        .toThrowError('Could not create a CPF with invalid type.')
    })

    test('throw an Error if cpf is not an eleven character numeric string', () => {
      expect(() => new Cpf('204.222.900-84')).toThrowError(Error)
      expect(() => new Cpf('204.222.900-84'))
        .toThrowError('Could not create an invalid CPF.')
    })

    test('create a new cpf', () => {
      expect(new Cpf('20422290084')).toEqual({ _value: '20422290084' })
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
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(4)
        .mockReturnValue(7)

      expect(Cpf.generate()).toEqual('11144477735')
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
    test('return false if cpf has eleven equal digits', () => {
      expect(Cpf.isValid('00000000000')).toBeFalsy()
    })

    test('return false if cpf is not validated internally', () => {
      expect(Cpf.isValid('20422290080')).toBeFalsy()
    })

    test('return true if cpf is validated internally', () => {
      expect(Cpf.isValid('20422290084')).toBeTruthy()
    })
  })
})
