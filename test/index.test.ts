import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import crypto from 'node:crypto'
import type { Buffer } from 'node:buffer'
import { describe, expect, it } from 'vitest'
import minify from '../src/index'
import { version } from '../package.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TEST_STRING = `Font-Minify-${version} 你说，儿豁中国人不骗中国人`
const fontPath = join(__dirname, '../fonts/SmileySans-Oblique.ttf')
const buffer = fs.readFileSync(fontPath)

function getHash(buffer: Buffer) {
  return crypto.createHash('sha256')
    .update(buffer)
    .digest('hex')
}

const numberFormatter = new Intl.NumberFormat('en', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

/**
 * calculation of size
 * @param { number } byte
 * @returns display size
 */
export function displaySize(byte: number) {
  const ONE_MILLION = 1000000
  const ONE_THOUSAND = 1000

  if (byte >= ONE_MILLION) {
    const size = `${numberFormatter.format(byte / ONE_MILLION)} MB`
    return size
  }

  return `${numberFormatter.format(byte / ONE_THOUSAND)} kB`
}

describe('basic', () => {
  it('ttf', async () => {
    const ext = 'ttf'
    const newBuffer = await minify({
      buffer,
      text: TEST_STRING,
      readOptions: {
        type: ext,
      },
      writeOptions: {
        type: ext,
      },
    })

    const data = {
      hash: getHash(newBuffer),
      originSize: displaySize(buffer.length),
      newSize: displaySize(newBuffer.length),
    }

    expect(data).toMatchInlineSnapshot(`
      {
        "hash": "e21b047b299ae8bba8d97bc5d371a6d84ca1ae22117f0fd4bcbd93772d33b547",
        "newSize": "6.54 kB",
        "originSize": "2.10 MB",
      }
    `)
  })

  it('ttf 2 woff', async () => {
    const ext = 'ttf'
    const newBuffer = await minify({
      buffer,
      text: TEST_STRING,
      readOptions: {
        type: ext,
      },
      writeOptions: {
        type: 'woff',
      },
    })

    const data = {
      hash: getHash(newBuffer),
      originSize: displaySize(buffer.length),
      newSize: displaySize(newBuffer.length),
    }

    expect(data).toMatchInlineSnapshot(`
      {
        "hash": "08fcdc492bf789bdcbffc3f6c3183b41cd8cb287ba3257ad63e6476627c0ab6d",
        "newSize": "6.61 kB",
        "originSize": "2.10 MB",
      }
    `)
  })

  it('ttf 2 woff2', async () => {
    const ext = 'ttf'
    const newBuffer = await minify({
      buffer,
      text: TEST_STRING,
      readOptions: {
        type: ext,
      },
      writeOptions: {
        type: 'woff2',
      },
    })

    const data = {
      hash: getHash(newBuffer),
      originSize: displaySize(buffer.length),
      newSize: displaySize(newBuffer.length),
    }

    expect(data).toMatchInlineSnapshot(`
      {
        "hash": "474ccea891777f6fbc64eaf043eb664a71eacf2da15874d93d2c0bd8c38182b0",
        "newSize": "3.43 kB",
        "originSize": "2.10 MB",
      }
    `)
  })

  it('ttf 2 eot', async () => {
    const ext = 'ttf'
    const newBuffer = await minify({
      buffer,
      text: TEST_STRING,
      readOptions: {
        type: ext,
      },
      writeOptions: {
        type: 'eot',
      },
    })

    const data = {
      hash: getHash(newBuffer),
      originSize: displaySize(buffer.length),
      newSize: displaySize(newBuffer.length),
    }

    expect(data).toMatchInlineSnapshot(`
      {
        "hash": "49f8440f4e6cc17247874f8830c5cae2faf714e56b7da82ed1788b3525ca117b",
        "newSize": "6.74 kB",
        "originSize": "2.10 MB",
      }
    `)
  })

  it('otf 2 ttf', async () => {
    const fontPath = join(__dirname, '../fonts/SmileySans-Oblique.otf')
    const buffer = fs.readFileSync(fontPath)
    const ext = 'otf'
    const newBuffer = await minify({
      buffer,
      text: TEST_STRING,
      readOptions: {
        type: ext,
      },
      writeOptions: {
        type: 'ttf',
      },
    })

    const data = {
      hash: getHash(newBuffer),
      originSize: displaySize(buffer.length),
      newSize: displaySize(newBuffer.length),
    }

    expect(data).toMatchInlineSnapshot(`
      {
        "hash": "516149469cdf1d81807d99246bb9b1ac3086fe2cae43065dbf98dbf42c22bb87",
        "newSize": "6.84 kB",
        "originSize": "1.63 MB",
      }
    `)
  })
})
