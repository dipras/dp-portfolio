const { defineConfig } = require('vite');
const { resolve, basename } = require('path');
const tailwindcss = require("@tailwindcss/vite");
const injectHTML = require("vite-plugin-html-inject");
const fs = require('fs');


const srcDir = resolve(__dirname, 'src');
const htmlFiles = fs.readdirSync(srcDir).filter(file => file.endsWith('.html'));

const input = {};
for (const file of htmlFiles) {
  const name = basename(file, '.html');
  input[name] = resolve(srcDir, file);
}

module.exports = defineConfig({
  root: srcDir, 
  base: '/',     
  build: {
    rollupOptions: {
      input,
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    open: true,   
  },
  plugins: [
    tailwindcss.default(),
    injectHTML()
  ]
});
