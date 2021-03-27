const SSR_HEAD_TAG = '<!-- ssr-head -->'
const SSR_BODY_TAG = '<!-- ssr-body -->'
const SSR_FOOTER_TAG = '<!-- ssr-footer -->'
const REPLACE_FOOTER_HTML = ''


const fs = require('fs/promises');
const { existsSync } = require('fs')
const path = require('path');
const rimraf = require('rimraf');
const fg = require('fast-glob')

async function generate(){

	const renderPaths = await fg(path.join(process.cwd(),'/.ssr/**.js'))

	const promises = renderPaths.map(async rpath=>{

		// ssr生产对应renderJs 找不到对应页面
		const pageName = path.basename(rpath).replace('.js','');
		const isExists = await existsSync(path.join(process.cwd(),`/src/pages/${pageName}`))
		console.log( pageName , 'pageName' , isExists , 'isExists' )
		if(!isExists) {
			return null
		}

		return new Promise(async (resolve,reject)=>{
			const component = require(rpath).default
			const { html , head } = component.render()
			const htmlPath = path.join(process.cwd(),`/dist/${pageName}/index.html`)
			const stat = await fs.stat(htmlPath);
			if(stat){
				const htmlContent = await fs.readFile(htmlPath,'utf-8')
				await fs.writeFile(
					htmlPath,
					htmlContent
					.replace(SSR_HEAD_TAG, head)
					.replace(SSR_BODY_TAG ,html)
					.replace(SSR_FOOTER_TAG, REPLACE_FOOTER_HTML) ,
					{ flag:'w+',encoding:'utf-8' }
				)
				resolve()
			}else{
				reject(`not found ${pageName} , so can't generate html`)
			}
		})


	}).filter(i=>i)

	try{
		await Promise.all(promises)
		rimraf.sync( path.resolve(process.cwd(), '.ssr') );
		console.log('generate scueese!!!')
	}catch(e){
		new Error(e)
	}

}

generate()






