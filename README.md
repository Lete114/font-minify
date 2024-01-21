# font-minify

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Keep only used glyphs and remove unused glyphs. Generate font subsets to achieve the purpose of compression

## Install

Using npm:

```bash
npm install font-minify --save-dev
```

## Usage

```js
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, parse } from 'node:path'
import minify from 'font-minify'
// or use CommonJS
// const minify = require('font-minify')

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TEST_STRING = `Font-Minify 你说，儿豁中国人不骗中国人`
const fontPath = join(__dirname, 'fonts/fontfile.ttf')
const buffer = fs.readFileSync(fontPath)

;(async () => {
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

  const fontPath = join(__dirname, 'fonts/fontfile.new.ttf')
  fs.writeFileSync(fontPath, newBuffer)
})()
```

If you're going to run it in a **browser** and you're going to work with `woff2` fonts, then you should also need `dist/woff2.wasm`, and when you do, you must also pass in the path to the `woff2.wasm` file. Otherwise you can't handle the `woff2` font.

```js
// example
import minify from 'font-minify'

const newBuffer = await minify({
  buffer,
  text: TEST_STRING,
  wasm: {
    // The path where you store `woff2.wasm`.
    woff2: 'woff2.wasm' // If you're using a packaging tool to build your front-end project, then you should put `woff2.wasm` in the `public` directory
  },
  readOptions: {
    type: 'ttf',
  },
  writeOptions: {
    type: 'woff2',
  },
})
```
If you're using vite to build your front-end project ([Vite Static Asset Handling](https://vitejs.dev/guide/assets.html))
```js
// example
import minify from 'font-minify'
import woff2Wasm from 'font-minify/woff2Wasm?url'

const newBuffer = await minify({
  buffer,
  text: TEST_STRING,
  wasm: {
    woff2: woff2Wasm
  },
  readOptions: {
    type: 'ttf',
  },
  writeOptions: {
    type: 'woff2',
  },
})
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Lete114](https://github.com/lete114)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/font-minify?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/font-minify
[npm-downloads-src]: https://img.shields.io/npm/dm/font-minify?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/font-minify
[bundle-src]: https://img.shields.io/bundlephobia/minzip/font-minify?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=font-minify
[license-src]: https://img.shields.io/github/license/lete114/font-minify.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/lete114/font-minify/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/font-minify
