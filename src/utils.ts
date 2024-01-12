export function uniqueString(str: string) {
  const uniqueChars = new Set(str)

  const uniqueString = [...uniqueChars].join('')

  return uniqueString
}

export function stringToUnicodeNumbers(str: string) {
  const unicodeNumbers = []
  for (let i = 0; i < str.length; i++) {
    const unicodeValue = str.charCodeAt(i)
    unicodeNumbers.push(unicodeValue)
  }
  return unicodeNumbers
}

export function handlerIconFont(text: string) {
  // support icon font
  const prefix = String.raw`&#[xX]|\\`
  const reg = new RegExp(`(${prefix})[0-9A-Fa-f]+`, 'g')
  const unicodeMatches = text.match(reg) || []

  const points = unicodeMatches.map((item) => {
    const prefixReg = new RegExp(`${prefix}`, 'g')
    item = item.replace(prefixReg, '')

    return Number.parseInt(item, 16)
  })

  return points
}
