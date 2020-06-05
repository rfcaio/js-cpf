/* eslint-env jest */

const Cpf = require('.')

describe('Cpf', () => {
  describe('constructor', () => {
    test('create a new cpf', () => {
      expect(new Cpf(20422290084)).toEqual({ _value: 20422290084 })
    })
  })
})
