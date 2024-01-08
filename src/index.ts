import { Font, woff2 } from 'fonteditor-core'
import type { FontEditor } from 'fonteditor-core'
import { stringToUnicodeNumbers, uniqueString } from './utils'

type FontTypeWithoutSVG = Exclude<FontEditor.FontType, 'svg'>

interface FontReadOptionsWithoutSVG extends Omit<FontEditor.FontReadOptions, 'type'> {
  type: FontTypeWithoutSVG
}

interface FontWriteOptionsWithoutSVG extends Omit<FontEditor.FontWriteOptions, 'type'> {
  type: Exclude<FontTypeWithoutSVG, 'otf'>
}

export interface IOptions {
  buffer: FontEditor.FontInput
  text: string
  readOptions: FontReadOptionsWithoutSVG // only support font type: ttf | woff | woff2 | eot | otf
  writeOptions: FontWriteOptionsWithoutSVG // only support font type: ttf | woff | woff2 | eot
}

export default async function minify(options: IOptions) {
  if ([options.readOptions.type, options.writeOptions.type].includes('woff2')) {
    await woff2.init()
  }

  const unique = uniqueString(options.text)
  const unicodes = stringToUnicodeNumbers(unique)
  if (Array.isArray(options.readOptions.subset)) {
    options.readOptions.subset.push(...unicodes)
  }
  else {
    options.readOptions.subset = unicodes
  }
  const font = Font.create(options.buffer, options.readOptions)

  const buffer = font.write({ ...options.writeOptions, toBuffer: true })

  return buffer
}
