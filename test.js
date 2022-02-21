const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const router = new Router()
const app = new Koa()
const lookup = require('mime-types').lookup
const sleep = (wait = 2000) => {
    return new Promise((res,rej) => {
        setTimeout(() => {
            res(1)
        }, wait)
    })
}
router.get('/css/name', async(ctx,next) => {
    ctx.res.setHeader
})
router.get('/logo', async(ctx,next) => {
    const filePath = './logo.png'
    const image = fs.readFileSync(filePath) 
    let mimeType = lookup(filePath); //读取图片文件类型
    console.log(mimeType, filePath);
    ctx.res.setHeader('Content-Type', mimeType) 
    ctx.set('content-type', mimeType); //设置返回类型
    ctx.response.body = Buffer.from(image) 
})

router.get('/normal', async(ctx,next) => { 
    ctx.response.body = `console.log('normal onloaded')`
    ctx.res.setHeader('content-type', 'text/js')
    const time = new Date(Date.now() + 30000).toGMTString()
    ctx.set('Last-Modified', time)
    ctx.set('etag', 30624700)
})
router.get('/normal2', async(ctx,next) => {
    await sleep(300) 
    ctx.response.body = `console.log('normal sleep(300)  onloaded')`
    ctx.res.setHeader('content-type', 'text/js') 
    if(ctx.request.header['if-modified-since']) {
        ctx.status = 304
    } else {
        const time = new Date(Date.now() + 30000).toUTCString()
        ctx.set('Last-Modified', time)
    }
})
router.get('/deferjs2', async(ctx,next) => { 
    ctx.response.body = `console.log('deferjs onloaded')`
    ctx.res.setHeader('content-type', 'text/js')
    if(ctx.request.header['if-none-match']) { 
        ctx.status = 304
    } else { 
        const etag =  Math.random() + 'a'
        ctx.set('etag', etag)
    }
  
})
router.get('/deferjs1', async(ctx,next) => {
    await sleep(500)
    ctx.response.body = `console.log('deferjs(sleep(500)) onloaded')`
    ctx.res.setHeader('content-type', 'text/js')
})

router.get('/asyncjs1', async(ctx,next) => { 
    ctx.response.body = `console.log('asyncjs onloaded')`
    ctx.res.setHeader('content-type', 'text/js')
})

router.get('/asyncjs2', async(ctx,next) => { 
    await sleep(5000)
    ctx.response.body = `console.log('asyncjs sleep(5000) onloaded')`
    ctx.res.setHeader('content-type', 'text/js')
})


router.get('/css', async(ctx,next) => {
    await sleep()
    ctx.response.body = `.cls { color: red}`
    ctx.res.setHeader('content-type', 'text/css')
    // 设置强缓存
    ctx.res.setHeader('Cache-Control', 'max-age=365000')
})
router.get('/', async(ctx,next) => {
    const html = fs.readFileSync('./index.html', 'utf-8')
    ctx.response.body = html
    ctx.res.setHeader('content-type', 'text/html')
})


// app.use( (ctx, next) => {
//     console.log('hello, 1')
//   ctx.body = 'hello, 1'
// })

// app.use(ctx => {
//   ctx.body = 'hello, 2'
//   console.log('hello, 1')
// })

app.use(router.routes())

app.listen(3000)