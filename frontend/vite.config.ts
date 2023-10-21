import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';
import svgr from 'vite-plugin-svgr';


export default defineConfig({
 plugins: [react(), sassDts(), svgr()],
})