import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from 'unocss/vite'
import postcssNesting from 'postcss-nesting'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), svelte()],
  css: {
    postcss: {
      plugins: [postcssNesting()]
    }
  }
})
