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
