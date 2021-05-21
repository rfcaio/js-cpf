/* eslint-env jest */

const Cpf = require('./Cpf')
const CpfGenerator = require('./CpfGenerator')

require('./utils')

/* TODO: improve this mock implementation */
jest.mock('./utils', () => {
  return {
    generateNineDigits: jest.fn().mockReturnValue('095167763'),
    getVerifyDigitFrom: jest
      .fn()
      .mockReturnValueOnce('2')
      .mockReturnValueOnce('9')
  }
})

describe('CpfGenerator', () => {
  describe('generate', () => {
    test('returns a new instance of Cpf class with randomic value', () => {
      const cpfGenerator = new CpfGenerator()
      const cpf = cpfGenerator.generate()

      expect(cpf instanceof Cpf).toEqual(true)
      expect(cpf.value).toEqual('09516776329')
    })
  })
})
