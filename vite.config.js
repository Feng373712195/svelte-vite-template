
import { defineConfig } from 'vite'
import { join } from 'path'

import svelte from '@svitejs/vite-plugin-svelte'
import legacy from '@vitejs/plugin-legacy'
import mpa from 'vite-plugin-mpa'
import fg from 'fast-glob'

const isSSR = process.argv.includes('--ssr')

const buildOptions =  isSSR ? {
  outDir:'.ssr',
  rollupOptions: {
    input: (fg.sync(join(__dirname,'/src/pages/**/App.svelte'))).reduce((inputs,dirPath,index)=>{
      const pageName  = /\/pages\/(.*)\/App\.svelte/.exec(dirPath)
      inputs[pageName[1]] = dirPath;
      return inputs
    },{})
  }
} : {}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    legacy(),
    ...(isSSR ? []:[mpa()]),
    svelte({
      compilerOptions:{ generate:isSSR ? 'ssr' : 'dom', hydratable:true }
    })
  ],
  build:{
    target:'es2015',
    ...buildOptions
  }
})


