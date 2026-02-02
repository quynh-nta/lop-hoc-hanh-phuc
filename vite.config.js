import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import saveStudentsPlugin from './vite-plugin-save-students.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), saveStudentsPlugin()]
})
