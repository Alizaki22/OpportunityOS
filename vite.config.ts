import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        allowedHosts: true,
        watch: { usePolling: true },
        proxy: {
            '/api/groq': {
                target: 'https://api.groq.com/openai/v1',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/groq/, ''),
            }
        }
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
}) 