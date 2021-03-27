const { src, dest } = require('gulp')
const htmlmin = require('gulp-htmlmin') //html压缩

exports.default = function(){
  return src('dist/**/index.html')
  .pipe(htmlmin({
    collapseWhitespace: true ,
    minifyJS: true,
    minifyCSS: true
  }))
  .pipe(dest('dist/'))
}
