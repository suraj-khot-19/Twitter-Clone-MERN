import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // server configuration
  server: {
		port: 3000,
		proxy: {
			"/api/v2": {
				target: "http://localhost:5000",
				changeOrigin: true,
				timeout:5000 //5s
			},
		},
	},
})
