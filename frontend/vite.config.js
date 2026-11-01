import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  server: {
    proxy: {
      "/api-wilayah": {
        target: "https://emsifa.github.io/api-wilayah-indonesia/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-wilayah/, ""),
      },
    },
  },
})
