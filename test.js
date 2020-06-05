/* eslint-env jest */

const Cpf = require('.')

describe('Cpf', () => {
  describe('constructor', () => {
    test('throw a TypeError if cpf is not a string', () => {
      expect(() => new Cpf(20422290084)).toThrowError(TypeError)
    })

    test('create a new cpf', () => {
      expect(new Cpf('20422290084')).toEqual({ _value: '20422290084' })
    })
  })
})
