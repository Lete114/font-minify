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
describe('icon font', () => {
  const fontPath = join(__dirname, '../fonts/SmileySans-Oblique.ttf')
  const buffer = fs.readFileSync(fontPath)

  // 0123456789
  const unicodesHTML = '\\30\\31\\32\\33\\34\\35\\36\\37\\38\\39'
  const unicodesCSS = '&#x\\30;&#x\\31;&#x\\32;&#x\\33;&#x\\34;&#x\\35;&#x\\36;&#x\\37;&#x\\38;&#x\\39;'

  it('html', async () => {
    const ext = 'ttf'
    const newBuffer = await minify({
      buffer,
      text: unicodesHTML,
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

    expect(data).toMatchSnapshot()
  })

  it('css', async () => {
    const ext = 'ttf'
    const newBuffer = await minify({
      buffer,
      text: unicodesCSS,
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

    expect(data).toMatchSnapshot()
  })

  it('html + css', async () => {
    const ext = 'ttf'
    const newBuffer = await minify({
      buffer,
      text: unicodesHTML + unicodesCSS,
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

    expect(data).toMatchSnapshot()
  })
})

describe('ttf', () => {
  const fontPath = join(__dirname, '../fonts/SmileySans-Oblique.ttf')
  const buffer = fs.readFileSync(fontPath)

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

    expect(data).toMatchSnapshot()
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

    expect(data).toMatchSnapshot()
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

    expect(data).toMatchSnapshot()
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

    expect(data).toMatchSnapshot()
  })
})

describe('otf', () => {
  const fontPath = join(__dirname, '../fonts/SmileySans-Oblique.otf')
  const buffer = fs.readFileSync(fontPath)

  it('otf 2 ttf', async () => {
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

    expect(data).toMatchSnapshot()
  })

  it('otf 2 woff', async () => {
    const ext = 'otf'
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

    expect(data).toMatchSnapshot()
  })

  it('otf 2 woff2', async () => {
    const ext = 'otf'
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

    expect(data).toMatchSnapshot()
  })

  it('otf 2 eot', async () => {
    const ext = 'otf'
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

    expect(data).toMatchSnapshot()
  })
})

describe('eot', () => {
  const fontPath = join(__dirname, '../fonts/SmileySans-Oblique.eot')

  const buffer = fs.readFileSync(fontPath)
  it('eot', async () => {
    const ext = 'eot'
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

    expect(data).toMatchSnapshot()
  })

  it('eot 2 ttf', async () => {
    const ext = 'eot'
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

    expect(data).toMatchSnapshot()
  })

  it('eot 2 woff', async () => {
    const ext = 'eot'
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

    expect(data).toMatchSnapshot()
  })

  it('eot 2 woff2', async () => {
    const ext = 'eot'
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

    expect(data).toMatchSnapshot()
  })
})

describe('woff', () => {
  const fontPath = join(__dirname, '../fonts/SmileySans-Oblique.woff')
  const buffer = fs.readFileSync(fontPath)

  it('woff', async () => {
    const ext = 'woff'
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

    expect(data).toMatchSnapshot()
  })

  it('woff 2 ttf', async () => {
    const ext = 'woff'
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

    expect(data).toMatchSnapshot()
  })

  it('woff 2 woff', async () => {
    const ext = 'woff'
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

    expect(data).toMatchSnapshot()
  })

  it('woff 2 eot', async () => {
    const ext = 'woff'
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

    expect(data).toMatchSnapshot()
  })
})

describe('woff2', () => {
  const fontPath = join(__dirname, '../fonts/SmileySans-Oblique.ttf.woff2')
  const buffer = fs.readFileSync(fontPath)

  it('woff2', async () => {
    const ext = 'woff2'
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

    expect(data).toMatchSnapshot()
  })

  it('woff2 2 ttf', async () => {
    const ext = 'woff2'
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

    expect(data).toMatchSnapshot()
  })

  it('woff2 2 woff', async () => {
    const ext = 'woff2'
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

    expect(data).toMatchSnapshot()
  })

  it('woff2 2 eot', async () => {
    const ext = 'woff2'
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

    expect(data).toMatchSnapshot()
  })
})
