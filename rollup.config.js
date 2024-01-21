import { copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const woff2OriginWasmPath = join(__dirname, 'node_modules/fonteditor-core/woff2/woff2.wasm')
const woff2DistWasmPath = join(__dirname, 'dist/woff2.wasm')

copyFileSync(woff2OriginWasmPath, woff2DistWasmPath)

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  output: {
    format: 'umd',
    name: 'fontMinify',
    file: 'dist/index.umd.js',
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript(),
    terser(),
  ],
}
export default config
