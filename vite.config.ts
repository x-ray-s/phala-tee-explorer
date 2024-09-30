import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cdn from 'vite-plugin-cdn-import'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        cdn({
            modules: ['react', 'react-dom'],
        }),
        react({
            jsxRuntime: 'automatic',
        }),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './app'),
        },
    },
})
