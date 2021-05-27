/* eslint-env jest */

const Cpf = require('./Cpf')
const CpfGenerator = require('./CpfGenerator')

describe('CpfGenerator', () => {
  describe('generate', () => {
    test('returns a new instance of Cpf class with randomic value', () => {
      const cpfGenerator = new CpfGenerator()
      const cpf = cpfGenerator.generate()

      expect(cpf instanceof Cpf).toEqual(true)
    })
  })
})
