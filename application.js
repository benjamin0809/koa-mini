const http = require('http')
const Context = require('./context')
const compose = require('./compose')
class Application {
    constructor() {
        this.middlewares = []
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)


    }
    callback() {
        return async(req, res) => {
            const ctx = new Context(req, res)

            const fn = compose(this.middlewares)

            try {
                await fn(ctx)
            } catch(e) {
                console.error(e)
                ctx.res.statusCode = 500
                ctx.res.end('Internel Server Error')
            }
            ctx.res.end(ctx.body)
        }
    }
    use(middleware) {
        this.middlewares.push(middleware)
    }
}

module.exports = Application