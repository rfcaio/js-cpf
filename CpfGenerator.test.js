/* eslint-env jest */

const randint = require('@rfcaio/randint')

const Cpf = require('.')
const CpfGenerator = require('./CpfGenerator')

jest.mock('@rfcaio/randint')

describe('CpfGenerator', () => {
  describe('generate', () => {
    test('returns a new instance of Cpf class with randomic value', () => {
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

      const cpfGenerator = new CpfGenerator()
      const cpf = cpfGenerator.generate()

      expect(cpf instanceof Cpf).toEqual(true)
      expect(cpf.value).toEqual('09516776329')
    })
  })
})
