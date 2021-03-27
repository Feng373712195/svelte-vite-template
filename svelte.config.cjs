const sveltePreprocess = require('svelte-preprocess')

module.exports = {
  legacy:true,
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    postcss:{
      plugins: [
        require('postcss-flexibility')(),
        require('autoprefixer')()
      ]
    }
  })
}
