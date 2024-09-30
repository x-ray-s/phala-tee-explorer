import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic',
        }),
        // visualizer({
        //     gzipSize: true,
        //     brotliSize: true,
        //     emitFile: false,
        //     filename: "dist/visualizer.html",
        //     open: true
        // }),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './app'),
        },
    },
})
