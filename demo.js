const Koa = require('./application')
const app = new Koa()

app.use(async (ctx, next) => {
    console.log('Middleware 1 start')
    await next()
    console.log('Middleware 1 end')
})
app.use(Middleware)
app.use(Middleware2)

function Middleware(ctx, next) {
    console.log('Middleware 2 start')
    next()
    Promise.resolve().then(() => {
        console.log('Middleware 2 end')
    })
}

function Middleware2(ctx, next) {
    console.log('Middleware 3 start')
    next()
    console.log('Middleware 3 end')
    
}


app.listen(3001, () => {
    console.log('3001 is listening')
})