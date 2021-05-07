class InvalidCpfError extends Error {
  constructor (...params) {
    super(...params)
    this.name = 'InvalidCpfError'
  }
}

module.exports = InvalidCpfError
