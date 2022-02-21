function compose(middlewares) {
    return ctx => {
        const dispath = (i) => {
            const middleware = middlewares[i]
            if(i === middlewares.length) {
                return 
            }

            return middleware(ctx, () => dispath(i + 1))
        }
        return dispath(0)
    }
}
module.exports = compose