/* eslint-env jest */

const Cpf = require('.')

describe('Cpf', () => {
  describe('constructor', () => {
    test('throw a TypeError if cpf is not a string', () => {
      expect(() => new Cpf(20422290084)).toThrowError(TypeError)
    })

    test('throw an Error if cpf is not an eleven character numeric string', () => {
      expect(() => new Cpf('204.222.900-84')).toThrowError(Error)
    })

    test('create a new cpf', () => {
      expect(new Cpf('20422290084')).toEqual({ _value: '20422290084' })
    })
  })
})
