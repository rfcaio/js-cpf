const getVerifyDigitFrom = (value) => {
  const checksumModEleven = getChecksumFrom(value) % 11
  return String(checksumModEleven % 11 >= 2 ? 11 - checksumModEleven : 0)
}

const getChecksumFrom = (value) => {
  let result = 0
  for (let i = 0, size = value.length; i < size; i += 1) {
    const coefficient = size + 1 - i
    const digit = parseInt(value[i], 10)
    result += coefficient * digit
  }
  return result
}

module.exports = { getVerifyDigitFrom }
